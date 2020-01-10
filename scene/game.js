var config = {
    width: 800,
    height: 600,
    backgroundColor: "black",
    physics: {
        default: 'arcade', // Permet d'appliquer
        arcade: {
            gravity: {
                y: 0,
                x: 0
            },

        },
    },
    //scene du jeux
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver
    ],
    pixelArt: true,
    roundPixels: true


};
var game = new Phaser.Game(config);