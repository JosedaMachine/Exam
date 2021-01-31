import Jugador from './jugador.js';
import Enemigo from './enemigo.js';

export default class Exam extends Phaser.Scene{

    constructor()
    {
        super({key:'scene1'});
    }

    preload()
    {   
        this.load.spritesheet(
            'player',
            './src/cross.png',
            {
                frameWidth: 288,
                frameHeight: 277.5
            }
        );

        this.load.image('enemy', './src/cirlce.png');

        this.load.image('pH', './src/platformH.png');
        this.load.image('pV', './src/platformV.png');


        this.load.audio('blop', './src/blop.mp3');
        this.load.audio('divide', './src/divide.mp3');

    }

    create()
    {
        let numDivisons = 3;
        this.numCollisions = Math.pow(2, numDivisons) - 1;
        let circle = this.textures.get('enemy').getSourceImage(); 
        let rnd = Phaser.Math.RND;
        this.createSceneario();
        this.jugador = new Jugador(this, this.game.config.width/2, this.game.config.height/2);
        this.enemigo = new Enemigo(this, this.game.config.width/2, this.game.config.height/3, circle.width/2, circle.height/2, numDivisons, rnd, this.jugador); 

        this.timeRemain = 20;
        this.collisions = this.add.text(this.game.config.width*0.3,this.game.config.height*0.2, "Quedan "  + this.numCollisions + " colisiones ", {fontSize: 32});
        this.secs = this.add.text(this.game.config.width*0.6,this.game.config.height*0.2, "y "  + this.timeRemain + " segundos", {fontSize: 32});
        this.timer = this.time.addEvent({
                delay: 1000,
                callback: () =>
                {
                    this.timeRemain--;
                    this.secs.text = "y quedan "  + this.timeRemain + " segundos";
                },
                loop: true
            });

    }

    update(time, delay)
    {

        if(this.timeRemain<=0)
        {
            let win = this.add.text(this.game.config.width*0.5,this.game.config.height*0.5, "You have lost...", {fontSize: 32});
            this.scene.pause();
        }
        else if(this.numCollisions<=0)
        {
            let win = this.add.text(this.game.config.width*0.5,this.game.config.height*0.5, "You have Won!", {fontSize: 32});
            this.scene.pause();
        }
    }

    updateScore()
    {
        this.collisions.text = "Quedan "  + this.numCollisions + " colisiones";
    }


    createSceneario()
    {
        const plH = this.textures.get('pH').getSourceImage();
        const plV = this.textures.get('pV').getSourceImage();

        this.plataformas = this.physics.add.staticGroup();
        
        this.plataformas.create(this.game.config.width/2,plH.height/2, 'pH').setScale(this.game.config.width/plH.width, 1).refreshBody();
        this.plataformas.create(this.game.config.width/2,this.game.config.height-plH.height/2, 'pH').setScale(this.game.config.width/plH.width, 1).refreshBody();
        this.plataformas.create(this.game.config.width - plV.width/2,this.game.config.height2, 'pV').setScale(1, this.game.config.height/plH.height).refreshBody();
        this.plataformas.create(plV.width/2,this.game.config.height/2, 'pV').setScale(1 , this.game.config.height/plH.height).refreshBody();

        this.physics.add.collider(this.plataformas, this.jugador);
    }
}