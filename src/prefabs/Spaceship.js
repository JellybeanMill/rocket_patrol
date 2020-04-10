// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointvalue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);// add object to existing scene
        this.points = pointvalue;
    }

    update() {
        // move spaceship left
        this.x -= 3;

        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }
}