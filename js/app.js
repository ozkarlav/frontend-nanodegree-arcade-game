// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.width = 171;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) { 
    if (this.x < 505 ){
        this.x += this.speed * dt;
    }else{
        this.x = -200;
       // this.y = Math.random() * ()
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.`
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.speed = 100;
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(x, y) {
    this.x = x;
    this.y = y;
 
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 200, 400);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var player = new Player();

var enemy1 = new Enemy(-200, 50, 100);
var enemy2 = new Enemy(-200, 50, 200);
var enemy3 = new Enemy(-200, 50, 300);
allEnemies.push(enemy1, enemy2, enemy3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    Player.player.handleInput(allowedKeys[e.keyCode]);
});
