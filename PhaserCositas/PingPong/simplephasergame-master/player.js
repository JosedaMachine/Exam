export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, keyConfig, scaleNumber, xText, yText) {
    super(scene, x, y, 'player');

    this.score = 0;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds();

    this.body.setImmovable();
    this.setScale(scaleNumber || 0.2);

    this.points = this.scene.add.text(xText, yText, this.score, { fontColor: 0xffff00, fontSize: 40});

    this.speed = 300;
    
    this.cursors = keyConfig || this.scene.input.keyboard.createCursorKeys();
  }

  updateScore() 
  {
    this.points.text = this.score;
  }

  preUpdate() {
    
    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
    }
    else if (this.cursors.down.isDown) {
      this.body.setVelocityY(this.speed);
    }
    else {
      this.body.setVelocityY(0);
    }

  }

  addPoint()
  {
    this.score++;

    this.updateScore();
  }

  preUpdate(time, delay)
  {
    super.preUpdate(time, delay);

    if(this.score >= 1)
    {

      this.scene.scene.start('end');
    }
  }
}
