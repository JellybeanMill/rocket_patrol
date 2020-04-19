// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);// add object to existing scene
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // adds rocket sound to respective spawn scene, and gives you the thing to access it.

        // setup movement direction
        this.direction = {
            x: 0,
            y: -1
        }
        this.acceleration = {
            x: 0,
            y: -1,
        }
        this.pointposition = {
            x: 0,
            y: 0,
        }

        scene.input.on('pointermove', function (pointer) {
            this.pointposition.x = pointer.x;
            this.pointposition.y = pointer.y;
        }, this);


        // click registry
        scene.input.mouse.disableContextMenu();
        scene.input.on('pointerup', function () {
            if(!this.isFiring){
                this.sfxRocket.play();
            }
            this.isFiring = true;
        }, this);

    }

    update() {

        // calculating acceleration
        this.acceleration.x = this.pointposition.x - this.x;
        this.acceleration.y = this.pointposition.y - this.y;

        // if fired, move up
        if(this.isFiring) {
            this.direction.x += this.acceleration.x/5000;
            this.direction.y += this.acceleration.y/5000;
            this.y += 2*this.direction.y;
            this.x += 2*this.direction.x;
        }

        // you're not allowed to miss
        //if(this.y <= 108) {
        //    this.reset();
        //}
        
    }
    //reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.direction.x = 0;
        this.direction.y = -1;
        this.y = 431;
    }
}