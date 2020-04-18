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
        }, this)
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= 47){
                this.x -= 2;
            }
            else if (keyRIGHT.isDown && this.x <= 578) {
                this.x += 2;
            }

        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }

        // calculating acceleration
        this.acceleration.x = this.pointposition.x - this.x;
        this.acceleration.y = this.pointposition.y - this.y;

        // if fired, move up
        if(this.isFiring && this.y >= 108) {
            this.direction.x += this.acceleration.x/5000;
            this.direction.y += this.acceleration.y/5000;
            this.y += 2*this.direction.y;
            this.x += 2*this.direction.x;
        }

        // reset on miss
        if(this.y <= 108) {
            this.reset();
        }

        
    }
    //reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.direction.x = 0;
        this.direction.y = -1;
        this.y = 431;
    }
}