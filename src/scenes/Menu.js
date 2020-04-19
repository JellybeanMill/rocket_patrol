class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('title', './assets/title_sprite.png')
        this.load.image('starfield','./assets/starfield.png');
    }

    create() {
        this.add.text(20,20, "Rocket Patrol Menu");
        this.add.image(0,0,'starfield').setScale(2,2);
        this.add.image(game.config.width/2, game.config.width/4, 'title').setOrigin(0.5,0.5);

        // menu display
        let menuConfig = {
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

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        this.add.text(centerX, centerY + textSpacer, 'Click to Continue', menuConfig).setOrigin(0.5);

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //this.scene.start("playScene");

        // for continuing
        this.input.mouse.disableContextMenu();

        this.input.on('pointerup', function () {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 6000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }, this);

    }
}