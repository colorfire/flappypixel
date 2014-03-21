var play_state = {
    // No more 'preload' function, since it is already done in the 'load' state.

    create: function() {
        this.game.input.onDown.add(this.jump, this);

        this.pipes = this.game.add.group();
        this.pipes.createMultiple(20, 'pipe');

        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes,
            this);

        // Display the bired on the sreen
        this.bird = this.game.add.sprite(100, 245, 'bird');
        // Add gravity to the brid to make it fall
        this.bird.body.gravity.y = 1000;
        // change the center of rotation of the bird.
        this.bird.anchor.setTo(-0.2, 0.5);

        // No 'this.score', bug just 'score'
        score = 0;
        var style = {fount:'30px Arial', fill: '#fff'};
        this.label_score = this.game.add.text(20, 20, '0', style);

        this.jump_sound = this.game.add.audio('jump');
        this.hit_sound = this.game.add.audio('hit');
    }, 

    update: function() {
        if (this.bird.inWorld == false)
            this.restart_game();

        if (this.bird.angle < 20)
            this.bird.angle += 1;

        this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null,
            this);
    },

    jump: function() {
        if (this.bird.alive == false)
            return;

        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({angle: -20}, 100).start();
        this.jump_sound.play();
    },

    hit_pipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
        this.hit_sound.play();
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);
        /// This time we go back to the 'menu' state.
        this.game.state.start('menu');
    },

    // Generate pipe
    add_one_pipe: function(x, y) {
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();
        // Set the new position of the pipe
        pipe.reset(x, y);
        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;
        // Kill the pipe when it's no longer visible
        pipe.outOfBoundsKill = true;
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5)+1;
        for (var i=0; i < 8; i++){
            if (i != hole && i != hole +1)
                this.add_one_pipe(400, i*60+10);
        }
        // No 'this.score', but just 'score'
        score += 1;
        this.label_score.content = score;
    },
}