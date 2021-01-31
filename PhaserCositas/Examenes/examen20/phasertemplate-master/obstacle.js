
export default class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, plataforma, player, parent) {
      super(scene, x, y, key);
  
        
      this.speed = 300;
        
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);

      this.body.setVelocityX(-this.speed);
      
      this.parent = parent;
      if(plataforma !== undefined)
      this.scene.physics.add.collider(this, plataforma);

      if(player !== undefined)
        this.scene.physics.add.collider(this, player, player.Die, null, this.scene);

    
        //MIRAR ESTOM PLISSSSSISISI
    //    this.scene.physics.world.on("worldbounds", function (body) {

    //     console.log(body);
    //     // if (body) {
    //     //     if (body.gameObject.texture.key === key) {
    //     //             console.log('Game Over');
    //     //         }
    //     //     } 
        
    // });
    
    
}
    preUpdate(time, delay)
    {
        if(this.x < 0)
        {
            // this.parent.created++;
            this.destroy(true);
        }
    }
}