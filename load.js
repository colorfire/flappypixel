
var load_state = {
	preload: function() {
        // this.reset_window_size();
        // Change the background color of the game
        this.game.stage.backgroundColor = '#71c5cf';
        // Load the bird sprite
        this.game.load.image('bird', 'assets/bird.png');
        this.game.load.image('pipe', 'assets/pipe.png');
        this.game.load.audio('jump', 'assets/jump.wav');
        this.game.load.audio('hit', 'assets/hit.wav');
    },

    create: function() {
    	// When all asset are load, go to the 'menu' state
    	this.game.state.start('menu');
    }
}