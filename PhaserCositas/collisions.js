                            //Ob1   //Ob2     //Method  //callBackProcess   //CallBack Context 
this.scene.physics.add.collider(enemigo, jugador, this.divide, null, this);

//The methods mmust contains as parameters, the two objects in the exact same order as they are in the instrucction above.


// CallBackProcess:
// An optional callback function that lets you perform additional checks against the two objects if they collide. I
// f this is set then collideCallback will only be called if this callback returns true.


//------------------------------------------------------------------

this.scene.add.existing(this);
this.scene.physics.add.existing(this);

//------------------------------------------------------------------
//Thsis: objeto que quieres que colisione con los bordes de la pantalla
this.body.setCollideWorldBounds();


//CREAR GRUPOS FíSICOS
this.walls = this.physics.add.staticGroup();        //ASÍ SE CREA UN GRUPO ESTÁTICO

//INPUT SOLO UNA VEZ
Phaser.Input.Keyboard.JustDown(this.keycodeV);

Phaser.Input.Keyboard.UpDuration(this.keycodeV);
Phaser.Input.Keyboard.DownDuration(this.keycodeV);
Phaser.Input.Keyboard.JustUp(this.keycodeV);


//Duracion de tecla presionada
var duration = keyObj.getDuration(); // ms
