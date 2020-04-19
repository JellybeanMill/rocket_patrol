class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {

        this.load.image('rocket', './assets/missle.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield','./assets/starfield.png');

        // load sprite sheet
        this.load.spritesheet('person', './assets/person_sprite.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
    }

    create() {
        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);

        // adding the rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket').setScale(0.5,0.5);
   
        // adding spaceships
        this.ship01 = new Spaceship(this, game.config.width+192, 132, 'person', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width+96, 196, 'person', 0, 30).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'person', 0, 30).setOrigin(0,0);

        // define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('person', {start:4, end:6, first:4}),
            frameRate: 3
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('person', {start:0, end:3, first:0}),
            frameRate: 3,
            repeat: -1
        })
        this.ship01.play('walk');
        this.ship02.play('walk');
        this.ship03.play('walk');

        // score
        this.p1Score = 0;

        // score display
        this.scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#fff',
            color: '#8b1db5',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        this.scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, this.endScreen, null, this);

        //mouse inputs
        this.input.mouse.disableContextMenu();

        this.input.on('pointerup', function () {
            if(this.gameOver == true){
                this.scene.start("menuScene");
            }
        }, this);

        //time updates
        let timeConfig = {
            fontFamily: 'Arial',
            fontSize: '15px',
            color: '#8b1db5',
            align: 'left',
        }
        this.timeLeft = this.add.text(this.p1Rocket.x,this.p1Rocket.y,6,timeConfig);
        
        this.anims.resumeAll();

        // UI is rendered last.
        let bigConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#8b1db5',
            stroke: '#fff',
            strokeThickness: 2,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.scoreLeft = this.add.text(game.config.width/2,0,this.p1Score, bigConfig).setOrigin(0.5,0);
    }

    update() {
        //if (this.gameOver && Phaser.Input.Pointer.leftButtonReleased()) {
        //    this.scene.start("scoreScene");
        //}

        //scroll starfield


        if (!this.gameOver){
            // the grassfield
            this.starfield.tilePositionX -= 4;
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01);
        }

        // updating Rocket Timer
        if(Phaser.Math.Snap.Ceil(6 - this.clock.getElapsedSeconds(),1) != this.timeLeft.text){
            this.timeLeft.text = Phaser.Math.Snap.Ceil(6 - this.clock.getElapsedSeconds(),1);
        }
        this.timeLeft.x = this.p1Rocket.x+this.p1Rocket.width;
        this.timeLeft.y = this.p1Rocket.y+this.p1Rocket.height;
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'person').setOrigin(0,0);
        boom.anims.play('death');
        boom.on('animationcomplete', () =>{
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        })
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');

        // reset 6 second timer
        this.clock.remove();
        this.clock = this.time.delayedCall(game.settings.gameTimer, this.endScreen, null, this);
    }

    endScreen() {
        highscore.push(this.p1Score);
        this.add.text(game.config.width/2, game.config.height/2-64, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
        highscore.sort();
        this.add.text(game.config.width/2, game.config.height/2, 'Current High Score', this.scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+45, highscore[highscore.length-1], this.scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+100, 'Click to Continue', this.scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        this.anims.pauseAll();
    }
}