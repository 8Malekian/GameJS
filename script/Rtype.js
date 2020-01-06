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
                y: 0,
                x: 0
            },

        },
    },


};



// Variables globales
var game = new Phaser.Game(config);
var haut;
var bas;
var droite;
var gauche;
var decors;
var generedecors;
var score;
var pointeur;

function preload() {
    // C'est là qu'on vas charger les images et les sons
    this.load.image('ship', 'img/Vaisseau6.png');
    this.load.image('topwall1', 'img/topwall1.png');
    this.load.image('topwall2', 'img/topwall2.png');
    this.load.image('space', 'img/space.jpg');
    this.load.image('bullet', 'img/bullet.png');

}

function create() {
    // Ici on vas initialiser les variables, l'affichage ...
    this.add.image(400, 300, 'space');
    vaisseau = this.physics.add.sprite(200, 245, 'ship'); // Affiche 'vaiseau' en x=100 y=245
    vaisseau.setCollideWorldBounds();


    cursors = this.input.keyboard.createCursorKeys();
    // Affichage du score
    let style = {
        font: '20px Arial',
        fill: '#fff'
    };
    score = 0;
    vaisseau.alive = true;
    this.scoreText = this.add.text(20, 20, score, style);
    // Appel la fonction generedecors toutes les 1,5 secondes
    generedecors = this.time.addEvent({
        delay: 350,
        callback: nouveaudecors,
        callbackScope: this,
        loop: true,
    });



    //pointeur = this.input.activePointer;
    //vaiseau.alive = true;
    speed = Phaser.Math.GetSpeed(300, 1);
}

function update() {
    //mouvement de vaisseau

    if (cursors.left.isDown) {
        if (vaisseau.alive) {
            vaisseau.setVelocityX(-160);
            vaisseau.anims.play('left', true);

        }
    } else if (cursors.right.isDown) {
        if (vaisseau.alive) {
            vaisseau.setVelocityX(160);
            vaisseau.anims.play('right', true);
        }

    } else if (cursors.up.isDown) {
        if (vaisseau.alive) {
            vaisseau.setVelocityY(-160);
            vaisseau.anims.play('up', true);
        }

    } else if (cursors.down.isDown) {
        if (vaisseau.alive) {
            vaisseau.setVelocityY(160);
            vaisseau.anims.play('down', true);
        }

    } else {
        if (vaisseau.alive) {
            vaisseau.setVelocityX(0);
            vaisseau.setVelocityY(0);
            vaisseau.anims.play('turn');
        }
    }

    if (cursors.up.isDown && vaisseau.body.touching.down) {
        vaisseau.setVelocityY(-330);
    }
    if (this.physics.collide(vaisseau, decors)) {
        if (vaisseau.alive == false) {
            return;
        }
        vaisseau.alive = false; // Couic
    }


}

function nouveaudecors() {


    // on regroupe les decors dans un objet groupe
    decors = this.physics.add.group();
    var typeDecors = Phaser.Math.Between(1, 8);
    if (typeDecors != 8 && typeDecors != 7) {
        // on ajoute les petits decors
        //decors.create(400, (60 * typeDecors) + 30, 'topwall1');
        decors.create(820, 30, 'topwall1');
        decors.create(820, 460, 'topwall1');
    } else {
        //on ajoute les grands decors
        decors.create(820, 30, 'topwall1');
        decors.create(820, 70, 'topwall1');
        decors.create(820, 410, 'topwall1');
        decors.create(820, 460, 'topwall1');
    }


    decors.setVelocityX(-200); // Fait défiler le decord vers la gauche
    score += 1;
    this.scoreText.setText(score);
}
function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = sprite.rotation;
            game.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
            bulletTime = game.time.now + 50;
        }
    }

}
