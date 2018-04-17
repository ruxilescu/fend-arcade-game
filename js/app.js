// Win
// Make the win popup and overlay appear
function winGame() {
  const OVERLAY = document.getElementById('overlay');
  OVERLAY.classList.remove('hidden');

  const WIN = document.getElementById('win');
  WIN.classList.remove('hidden');
}

// Reset when colliding an enemy
function reset() {
  // Position of the player reset to 240, 600
  player.x = 240;
  player.y = 600;
}
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Drone1_120X120.png';
    // Take the position from the parameter
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed;
    if (this.x >= 1024) this.x = -240;

    // Check if the enemy is at the same location as the player
    if (this.y === player.y) {
      if (player.x >= this.x - 50 && player.x <= this.x + 50) reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  // Define the initial sprite to be used
  this.sprite = 'images/spaceship_rogue_120X120.png';
  // Take the position from the parameter
  this.x = x;
  this.y = y;
};

Player.prototype.update = function(dt) {
  // Check if the player has won
  if (player.y === 0) winGame();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keycode) {
  // Move the player accordingly to the key pressed
  switch (keycode) {
    case 'up':
      if (player.y - 120 >= 0) player.y -= 120;
    break;
    case 'down':
      if (player.y + 120 <= 600) player.y += 120;
    break;
    case 'left':
      if (player.x - 120 >= 0) player.x -= 120;
    break;
    case 'right':
      if (player.x + 120 <= 480) player.x += 120;
    break;
  }
};

// Now instantiate your objects.
// Place the player object in a variable called player
let player = new Player(240, 600);

// Instantiate the enemies
let enemy1 = new Enemy(-120, 120, 2);
let enemy2 = new Enemy(-360, 120, 3);
let enemy3 = new Enemy(-120, 120, 4);
let enemy4 = new Enemy(-240, 240, 5);
let enemy5 = new Enemy(-360, 240, 6);
let enemy6 = new Enemy(-120, 240, 7);
let enemy7 = new Enemy(-480, 360, 8);
let enemy8 = new Enemy(-240, 360, 9);

// Change the sprite of the enemies
enemy1.sprite = 'images/Drone2_120X120.png';
enemy4.sprite = 'images/Drone2_120X120.png';
enemy6.sprite = 'images/Drone3_120X120.png';
enemy2.sprite = 'images/Drone3_120X120.png';
enemy3.sprite = 'images/Drone4_120X120.png';
enemy7.sprite = 'images/Drone4_120X120.png';
// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];

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

// Restart the game after winning if click on the restart button
const RESTART = document.getElementById('restart');

RESTART.addEventListener('click', function() {
  location.reload();
});
