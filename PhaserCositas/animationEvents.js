 //Control animaciones
 this.attack.on('animationcomplete', function (anim, frame) {
    this.emit('animationcomplete_' + anim.key, anim, frame);
  }, this.attack);
                                //Name Animation
  this.attack.on('animationcomplete_attack', () => {
    this.playerController.onAttack = false;
  });

  //Muerte
  this.on('animationcomplete', function (anim) {

    if(anim.key === 'death')
    {
      this.scene.scene.pause(this.scene.scene.key);
      this.scene.scene.launch('deathBox',this.scene.scene.key);
    }
  }, this);

  //Esto al parecer funka mejor altoke mi rey
  this.on('animationrepeat', () => {
    console.log("uigvfeygurfhj");
})
this.on('animationcomplete-breakstar', () => {
    this.scene.addNewEnemies(this.x, this.y, this.scale, this.state, this);
})
this.on('animationcomplete-deadstar', () => {
    this.scene.removeEnemy(this);
})

//Crear animaciones
this.scene.anims.create({
    key: 'attack',                                                                 //n animaciones - 1  
    frames: this.scene.anims.generateFrameNumbers('player_attack', { start: 0, end: 7 }),
    frameRate: 24,
    showOnStart: true,
    hideOnComplete: true
  });

  //___________ Same
  this.scene.anims.create({
    key: 'up',
    frames: [{key: 'player', frame: 3}],
    frameRate: 10
});