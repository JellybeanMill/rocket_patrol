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
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        // Reading the array of scores. 


        

        // Dumping those things onto the screen



        // Putting the buttons to go back to main menu.
    }

    update() {
        // keyboard inputs for 


    }
}