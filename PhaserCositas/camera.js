this.skyUp = this.add.tileSprite(this.game.config.width/2,this.game.config.height/3, 0, 0, 'tileBGUp');
this.skyDown = this.add.tileSprite(this.game.config.width/2,this.game.config.height/1.15, 0, 0, 'tileBGDown');


this.skyUp.setScale(this.bgScale, this.bgScale);
this.skyDown.setScale(this.bgScale, this.bgScale);

//O para que scrolle el fondo cuando la camara se mueve
this.skyDown = this.add.tileSprite(0,0,this.game.config.width/2,this.game.config.height/1.15, 'tileBGDown');
this.skyDown.setOrigin(0,0);
this.skyDown.setScrollFactor(0);
this.cameras.main.startFollow(this.player, false, 0.03, 0.03);

// in the update
this.skyDown.tilePositionX = this.cameras.main.scrollX * 0.3;

//Ya esta

//Para que los bounds sean de la camara
this.cameras.main.setBounds(0,0,this.bg.height*5.3, this.bg.width);  

//SEGUIR AL JUGADOR 
                            ///esto sosn parametros para que vaya smooth
this.cameras.main.startFollow(this.player, false, 0.03, 0.03);
//Offeset para seguir al jugador
this.cameras.main.followOffset.set(0,125);

this.cameras.main.zoomTo(0.8, 2000);

//
this.cameras.main.fadeIn(2000, 0, 0, 0);

this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => 
{
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.start('Intro');
    })
});

this.cameras.main.fadeOut(1000, 0, 0, 0);