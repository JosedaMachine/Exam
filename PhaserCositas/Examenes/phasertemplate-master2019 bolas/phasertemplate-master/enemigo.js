export default class Enemigo extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, width, height, level ,rnd, jugador)
    {
        super(scene, x, y, 'enemy');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.speed = 200;
        this.level = level; 
        this.jugador = jugador;
        this.rnd = rnd;

        let newW = width/this.width;
        let newH = height/this.height;

        this.setScale(newW, newH);

        this.width = this.width * newW;
        this.height = this.height * newH;

        this.body.setBounce(1);
        this.body.setVelocity(rnd.realInRange(-1,1)* this.speed, rnd.realInRange(-1,1)* this.speed);

        this.scene.physics.add.collider(this, jugador, this.divide, null, this);
        this.scene.physics.add.collider(this, this.scene.plataformas);

    }

    preupdate(time, delay)
    {
        super.preupdate(time, delay);

    }

    divide(circle, player)
    {
        this.scene.numCollisions--;

        this.scene.updateScore();

        this.level--;

        if(this.level > 0)
        {
            let circle = new Enemigo(this.scene, this.x, this.y, this.width/2, this.height/2, this.level, this.rnd, this.jugador);
            let circle2 = new Enemigo(this.scene, this.x, this.y, this.width/2, this.height/2, this.level, this.rnd, this.jugador);
        }
        
        this.destroy(true);
    }   
}