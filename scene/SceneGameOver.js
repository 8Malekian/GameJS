class SceneGameOver extends Phaser.Scene {
    constructor() {
      super({ key: "SceneGameOver"});
    }
    preload(){       
      this.load.image('end', 'img/gameOverbck.jpg'); 

  }
    create() {
      this.add.image(400, 300, 'end');  
    }
  }