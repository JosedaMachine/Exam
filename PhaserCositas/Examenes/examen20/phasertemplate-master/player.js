export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, keyConfig, key) {
      super(scene, x, y, key);
  
      this.live = 1
      this.score = 0;
  
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds();
  
      this.jumpSpeed = -this.height*2;
      
    //   this.label = this.scene.add.text(10, 10);
  
      this.cursors = keyConfig || this.scene.input.keyboard.createCursorKeys();
  
      
      this.scene.anims.create({
        key: 'run',
        frames: this.scene.anims.generateFrameNumbers('player_run', { start: 0, end: 39 }),
        frameRate: 60,
        repeat: -1
    });
    
    this.scene.anims.create({
        key: 'jump',
        frames: [{ key: 'player_jump', frame: 0 }],
        frameRate: 24
    });
    
    this.scene.anims.create({
        key: 'death',
        frames: this.scene.anims.generateFrameNumbers('player_death', { start: 0, end: 7 }),
        frameRate: 4,
        showOnStart: true,
        hideOnComplete: false
    });

    this.scene.input.keyboard.on('keydown', ()=>{
      if(this.body.onFloor()) {
          this.body.setVelocityY(this.jumpSpeed);
        }
    });
}

    updateScore() {
        this.label.text = 'Score: ' + this.score;
    }

    updateLive() {
        this.label.text = this.live;
    }

    preUpdate(time, delay) 
    {
        super.preUpdate(time, delay)
        if(this.body.onFloor()) {
            this.anims.play('run', true);
        }
        else{
            this.anims.play('jump', true);
        }
    
    }

    takeDamage(amount)
    {
      this.live -= amount;
      this.updateLive();
    }

    Die(obs, player)
    {
        obs.destroy(true);
        
        // this.scene.launch('deathScene');
        // this.scene.pause();
    }

}