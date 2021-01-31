import Player from './player.js'
import Ball from './ball.js'

export default class Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'scene' });
  }

  create() {

    // this.timer = 100;
    // this.tiempo = this.timer;
    // this.stars = 10;
    // this.bases = this.add.group();

    // const keyConfig = this.input.keyboard.createCursorKeys();
    this.cosas = this.add.sprite(this.game.config.width/2, this.game.config.height/2, 'line');

    this.cosas.setInteractive({draggable: true});

    this.cosas.on('drag', pointer =>{

      if(pointer.leftButtonDown())
      {
        this.cosas.x = pointer.x;
        this.cosas.y = pointer.y;
      }
    })

    // this.cosas.on('pointerdown', ()=>{
    //   console.log("feo");
    // })

    const keyConfig = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S
    });
    this.player = new Player(this, this.game.config.width/10, this.game.config.height/2,keyConfig, 0.2, this.game.config.width/3.8,  this.game.config.height/6);
    
    
    const keyConfig2 = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.I,
      'down': Phaser.Input.Keyboard.KeyCodes.K,
    });
    this.player2 = new Player(this,this.game.config.width/1.15, this.game.config.height/2, keyConfig2, 0.2, this.game.config.width/1.5,  this.game.config.height/6);

    this.ball = new Ball(this, this.game.config.width/2,this.game.config.height/2).setScale(0.3);

    console.log(this.game.config.width/2);
    console.log(this.game.config.height/2);
    this.players = [this.player2, this.player];

    this.physics.add.collider(this.ball, this.players);


    this.izqTrigger = this.add.zone(0, this.game.config.height/2).setSize(10, this.game.config.height);
    this.derTrigger = this.add.zone(this.game.config.width, this.game.config.height/2).setSize(10, this.game.config.height);
    this.physics.add.existing(this.izqTrigger);
    this.physics.add.existing(this.derTrigger);

    this.physics.add.overlap(this.izqTrigger, this.ball,()=> 
    {
      this.player.addPoint();
      this.ball.restorePos();

    });

    this.physics.add.overlap(this.derTrigger, this.ball,()=> {

      this.ball.restorePos();
      this.player2.addPoint();
    });
  }

  update(time, delay)
  {

  }
}




