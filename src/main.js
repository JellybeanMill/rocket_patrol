/*
Hello. Here's what I tried to do.
Track a high score that persists across scenes and display it in the UI (10)
Allow the player to control the Rocket after it's fired (10)
Display the time remaining (in seconds) on the screen (15)
Create a new title screen (15)
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25) 
Implement a new timing/scoring mechanism that adds time to the clock for successful hits (25)
Implement mouse control for player movement and mouse click to fire (25)

I wanted to go for a full redesign, but figured it was too much work, and realized I already did enough, so I was like,
"Here is my minimum viable product, give me my points."
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play, Score],
}

let game = new Phaser.Game(config);

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 1000
}

// reserving some high score stuff
let highscore = new Array