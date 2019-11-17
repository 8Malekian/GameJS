var config = {
    width: 800,
    height: 490,
    scene: {
        preload: preload, // Chargement des ressources
        create: create, // Initialisation des variables & objets
        update: update // Fonction appelée 60 fois par seconde
    },
    parent: 'R-type', // Affiche le jeu dans le div id="R-type"
    physics: {
        default: 'arcade', // Permet d'appliquer
        arcade: {
            gravity: {
                y: 0
            },
        },
    },


};
// Variables globales
var game = new Phaser.Game(config);
var haut;
var decors;
var generedecors;
var score;
var pointeur;

function preload() {
    // C'est là qu'on vas charger les images et les sons
    this.load.image('ship', 'img/ship.jpg');
    this.load.image('topwall1', 'img/topwall1.png');
    this.load.image('topwall2', 'img/topwall2.png');
    this.load.image('space', 'img/space.jpg');

}

function create() {
    // Ici on vas initialiser les variables, l'affichage ...
    vaisseau = this.physics.add.sprite(100, 245, 'ship'); // Affiche 'vaiseau' en x=100 y=245

    haut = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ArrowUp); // Écoute la touche haut
    bas = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ArrowDown); // Écoute la touche bas
    droite = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ArrowRight); // Écoute la touche droite
    gauche = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ArrowLeft); // Écoute la touche gauche

    // Appel la fonction generedecors toutes les 1,5 secondes
    generedecors = this.time.addEvent({
        delay: 350,
        callback: nouveaudecors,
        callbackScope: this,
        loop: true,
    });

    // Affichage du score
    let style = {
        font: '20px Arial',
        fill: '#fff'
    };
    score = 0;
    this.scoreText = this.add.text(20, 20, score, style);
    this.add.image(400, 300, 'space');
    //pointeur = this.input.activePointer;
    //vaiseau.alive = true;
    speed = Phaser.Math.GetSpeed(300, 1);
}

function update() {
    //mouvement vers le haut
    if (Phaser.Input.Keyboard.JustDown(haut)) {
        if (vaiseau.alive) {
            vaiseau.setVelocity(-350);
        }
    }
    //mouvement vers le bas   
    if (Phaser.Input.Keyboard.JustDown(bas)) {
        if (vaiseau.alive) {
            vaiseau.setVelocity(+350);
        }
    }
}

function nouveaudecors() {
    

    // on regroupe tout les bout de tuyaux dans un objet groupe
    decors = this.physics.add.group();
    var typeDecors = Phaser.Math.Between(1, 8);
        if (typeDecors != 8 && typeDecors != 7) {
            // on ajoute les petits decors
            //decors.create(400, (60 * typeDecors) + 30, 'topwall1');
            decors.create(820, 30,'topwall1');
            decors.create(820, 460,'topwall1');
        } else {
            //on ajoute les grands decors
            decors.create(820, 30,'topwall1');
            decors.create(820, 70,'topwall1');
            decors.create(820, 410,'topwall1');
            decors.create(820, 460,'topwall1');
        }

    
    decors.setVelocityX(-200); // Fait défiler des tuyaux vers la gauche
    score += 1;
    this.scoreText.setText(score);
}