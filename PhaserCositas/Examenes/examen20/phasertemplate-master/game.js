import Player from "./player.js"
import Spawner from "./spawner.js"

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
    
  }
  preload() 
  {
        this.load.spritesheet({
          key: 'player_run',
          url: 'src/unamuno/run.png',
          frameConfig: {
            frameWidth: 120,
            frameHeight: 200
          }
        });
    
         //Player Jumop
         this.load.spritesheet({
          key: 'player_jump',
          url: 'src/unamuno/jump.png',
          frameConfig: {
            frameWidth: 120,
            frameHeight: 200
          }
        });
    
        this.load.spritesheet({
          key: 'player_death',
          url: 'src/unamuno/death.png',
          frameConfig: {
            frameWidth: 200,
            frameHeight: 200
          }
        });

    this.load.image('tileBGUp', './src/3_16_up.png');
    this.load.image('tileBGDown', './src/3_16_down.png');

    this.load.image('obsA', './src/obstacle/spikeA.png');
    this.load.image('obsB', './src/obstacle/spikeB.png');
    this.load.image('obsC', './src/obstacle/spikeC.png');
    this.load.image('obsD', './src/obstacle/spikeD.png');

  }

  create() {
    this.bgSpeed = 0.6;
    this.bgScale = 0.8;

    this.skyDownCollider = this.physics.add.staticSprite(this.game.config.width/2,this.game.config.height/1.1, 'tileBGDown');
    
    this.setTilebBg();
    // this.player = new Player(this, this.game.config.width/9,this.game.config.height/1.9, undefined, 'player_run');


    this.arrayImages = ['obsA', 'obsB', 'obsC', 'obsD'];
    this.spawn = new Spawner(this,this.game.config.width/1.1,this.game.config.height/1.9, this.arrayImages, this.skyDownCollider, this.player);

    this.physics.add.collider(this.skyDownCollider, this.player);
  }

  update(time, delta) 
  {
    this.skyUp.setTilePosition(this.skyUp.tilePositionX + this.bgSpeed);
    this.skyDown.setTilePosition(this.skyDown.tilePositionX + this.bgSpeed);
  }

  setTilebBg()
  {
    this.skyUp = this.add.tileSprite(this.game.config.width/2,this.game.config.height/3, 0, 0, 'tileBGUp');
    this.skyDown = this.add.tileSprite(this.game.config.width/2,this.game.config.height/1.15, 0, 0, 'tileBGDown');


    this.skyUp.setScale(this.bgScale, this.bgScale);
    this.skyDown.setScale(this.bgScale, this.bgScale);
  }
}
