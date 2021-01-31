this.scene.input.keyboard.createCursorKeys();

//--------------------------------------------------------

const keyConfig = this.input.keyboard.addKeys({
    'up': Phaser.Input.Keyboard.KeyCodes.I,
    'left': Phaser.Input.Keyboard.KeyCodes.J,
    'right': Phaser.Input.Keyboard.KeyCodes.L
  });

//-------------------------------------------------

this.keycodeA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

//------------------------------------------------
//CUALQUIER TECLA
this.scene.input.keyboard.on('keydown', ()=>{
    if(this.body.onFloor()) {
        this.body.setVelocityY(this.jumpSpeed);
      }
  });
  
//INPUT DE RATÓN

this.on('pointerover',() => {
    console.log('Hola soy el chocu y estoy pasando por enicma');
  });

  this.on('pointerout',() => {
    console.log('Hola soy el chocu y he dejado de estar encima');
  });

  this.on('pointerdown',() => {
    console.log('Hola soy el chocu y he clickado');
  });

  this.on('pointerup',() => {
    console.log('Hola soy el chocu y he dejado de clickar');
  });
