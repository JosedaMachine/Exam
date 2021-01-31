this.izqTrigger = this.add.zone(0, this.game.config.height/2).setSize(10, this.game.config.height);
    this.derTrigger = this.add.zone(this.game.config.width, this.game.config.height/2).setSize(10, this.game.config.height);
    this.physics.add.existing(this.izqTrigger);
    this.physics.add.existing(this.derTrigger);

    this.physics.add.overlap(this.izqTrigger, this.ball,()=> 
    {
      this.player.addPoint();
      this.ball.restorePos();

    });

    this.physics.add.overlap(this.derTrigger, this.ball,()=> {

      this.ball.restorePos();
      this.player2.addPoint();
    });