export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }
  preload() {
    this.load.image('platform', 'platform.png');
    this.load.image('line', 'line.png');
    this.load.image('ball', 'ball.png');
    this.load.image('player', 'player.png');
  }

  create() {
    this.scene.start('scene');
  }
}