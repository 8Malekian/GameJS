class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu", active: true});
    }
    preload(){
        this.load.image("btnPlay", "img/btndark.png");
        this.load.image("btnPlayHover", "img/btnlight.png");
        this.load.image("btnPlayDown", "img/btndarker.png");

    }
    create() {
      this.scene.start("SceneMain");
    }
}  