import Base from './base.js'

export default class Platform extends Phaser.GameObjects.Sprite {
  constructor(scene, player, player2, baseGroup, x, y) {
    super(scene, x, y, 'platform');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    new Base(scene, this, x, y, baseGroup);
    this.scene.physics.add.collider(this, player);

    if(player2 !==undefined)
      this.scene.physics.add.collider(this, player2);

  }
}
