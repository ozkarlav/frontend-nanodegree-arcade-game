// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //this.speed, creats randoom speeds for the bugs, everytime they are reseted
    this.speed = Math.random() * (500 - 100) + 100;
    this.x = -400;
    this.y = y;


    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) { 
    //updates the x position of every bug. as long as they remain in the canvas. 
    if (this.x < 505 ){
        this.x += this.speed * dt;
    }else{
        //When a bug reaches the end of the canvas it reset them back to a random point before the canvas left margin
        this.x = -1 * (Math.random() * (800 - 200) + 200);
    };
    //Collision detections
    if  (player.x < this.x + 60 && player.x + 60 > this.x && player.y < this.y + 50 && 50 + player.y > this.y) {
        alert('Seems you just got bitten by a bug!');
        resetPlayer();
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
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';


};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Player.prototype.handleInput = function(direction) {

    //
    //left direction with boundary
    if (direction === 'left') {
        if (this.x > 0 ){
            this.x -= 102;
        }

    }
    //up direction
    if (direction === 'up') {
            this.y -= 82;
    }
    //right direction with boundary
    if (direction === 'right'){
        if (this.x < 350  ){
            this.x += 102;
        }
    }
    //right direction with boundary
    if (direction === 'down') {
        if (this.y < 400 ){
            this.y += 82;
        }
    }
    //if player reaches top border/water has won
    if (this.y <= 0){
        resetPlayer();
        alert('Good Job you are a Winner!');
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Enemies array
var allEnemies = [];
//Player variable with starting coordinates
var player = new Player(200, 400);

//Creating 3 enemies and pushing them in to the ALLENEMIES ARRAY
var enemy1 = new Enemy(58);
var enemy2 = new Enemy(142);
var enemy3 = new Enemy(225);
allEnemies.push(enemy1, enemy2, enemy3);

//This function resets the player 
var resetPlayer = function () {
    player.x = 200;
    player.y = 400;
    //for (i = 1; i=> allEnemies.length; i++){
    // allEnemies[i].x = -1 * (Math.random() * (800 - 200) + 200);
    //}
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
