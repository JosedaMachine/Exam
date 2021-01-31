export default class deathScene extends Phaser.Scene {
  constructor() {
    super({ key: "deathScene" });
  }

  create()
  {
    let t = this.time.addEvent({
        delay: 2000,
        callback: ()=>{
            this.scene.start('main');
        },
        loop: false
      });
  }

  update(time, delay)
  {
    
  }
}