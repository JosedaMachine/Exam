this.time = this.scene.time.addEvent({
    delay: Phaser.Math.Between(this.min, this.max),
    callback : ()=>{
        this.time.delay = Phaser.Math.Between(this.min, this.max);
        // this.time.elapsed = Phaser.Math.Between(this.min, this.max);

        let key = arrayImages[Phaser.Math.Between(0, arrayImages.length-1)];
        let obs = new Obstacle(scene, x, y, key, plataforma, player, this).setScale(0.3);
    },
    loop: true
});

//LLamada de una cosa con retardo
this.time.delayedCall(2), () => {
    this.scene.restart();
  }