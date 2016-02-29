'use strict';
// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //this.speed, creates randoom speeds for the bugs
    this.speed = Math.random() * (300 - 100) + 100;
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
        //When a bug reaches the end of the canvas it reset them back to a random point before the canvas left margine
        this.x = -1 * (Math.random() * (800 - 200) + 200);
        this.speed = Math.random() * (300 - 100) + 100;
    }
    //Collision detections, this will detect colission, present an alert message, reset player.
    //creates a new random jeweland reset the score back to 0.
    if  (player.x < this.x + 60 && player.x + 60 > this.x && player.y < this.y + 50 && 50 + player.y > this.y) {
        alert('Seems you just got bitten by a bug!');
        player.resetPlayer();
        jewel = randomJewel();
        heart = randomHeart();
        //this action handles the lives after Enemy has collision with player
        if (lives === 0){
            score = 0;
            lives = 3;
            alert('GAME OVER');
        }else{
            lives = lives - 1;
        }
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.`
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//*******JEWELS********
//Jewels, they will give different points depending of colour when collision is detected 
var Jewel = function(x, y, sprite, value) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.value = value;
};

//Draw Jewel on the screen.
Jewel.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//*******HEARTS AND POISON BOTTLE********
//Hearts give you lives when you catch them 

var Heart = function(x, y, sprite, name) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.name = name;
};

//Draw heart on the screen.
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//******PLAYER*******
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

//Collision detection with Jewels
Player.prototype.update = function (){
    if  (jewel.x < this.x + 60 && jewel.x + 60 > this.x && jewel.y < this.y + 50 && 50 + jewel.y > this.y) {
        //Relocating Jewel outside canvas after collision detected
        jewel = new Jewel(-100, -100, 'images/gem-orange.png', 20);
        //Adding Jewel value to the total of the score.
        score = score + jewel.value;
    }
    if  (heart.x < this.x + 60 && heart.x + 60 > this.x && heart.y < this.y + 50 && 50 + heart.y > this.y) {
        //Relocating heart outside canvas after collision detected
        
        //if is heart it will add 1 live, if poison bottle it will take 1 live from player
        if (heart.name === "live"){
            lives = lives + 1;
            heart = new Heart(-100, -100, 'images/Heart.png', 1);
        }if (heart.name === "dead"){
            this.resetPlayer();
            jewel = randomJewel();
            heart = randomHeart();
            if (lives === 0){
                score = 0;
                lives = 3;
            alert('GAME OVER');
        }else{
            lives = lives - 1;
            }
        }
        
    }
};



//Handeling the events of the arrow keys.
Player.prototype.handleInput = function(direction) {
    //left direction with boundary
    if (direction === 'left' && this.x > 0) {
            this.x -= 102;
    }
    //up direction, score update, boundary, and action when Player reaches  water.
    if (direction === 'up') {
            this.y -= 82;
            score = score + 2;
    }
    //right direction with boundary
    if (direction === 'right' && this.x < 350 ){
        this.x += 102;
        }
    //right direction with boundary and score update
    if (direction === 'down' && this.y < 400) {
        this.y += 82;
        score = score - 1;
    }
    if (this.y <= 0){
        this.resetPlayer();
        //Sets random heart after player reaches the top
        heart = randomHeart();
        //After creating new Jewels with random coordinates, 
        //this will select a random jewel from allJewels array
        jewel = randomJewel();
        score = score + 50;        
    }
};

//This function resets the player to its starting location.

Player.prototype.resetPlayer = function () {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Enemies array
var allEnemies = [];
//Creating 3 enemies and pushing them in to the  allEnemies array.

var enemy1 = new Enemy(58);
var enemy2 = new Enemy(142);
var enemy3 = new Enemy(225);
allEnemies.push(enemy1, enemy2, enemy3);

//Player variable with starting coordinates
var player = new Player(200, 400);

// this will create a new empty allJewels array, 
// will create new jewels and  give random location to each
// and then push them into the allJewels array
var randomJewel = function(){
    var allJewels = [];
    var xArray = [0, 102, 202, 302, 404];
    var yArray = [50, 134, 218];
    var xJewel = xArray[Math.floor(Math.random() * xArray.length)];
    var yJewel = yArray[Math.floor(Math.random() * yArray.length)];
    var jewel1 = new Jewel(xJewel, yJewel, 'images/gem-blue.png', 5);
    var jewel2 = new Jewel(xJewel, yJewel, 'images/gem-green.png', 10);
    var jewel3 = new Jewel(xJewel, yJewel, 'images/gem-orange.png', 20);
    allJewels.push(jewel1, jewel2, jewel3);
    var jewel = allJewels[Math.floor(Math.random() * allJewels.length)];
    return jewel;
};
//Randomly put jewel on canvas
var jewel = randomJewel();

//This will create a heart object with a random location 
//every time this function gets called.
var randomHeart = function(){
    var allhearts = [];
    var xArray = [0, 102, 202, 302, 404];
    var yArray = [74, 158, 242];
    var xHeart = xArray[Math.floor(Math.random() * xArray.length)];
    var yHeart = yArray[Math.floor(Math.random() * yArray.length)];
    var heart1 = new Heart(xHeart, yHeart, 'images/Heart.png', 'live');
    var heart2 = new Heart(xHeart, yHeart, 'images/poison_bottle.png', 'dead');
    allhearts.push(heart1, heart2);
    var heart = allhearts[Math.floor(Math.random() * allhearts.length)];
    return heart;
};
//random heart on canvas
var heart = randomHeart();

//score and lives variables at start of the game
var lives = 3;
var score = 0;

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
