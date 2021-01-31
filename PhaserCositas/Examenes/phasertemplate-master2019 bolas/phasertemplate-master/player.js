export default class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y)
    {
        //esto invoca al constructor del objeto padre, es decir, Sprite
        super(scene, x, y, 'player');
        //Si uso this.scene, ya se queda registrada la scena en toda la clase y puedo usar this.scene

        this.scene.add.exisisting(this);
        this.scene.physics.add.exisisting(this);
        //aqui le acabo de añadir un body a mi jugador
        this.cursors = this.scene.input.keyboard.createCursorsKeys();
    }
}