let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;

// reserving some high score stuff
let highscore = new Array;