var config = {
    width: 800,
    height: 490,
    backgroundColor: "black",
    /*scene: {
        preload: preload, // Chargement des ressources
        create: create, // Initialisation des variables & objets
        update: update // Fonction appelée 60 fois par seconde
    }*/
   // parent: 'R-type', // Affiche le jeu dans le div id="R-type"
    physics: {
        default: 'arcade', // Permet d'appliquer
        arcade: {
            gravity: {
                y: 0,
                x: 0
            },

        },
    },
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver
    ],
    pixelArt: true,
    roundPixels: true


};
var game = new Phaser.Game(config);