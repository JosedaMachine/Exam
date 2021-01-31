export default class Final extends Phaser.Scene {
  constructor() {
    super({ key: "Final" });
  }
  
  create()
  {
    this.label = this.add.text(this.game.config.width/2, this.game.config.height/2, "You've Won", {fontSize: 32});
  }
}