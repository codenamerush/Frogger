var count = 0;
var kingdom = ["Dorne", "Westeros", "Highgarden", "Valeria", "Winterfell"];
var thrones = ["char-cat-girl", "char-pink-girl", "char-horn-girl", "char-princess-girl", "Key"];
// Enemies our player must avoid
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random()*500);
    if(this.speed < 200) {
        this.speed = 200;
    }
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x = (this.x) + this.speed*dt;
    if(this.x > 505) {
        this.x = -25;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Players = function() {
    this.x=202;
    this.y=404;
    this.sprite = 'images/char-boy.png';

};

Players.prototype.update = function() {
    //noop
};

// Draw the player on the screen, required method for game
Players.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Players.prototype.handleInput = function(keyCode) {
        if(keyCode == 'left') {
            if((this.x - 101) >= 0) {
            this.x -= 101;
            }
        }
        //top
        else if(keyCode == 'up') {
            if((this.y - 83) > -70) {
            this.y -= 83;
            }
        }
        //right
        else if(keyCode == 'right') {
            if((this.x + 101) < 405){
            this.x += 101;
            }
        }
        //bottom
        else if(keyCode == 'down') {
            if((this.y + 83) < 440){
            this.y += 83;
            }
        }
        if (this.y < 0) {
            count++;
            if(count === 5) {
                setTimeout(function(){
                    alert("You have successfully claimed the Bug Throne!");
                    count=0;
                }, 100);  
            }
            reset();
        }
}

function reset() {
    player.x=202;
    player.y=404;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
allEnemies.push(new Enemy(Math.floor(Math.random()*200),72));
allEnemies.push(new Enemy(Math.floor(Math.random()*200),155));
allEnemies.push(new Enemy(Math.floor(Math.random()*200),238));
allEnemies.push(new Enemy(Math.floor(Math.random()*200),72));
allEnemies.push(new Enemy(Math.floor(Math.random()*200),238));
let player = new Players();


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

function checkCollisions(){
    for (let index = 0; index < allEnemies.length; index++){
        const enemy = allEnemies[index];
        if (Math.abs(enemy.x - player.x) <= 50 && enemy.y === player.y){
            alert("You have been devoured by the evil bugs of " + kingdom[count]);
            count=0;
            reset();
            break;
        }
    }
}

function checkWinAndRenderStars(){
    if (count === 0){
            return;
        }
    for (var i = 0; i < count; i++){
        let pos = i % 5;
        ctx.drawImage(Resources.get(`images/${thrones[pos]}.png`), 101 * pos, -10);
    } 
}