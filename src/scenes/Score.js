class Score extends Phaser.Scene {
    constructor() {
        super("scoreScene");
    }

    create() {
        console.log("Entering Score Menu");
        this.add.text(20,20, "Rocket Patrol Menu");

        // all our data for what that font will look like
        let scoreboardtext = {
            fontFamily: 'Courier',
            fontSize: '28px',
            fontStyle: 'strong',
            backgroundColor: '#F38141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        // Reading the array of scores. 
        this.bigScores = new Array;
        highscore.sort();
        for(var i = 0; i < highscore.length && i<10; i++){
            this.bigScores.push(highscore[i]);
        }

        // Dumping those scores onto the screen
        this.add.text(game.config.width/2, game.config.height/15, "HIGH SCORES", scoreboardtext);
        for (var i = 0; i < 10; i++) {
            this.add.text(game.config.width/2, game.config.height/15*(i+3), "HIGH SCORES", scoreboardtext);
        }
        this.add.text(game.config.width/2, game.config.heigh/15*14, "CLICK to return", scoreboardtext);
    }

    update() {
        // just to check for the click

        if(Phaser.Input.Pointer.leftButtonReleased()){
            this.scene.start("menuScene");
        }
    }
}