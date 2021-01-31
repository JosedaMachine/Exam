export default class Star extends Phaser.GameObjects.Sprite {
  constructor(scene, base, x, y) {
    super(scene, x, y, 'star');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.y -= this.height;
    this.base = base;

  }
  preUpdate() {

    if (this.scene.physics.overlap(this.scene.player, this)) {
      this.scene.player.point();
      if (this.scene.player.score == this.scene.stars) {
        this.scene.scene.start('end');
      }
      else {
        let s = this.scene.bases.children.entries;
        //esta sintaxis dice que recibe un objeto y dicho objeto se compara con la base de esta estrella, asi que incluye todas las bases menos esta y elige alguna de ellas para crear una nueva estrella
        let m = o => o !== this.base;
        //el filter creo que itera por cada una de las bases/entradas de los hijos de las Bases
        this.scene.spawn(s.filter(m));
        this.destroy();
      };
    }
  }
}
