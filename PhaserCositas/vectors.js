const vectorActual = new Phaser.Math.Vector2(this.x, this.y);
const vectroPlayer = new Phaser.Math.Vector2(player.x, player.y);
const lenght = vectorActual.distance(vectroPlayer);

this.dirY = player.y - this.y;


this.dirY = this.dirY / lenght;