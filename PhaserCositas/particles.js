this.particles = this.scene.add.particles('dust');

let cuerpo = this.body;
let emmiter = this.particles.createEmitter({
    frames: [{key: 'dust', frame: 0}],
    speed: {
        onEmit: function ()
        {
            return cuerpo.speed;
        }
    },
    lifespan: { min: 100, max: 1000 },
    alpha: {
        onEmit: function (particle, key, t, value)
        {
            return Phaser.Math.Percent(cuerpo.speed, 0, 300) * 1300;
        }
    },
    scale: { start: 0, end: 1.0 },
    rotate: {start: 0, end: 60},
    frequency: 40,
    // blendMode: 'ADD'
});
emmiter.startFollow(this, 0, this.y*0.04);