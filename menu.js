var menu_state = {
	create: function() {
		// Call the 'jump' function when the spacekey is hit
        this.game.input.onDown.add(this.start, this);

        // Defining variables
        var style = {fount:'30px Arial', fill: '#fff'};
        var x = game.world.width/2, y = game.world.height/2;

        // Adding a text centered on the screen.
        var text = this.game.add.text(x, y-50, "Click to start!!!", style);
        text.anchor.setTo(0.5, 0.5);

        // If the user already played
        if (score > 0) {
        	// Display its score
        	var score_label = this.game.add.text(x, y+50, "Score: " + score,
        		style);
        	score_label.anchor.setTo(0.5, 0.5);
        }
	},

	start:function() {
		this.game.state.start('play');
	}
}