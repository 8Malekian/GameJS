class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain"});
    }
    preload() {
        //  les images et les sons
        this.load.image('ship', 'img/Vaisseau6.png');
        this.load.image('topwall1', 'img/topwall1.png');
        this.load.image('topwall2', 'img/topwall2.png');
        this.load.image('space', 'img/space.jpg');
        this.load.image('laser', 'img/laser.bmp');
        this.load.image('bullet', 'img/petit_rond.png');        
        this.load.image('enemyRed', 'img/enemyRed.png');
        this.load.spritesheet("explosion", "img/explosion.png", {
            frameWidth: 32,
            frameHeight: 32
          });

    
    }
    
    create() {
        //  initialisation de l'affichage ...
        this.add.image(400, 300, 'space');
        
        //vaisseau.setCollideWorldBounds();

        //animation de l'explosion
        this.anims.create({
            key: "explosion",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0
          });
        //creation du joueur

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,"ship"            
          );

        
        //Variable de touche
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        //Variable pour associer objet et laser
        this.targets= this.add.group();
        this.targetbullets=this.add.group();
        this.playerLasers= this.add.group();
        
        //apparition des cibles
        this.time.addEvent({
            delay: 2000,
            callback: function() {
              var target = new enemyM(
                this,
                this.game.config.width ,Phaser.Math.Between(75,(this.game.config.height-75))
              );
              this.targets.add(target);
            },
            callbackScope: this,
            loop: true
          

        })
        
       
       // Appel la fonction generedecors toutes les 1,5 secondes
        this.time.addEvent({
            delay: 350,
            callback: function nouveaudecors (){
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
            },
            callbackScope: this,
            loop: true,
        });
     // Affichage du score
     var score;
     let style = {
         font: '20px Arial',
         fill: '#fff',         
     };
     score = 0;
     //var vaisseau.alive = true;
     this.scoreText = this.add.text(20, 20, score, style);
     this.scoreText.depth =10;
        
    }
update(){
        this.player.update();
        if (this.up.isDown) {    
                this.player.moveUp();
            }
        else if (this.down.isDown) {
            this.player.moveDown();
            }
        if (this.left.isDown) {
            this.player.moveLeft();
            }
        else if (this.right.isDown) {
         this.player.moveRight();

             }
  }
}