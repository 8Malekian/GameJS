class SceneGameOver extends Phaser.Scene {
    constructor() {
      super({ key: "SceneGameOver"});
    }
    preload(){
      this.load.image("endTitle", "img/game-over-blue.jpg"); 
      this.load.image('end', 'img/gameOverbck.png'); 

  }
    create() {
      this.add.image(400, 300, 'end');  
      this.start= this.add.sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "endTitle" )
    }
  }