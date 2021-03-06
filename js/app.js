// Enemies our player must avoid
var Enemy = function() {
	"use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = this.randomX();
    this.y = this.randomY();
	this.sprite = this.randomShip();
    this.speed = Math.floor(Math.random() * (600 - 100)) + 100;
};

// variables and functions to return random X & Y coordinates

Enemy.prototype.randomX = function() {
	"use strict";
	var valueX = [-100, -175, -150, -225, -300];
	return valueX[Math.floor(Math.random() * 5)];
};
Enemy.prototype.randomY = function() {
	var valueY = [84, 171, 255];
	return valueY[Math.floor(Math.random() * 3)];
	};
// variable and function to return a random enemy image

Enemy.prototype.randomShip = function() {
	"use strict";
	var shipsArray = ['images/ship-2.png', 'images/ship-3.png', 'images/ship-4.png'];
	return shipsArray[Math.floor(Math.random() * 3)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	"use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.speed);

    // when bug goes off screen, bring it back
    // with random coordinates + speed
    if (this.x > 750) {
    	this.x = this.randomX();
		this.y = this.randomY();
        this.speed = Math.floor(Math.random() * (600 - 100)) + 100;
    }
};

Enemy.prototype.shipReset = function() {
	"use strict";
	this.x = this.randomX();
	this.y = this.randomY();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	"use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	"use strict";
    this.sprite = 'images/ship.png';
    this.playerReset();
};

// collision function looks at x & y of the allEnemies array
// and compares it to the Player instance's values.
// calls a reset on the player and the bug when True.
Player.prototype.collision = function() {
	"use strict";
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
            this.playerReset();
            allEnemies[i].shipReset();
            break;
        }
    }
};

// boundaries for the player
Player.prototype.update = function(dt) {
	"use strict";
    if (this.x < -2) {
        this.x = -2;
    }
    if (this.x > 402) {
        this.x = 402;
    }
    if (this.y > 420) {
        this.y = 420;
    }
    // when player touches water, you win + call reset
    if (this.y < 30) {
        alert('Ribbit! Ribbit! You win!');
        this.playerReset();
    }
    this.collision();
};


Player.prototype.render = function() {
	"use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// move player based on the pixels determined in engine for col / row
Player.prototype.handleInput = function(keys) {
	"use strict";
    switch (keys) {
        case "up":
            this.y -= 83;
            break;
        case "down":
            this.y += 83;
            break;
        case "left":
            this.x -= 101;
            break;
        case "right":
            this.x += 101;
            break;
        default:
            break;
    }
};
// instantiate the player
Player.prototype.playerReset = function() {
	"use strict";
    this.x = 202;
    this.y = 420;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy());

var player = new Player();

// function to create new ships / enemies
var createShips = function() {
	"use strict";
    var ship = 4;
    var count = 0;
    while (ship > count) {
        var ships = new Enemy();
        allEnemies.push(ships);
        count++;
    }
};
createShips();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	"use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});