// En la Escena:

Create()
{
    this.load.spritesheet({
        key: 'player_idle',
        url: 'src/assets/sprites/unamuno/idle.png',
        frameConfig: {
          frameWidth: 120,
          frameHeight: 200
        }
      });
      //Player Run
      this.load.spritesheet({
        key: 'player_run',
        url: 'src/assets/sprites/unamuno/run.png',
        frameConfig: {
          frameWidth: 120,
          frameHeight: 200
        }
      });
      //Player Jumop
      this.load.spritesheet({
        key: 'player_jump',
        url: 'src/assets/sprites/unamuno/jump.png',
        frameConfig: {
          frameWidth: 120,
          frameHeight: 200
        }
      });
      //Player Attack
      this.load.spritesheet({
        key: 'player_attack',
        url: 'src/assets/sprites/unamuno/attack.png',
        frameConfig: {
          frameWidth: 180,
          frameHeight: 180
        }
      });
       //Player Death
       this.load.spritesheet({
        key: 'player_death',
        url: 'src/assets/sprites/unamuno/death.png',
        frameConfig: {
          frameWidth: 200,
          frameHeight: 200
        }
      });
}

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
        key: 'idle',
        frames: this.scene.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
        frameRate: 8,
        repeat: -1
      });
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
        key: 'attack',
        frames: this.scene.anims.generateFrameNumbers('player_attack', { start: 0, end: 7 }),
        frameRate: 24,
        showOnStart: true,
        hideOnComplete: true
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

        //Controll Input
    }

    takeDamage(amount)
    {
      this.live -= amount;
      this.updateLive();
    }

    Die(obs, player)
    {
        obs.destroy(true);
        
        this.scene.launch('deathScene');
        this.scene.pause();
    }

    ControlInput() 
    {
        //Correr
        if (this.cursors.up.isDown && this.body.onFloor()) 
        {
            this.body.setVelocityY(this.jumpSpeed);
        }
        if (this.cursors.left.isDown) {
          this.body.setVelocityX(-this.speed);
          this.anims.play('run', true);
          //Creo que esto es de matter
          // this.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.anims.play('run', true);
          this.body.setVelocityX(this.speed);
    
        }
        else {
          this.body.setVelocityX(0);
        }
    
        //Idle
        if (this.body.velocity.x === 0 && this.playerController.onFloor && this.lifeStat > 0) 
        {
          this.anims.play('idle', true);
        }
        //Animación de salto
        else if (this.body.velocity.x === 0 && this.lifeStat > 0) 
        {
          this.anims.play('jump', true);
        }
    
    }
}

