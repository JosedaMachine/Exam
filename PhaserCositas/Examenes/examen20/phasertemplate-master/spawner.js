import Obstacle from "./obstacle.js";
export default class Spawner extends Phaser.GameObjects.Container{
    constructor(scene, x, y, arrayImages, plataforma, player){
        super(scene, x, y);

        this.scene.add.existing(this);
        this.array = arrayImages;
        this.min = 1000;
        this.max = 3500;
        this.limitWin = 1;
        this.created = 0;
        
        this.time = this.scene.time.addEvent({
            delay: Phaser.Math.Between(this.min, this.max),
            callback : ()=>{
                this.time.delay = Phaser.Math.Between(this.min, this.max);
                // this.time.elapsed = Phaser.Math.Between(this.min, this.max);
                console.log(this);
                let key = arrayImages[Phaser.Math.Between(0, arrayImages.length-1)];
                let obs = new Obstacle(scene, x, y, key, plataforma, player, this).setScale(0.3);
            },
            loop: true
        });

        console.log(this.time);
    }

    preUpdate(time, delay)
    {
        if(this.created>=this.limitWin)
        {
            this.scene.scene.start('Final');
        }
    }

}