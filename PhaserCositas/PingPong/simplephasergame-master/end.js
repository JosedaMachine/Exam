

export default class End extends Phaser.Scene {
  constructor() {
    super({ key: 'end' });
  }
  preload() {
  }

  create() {
    this.add.text(10, 10, 'Se acabó perro, se acabooo largo de aquiiiiiiiii!');
  }
}