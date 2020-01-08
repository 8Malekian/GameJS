class Entity extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, key, type) {
        {
            super(scene, x, y, key);
            this.scene = scene;
            this.scene.add.existing(this);
            this.scene.physics.world.enableBody(this, 0);
            this.setData("type", type);
            this.setData("isAlive", true);
    }
}

};

class Player extends Entity {
    constructor(scene, x, y, key, type) {
        super (scene, x, y, key, "Player");
        this.setData("speed", 200);
        this.setData("tire",false);
        this.setData("tempRecharge",10);
        this.setData("tempTire",this.getData("tempRecharge")-1);
    }
    moveRight() {
        this.body.velocity.x = this.getData("speed");
      }
    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
      }     
    moveUp() {
        this.body.velocity.y = -this.getData("speed");
      }
    moveDown() {
        this.body.velocity.y = this.getData("speed");
      }
    update(){
        this.body.setVelocity(0, 0);
          this.x = Phaser.Math.Clamp(this.x, 20, this.scene.game.config.width-20);
          this.y = Phaser.Math.Clamp(this.y, 20, this.scene.game.config.height-20);
        if(this.getData("tire")){
          var bulletP = new PlayerLazer(
            this.scene,
            this.x,
            this.y);
            this.scene.playerLasers.add(bulletP);
        }
    }};

class enemyM extends Entity{
    constructor(scene, x, y) {
        super(scene, x, y, "enemyRed", "enemy1");
        this.play ("enemyRed");
        this.body.velocity.x = Phaser.Math.Between(-50, -100);
        this.lasershoot= this.scene.time.addEvent({
            delay: 1000,
            callback: function() {
              var bullet = new MLazer(
                this.scene,
                this.x,
                this.y
              );
              bullet.setScale(this.scaleX);
              this.scene.targetbullets.add(bullet);
            },
            callbackScope: this,
            loop: true
          });

}};

class MLazer extends Entity{
    constructor(scene, x, y) {
        super(scene, x, y, "bullet");
        this.body.velocity.x = -150;
    }
onDestroy () {
    if (this.lasershoot !== undefined) {
        if (this.lasershoot) {
          this.lasershoot.remove(false);
        }
    
    
}
}};
class PlayerLazer extends Entity{
  constructor(scene,x,y){
    super(scene,x,y,"bullet")
    this.body.velocity.x=+200;
  }
}

class decors {
    
        constructor(scene, key, velocityX) {
            this.scene = scene;
            this.key = key;
            this.velocityX = velocityX
            this.layers = this.scene.add.group();
        }
      
}
