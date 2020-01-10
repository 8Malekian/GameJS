class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu", active: true});
    }
    preload(){
        this.load.image("btnPlay", "img/Start_On.png");
        this.load.image("btnPlayDown", "img/Start_off.png");
        this.load.image('start', 'img/start.jpg'); 

    }
    create() {
      //ajout du bouton play
      this.add.image(400, 170, 'start');  
      this.start= this.add.sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.85,
        "btnPlay"
      );
      //creation de l'animation du bouton (effet clic dessus)
      this.start.setInteractive();

      this.start.on("pointerdown", function() {
        this.start.setTexture("btnPlayDown");
      }, this);

      this.start.on("pointerup", function() {
        this.start.setTexture("btnPlay");
        this.scene.start("SceneMain");
      }, this);

      this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      
      this.space.on(this.space.isDown,function () {
        this.scene.start("SceneMain");
      },this)
      
    }
}  