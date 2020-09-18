// Enemies our player must avoid
let Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.sprite = 'images/enemy-bug.png';
};

let character = {},
    myHero = {};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    let w = 60;

    this.x += Math.floor(this.speed * dt);

    if (this.x > 520) { // if the bug is off canvas
      this.x = 0;     // set the bug position to -40
      this.speed = 106 + Math.floor(Math.random() * 200); // random speed
    }

    if ((this.y + w > player.y &&
         this.y < player.y + w &&
         this.x + w > player.x &&
         this.x < player.x + w)) {

           player.x = 200;
           player.y= 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let render_ene = () => { // this renders the enemies
  let Ypos = [60,140,220]; // the yposition for each ememy
  let l = Ypos.length;
  for (let i = 0; i < l; i++) {
    allEnemies.push(new Enemy(60,Ypos[i],200));
  }
};

function SuperClass(img, x, y) {
  this.img = img;
  this.x = x;
  this.y = y;
}

SuperClass.prototype = {
  constructor: SuperClass,
  
  render: function () {
    ctx.drawImage(Resources.get(this.img), this.x, this.y);
  }
};

function RandomPlayer(val, x, y) {
  return new SuperClass(val, x, y);
}

RandomPlayer.prototype = {
  constructor: RandomPlayer,
};


function StarObj(val, x, y) {
  return new SuperClass(val, x, y);
}


StarObj.prototype = {
  constructor: StarObj,
};

let star = StarObj('images/Star.png'),
  random_player = RandomPlayer('images/Selector.png',200,400);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let User = function(p,x,y) {
  this.p = p;
  this.x = x;
  this.y = y; // 400 - step= 80 .. if
  // each time the player move up  decrement step from 400 on the y axis
  // if the number is 0 then set back player to its default
};

User.prototype = {

  update: function () {
     (this.x);
     (this.y);
  },

  render: function () {
    ctx.drawImage(Resources.get(this.p), this.x, this.y);
  },

  handleInput: function (e) {
    let ud = 60; // up down
    let lr = 40; // left right
    let lub = 20; // left up border

    if (e === 'left' && this.x > lub) {
      // this.x -= lr;
      this.update(this.x -= lr);
      
    }// handler input for keypress
    if (e === 'right' && this.x < 380) {
      // this.x += lr;
      this.update(this.x = this.x += lr);
    }// handler input for keypress
    if (e === 'up' && this.y >= 0) {
      // this.y -= ud;
      this.update(this.y -= ud);
    }// handler input for keypress
    if (e === 'down' && this.y < 400) {
      // this.y += ud;
      this.update(this.y += ud);
    }// handler input for keypress

    if (this.y === -20) {
      // the code below set back the use to its initial position 
      star.x = this.x;
      star.y = this.y;
      setTimeout(() => { player.x = 200; player.y = 400; }, 500);
    }
  }
};


 


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

(() => {
  // let ran = Math.floor(Math.random() * 60);
  let Ypos = [60, 140, 220,];

  // renders the each player on the canvas and position the respecfully 
  Ypos.forEach( ene => allEnemies.push( new Enemy (60,ene,200)));

})();

let player = new User(this.p, 200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
