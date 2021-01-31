import Star from './star.js'

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, live, keyConfig) {
    super(scene, x, y, 'player');

    if(live !== undefined)
      this.live = live;
    else this.live = 1;

    this.score = 0;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();

    this.speed = 300;
    this.jumpSpeed = -400;
    
    this.label = this.scene.add.text(10, 10);

    this.cursors = keyConfig || this.scene.input.keyboard.createCursorKeys();

    this.updateLive();

    console.log(this.cursors);
  }

  updateScore() {
    this.label.text = 'Score: ' + this.score;
  }

    updateLive() {
    this.label.text = this.live;
  }

  preUpdate() {
    
    if (this.cursors.up.isDown && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpSpeed);
    }
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
    }
    else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);

    }
    else {
      this.body.setVelocityX(0);
    }

    this.label.setPosition(this.x, this.y - this.width*0.9);
  }

  takeDamage(amount)
  {
    this.live -= amount;
    this.updateLive();
  }
}
