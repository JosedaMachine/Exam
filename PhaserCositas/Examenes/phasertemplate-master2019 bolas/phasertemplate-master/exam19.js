export default class Game2 extends Phaser.Scene
{
    constructor()
    {
        super({key: 'game2'});

        this.speed = 200; 

        this.speedCircle = 300;

        this.numDivisions = 3;


        this.numCollisions = Math.pow(2, this.numDivisions) - 1;

        console.log(this.numCollisions);

        this.timeChanllenge = 30;
    }

    preload()
    {
        this.load.image('pH','./src/platformH.png');
        this.load.image('pV','./src/platformV.png');

        this.load.image('circle', './src/cirlce.png');

        this.load.spritesheet('cross', './src/cross.png', {frameWidth:288, frameHeight: 277.5});

        this.load.audio('blop', './src/blop.mp3');
        this.load.audio('divide', './src/divide.mp3');
    }

    create()
    {

        this.blop = this.sound.add('blop');
        this.divi = this.sound.add('divide');

        console.log(this.divi);

         //Animaciones del player
         this.anims.create({
            key: 'left',
            frames: [{key: 'cross', frame: 1}],
            frameRate: 10,
            repeat: -1
            });
        this.anims.create({
            key: 'right',
            frames: [{key: 'cross', frame: 2}],
            frameRate: 10,
            repeat: -1
            });

        this.anims.create({
            key: 'up',
            frames: [{key: 'cross', frame: 3}],
            frameRate: 10
            });

            
        this.anims.create({
            key: 'down',
            frames: [{key: 'cross', frame: 4}],
            frameRate: 10

            });

        this.anims.create({
            key: 'idle',
            frames: [{key:'cross', frame: 0}],
            frameRate: 1
        })

        this.colli = this.add.text(this.game.config.width*0.2, this.game.config.height*0.3, "Quedan " + this.numCollisions + " colsiones", {fontSize: 32});

        this.secs = this.add.text(this.game.config.width*0.5, this.game.config.height*0.3, "y " +  this.timeChanllenge + " segundos.", {fontSize: 32});

        //Obtener informacion de una textura sin haberla creado
        const plH = this.textures.get('pH').getSourceImage();
        const plV = this.textures.get('pV').getSourceImage();
        const circulo = this.textures.get('circle').getSourceImage();

        this.walls = this.physics.add.staticGroup();
        
        this.walls.create(this.game.config.width/2, plH.height/2, 'pH').setScale(this.game.config.width / plH.width, 1).refreshBody();
        this.walls.create(this.game.config.width/2, this.game.config.height - plH.height/2, 'pH').setScale(this.game.config.width / plH.width, 1).refreshBody();
        this.walls.create(plV.width/2, this.game.config.height/2,'pV').setScale(1, this.game.config.height / plV.height).refreshBody();
        this.walls.create(this.game.config.width-plV.width/2, this.game.config.height/2,'pV').setScale(1, this.game.config.height / plV.height).refreshBody();

        this.player = this.physics.add.sprite(this.game.config.width/2,this.game.config.height/2, 'cross');
        this.player.setScale(this.player.width/this.game.config.width, this.player.height/this.game.config.height);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.walls);

        this.rnd = Phaser.Math.RND;

        this.createCircle(this.game.config.width/2,this.game.config.height/4, circulo.width/2, circulo.height/2, this.numDivisions);

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.timeChanllenge--;
                this.secs.text = "y " +  this.timeChanllenge + " segundos.";
            },
            loop: true
        })

    }

    update(time, delay)
    {
        if(this.cursors.up.isDown)
        {
            this.player.body.setVelocityY(-this.speed);

            this.player.anims.play('up', true);
        }
        else if(this.cursors.down.isDown)
        {
            this.player.body.setVelocityY(this.speed);

            this.player.play('down', true);
        }
        else{

            this.player.body.setVelocityY(0);
        }
        
        if(this.cursors.left.isDown)
        {
            this.player.body.setVelocityX(-this.speed);

            this.player.play('left', true);
        }
        else if(this.cursors.right.isDown)
        {
            this.player.body.setVelocityX(this.speed);

            this.player.play('right', true);
        }
        else{
            this.player.body.setVelocityX(0);
        }

        if(this.player.body.speed === 0)
        {
            this.player.play('idle', true);
        }

        if(this.timeChanllenge<=0)
        {
            this.add.text(this.game.config.width/2,this.game.config.height/2, "Has Perdido..", {fontSize:64});
            this.scene.pause();

        }
        else if(this.numCollisions<=0)
        {
            this.add.text(this.game.config.width/2,this.game.config.height/2, "Has Ganado!", {fontSize:64});
            this.scene.pause();
        }

    }
    
    createCircle(x, y, sX, sY,level)
    {
        let circle = this.physics.add.sprite(x, y, 'circle');

        circle.level = level;

        let newW = sX/circle.width;
        let newH = sY/circle.height;
        circle.setScale(newW, newH);

        //se actualiza su tamaño 
        circle.width =  circle.width*newW;
        circle.height = circle.height*newH;

        circle.setBounce(1);
        circle.setVelocity(this.rnd.realInRange(-1.0, 1.0)* this.speedCircle, this.rnd.realInRange(-1.0, 1.0)* this.speedCircle);

        this.physics.add.collider(circle, this.walls);
        this.physics.add.collider(circle, this.player, this.divide, null, this);
    }

    divide(circle, player)
    {
        this.numCollisions--;

        this.colli.text = "Quedan " + this.numCollisions + " colsiones";

        if(circle.level>1)
        {
            this.divi.play();
            
            circle.level--;
            this.createCircle(this.game.config.width/2,this.game.config.height/3, circle.width/2, circle.height/2, circle.level);
            
            this.createCircle(this.game.config.width/2,this.game.config.height/3, circle.width/2, circle.height/2, circle.level);
        }
        else{
            this.blop.play();
        }
        circle.destroy(true);
    }
}
