import Player from './player.js'
import Platform from './platform.js';

export default class Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'scene' });
  }

  create() {

    this.timer = 100;
    this.tiempo = this.timer;

    this.stars = 10;
    this.bases = this.add.group();

    // const keyConfig = this.input.keyboard.createCursorKeys();
    const keyConfig = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.I,
      'left': Phaser.Input.Keyboard.KeyCodes.J,
      'right': Phaser.Input.Keyboard.KeyCodes.L
    });
    this.player = new Player(this, 200, 300,10);

    const keyConfig2 = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    this.player2 = new Player(this, 400, 300, 10, keyConfig2);

    this.physics.add.collider(this.player, this.player2, () =>
    {
      if(this.timer<0)
      {
        this.player.takeDamage(1);
        this.player2.takeDamage(1);
        this.timer = this.time;
      }
    });

    let t = this.time.addEvent({
      delay: Phaser.Math.Between(2000, 4000),
      callback: ()=>{
        console.log("lo consegui");
      },
      loop: true
    });


    new Platform(this, this.player, this.player2, this.bases, 150, 350);
    new Platform(this, this.player, this.player2, this.bases, 850, 350);
    new Platform(this, this.player, this.player2,this.bases, 500, 200);
    new Platform(this, this.player, this.player2, this.bases, 150, 100);
    new Platform(this, this.player, this.player2, this.bases, 850, 100);

    this.spawn();
  }

  update(time, delay)
  {
    this.timer--;
  }

  spawn(from = null) {
    //Si el numero de bases que le llega es igual a null, que pille todas la bases que tiene actualmente
    Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
  }
}