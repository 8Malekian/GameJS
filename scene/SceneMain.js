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
        this.load.image('enemyRed', 'img/enemyM.png');
        this.load.spritesheet("explosion", "img/explosion.png", {
            frameWidth: 32,
            frameHeight: 32
          });

    
    }
    
    create() {
        //  initialisation de l'affichage avec la taille de l'ecrand de jeux 
        this.add.image(400, 300, 'space');        
        

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
        this.playerbullets= this.add.group();
        this.decors= this.add.group();
        
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
          

        });
        
       
       // création les décors
        this.time.addEvent({
            delay: 350,
            callback: function (){
              var typeDecors = Phaser.Math.Between(1, 8);
              if (typeDecors != 8 && typeDecors != 7) {
                // on ajoute les petits decors
                var decorH= new decors (this, 820,30);
                var decorB= new decors (this, 820,580);
                this.decors.add(decorH);
                this.decors.add(decorB);
                
            } else {
                //on ajoute des grands decors
                var decorH1= new decors (this, 820,30);
                var decorH2= new decors (this, 820,70);
                var decorB1= new decors (this, 820,530);
                var decorB2= new decors (this, 820,580);
               
                this.decors.add(decorH1);
                this.decors.add(decorH2);
                this.decors.add(decorB1);
                this.decors.add(decorB2);

            }
            score += 1;
            this.scoreText.setText(score);
          },              
            callbackScope: this,
            loop: true
        });
       

      //collision avec laser dujoueur
      this.physics.add.collider(this.playerbullets,this.targets,function (playerbullets,enemyM) {
        if (enemyM.onDestroy !== undefined) {
             enemyM.onDestroy();
        }
        enemyM.onDestroy(true);
        enemyM.destroy();
        playerbullets.destroy();
        score+=100
      })
      //collision avec les enemis
      this.physics.add.overlap(this.player, this.targets, function(player, enemyM) {
        if (!player.getData("isDead") &&
            !enemyM.getData("isDead")) {
          player.explosion(false);
          player.ondestroy();
          enemyM.explosion(true);
          
        }});
        //collision avec les laser enemis
       this.physics.add.overlap(this.player, this.targetbullets, function(player, Mbullet) {
          if (!player.getData("isDead") &&
              !Mbullet.getData("isDead")) {
            player.explosion(false);
            Mbullet.destroy();
          }
        });


      //collision avec mur
      this.physics.add.overlap(this.player,this.decors,function(player, decors) {
      if (!player.getData("isDead")) {
            player.explosion(false);
            player.ondestroy();
            
          }
        });
     // Affichage du score
     var score;
     let style = {
         font: '20px Arial',
         fill: '#fff',         
     };
     score = 0;
 
     this.scoreText = this.add.text(20, 20, score, style);
     this.scoreText.depth =10;
     
     
    }
update(){
       //mouvement
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
            //tire
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            this.player.setData("tire", true);
        } else {
            this.player.setData("tire", false);
              }  
  }
}