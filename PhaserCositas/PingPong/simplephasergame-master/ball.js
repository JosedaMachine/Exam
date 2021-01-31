export default class Ball extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) 
  {
    super(scene, x, y, 'ball');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
    this.posX = x;
    this.posY = y;

    console.log(x);
    console.log(y);
    // this.body.setOrigin(0,1);

    this.radius = 48;
    this.body.setCircle(this.radius, 8, 2);

    this.speed = 400;

    console.log(this);

    this.rnd = Phaser.Math.RND;

    this.body.setBounce(1);
   
    this.getRandomVelocity();
  }
  preUpdate() 
  {

   
  }

  restorePos()
  {
    this.x = this.posX;
    this.y = this.posY;
    // this.setPosition(this.posX, this.posY);
    this.getRandomVelocity();
  }

  getRandomVelocity()
  {
    this.body.setVelocity(this.rnd.realInRange(-1,1)* this.speed, this.rnd.realInRange(-1,1)* this.speed);
  }
}
