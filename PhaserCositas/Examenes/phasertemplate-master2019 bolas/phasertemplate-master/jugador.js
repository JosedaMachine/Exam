export default class Jugador extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this)
        this.speed = 200;

        this.setScale(0.5, 0.5);
        this.cursors = scene.input.keyboard.createCursorKeys();

        this.scene.anims.create({
            key: 'up',
            frames: [{key: 'player', frame: 3}],
            frameRate: 10
        });

        this.scene.anims.create({
            key: 'down',
            frames: [{key: 'player', frame: 4}],
            frameRate: 10
        });

        this.scene.anims.create({
            key: 'left',
            frames: [{key: 'player', frame: 1}],
            frameRate: 10
        });

        this.scene.anims.create({
            key: 'right',
            frames: [{key: 'player', frame: 2}],
            frameRate: 10
        });

        this.scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 0}],
            frameRate: 10
        });
    }

    preUpdate(time, delay)
    {
        super.preUpdate(time, delay);

        if(this.cursors.up.isDown)
        {
            this.body.setVelocityY(-this.speed);
            this.anims.play('up', true);
        }else if(this.cursors.down.isDown)
        {
            this.body.setVelocityY(this.speed);
            this.anims.play('down', true);
        }else{
            this.body.setVelocityY(0);
        }


        if(this.cursors.left.isDown)
        {
            this.body.setVelocityX(-this.speed);
            this.anims.play('left', true);
        }else if(this.cursors.right.isDown)
        {
            this.body.setVelocityX(this.speed);
            this.anims.play('right', true);
        }else{
            this.body.setVelocityX(0);
        }

        if(this.body.speed === 0)
        {
            this.anims.play('idle', true);
        }

    }
}