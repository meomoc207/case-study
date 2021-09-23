//to be honest i forgot almost all about canvas, i'm just searching everything online at this point

const canvas = document.getElementById('snakeboard');
const ctx = canvas.getContext('2d');

class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


let tileCount = 20; //basically divides the canvas into parts, like a hitbox or something
let tileSize = canvas.width / tileCount - 2; //the size of the parts, works WITH the tilecount.
let headX = 10;  //snake's x value.
let headY = 10;  //snake's y value.

let appleX = 5; //apple's x value.
let appleY = 5; //apple's y value

let xVelocity = 0;   //the name explains itself.
let yVelocity = 0;   //the name explains itself.

const snakeParts = [];  //snake parts
let tail_length = 2;    //the length of the snake parts

let score = 0; //score (why am i supposed to explain this)

let sound_eat = new Audio('gulp.mp3');
//sets up the game
let speed = 7;

function drawgame() {
    changeSnakePos();
    let result = isGameOver(); //the game over function.
    if(result) {
        return; //if the "result" is true, all the remaining functions will stop.
    }
    clearscreen();
    drawApple();
    drawSnake();
    checkAppleCollision();
    drawScore();
    setTimeout(drawgame, 1000/ speed);
}

function isGameOver() {
    if(headX < 0) {
        window.location.replace('yousuck.html');
    }
    else if(headX === tileCount) {
        window.location.replace('yousuck.html');
    }
    else if(headY < 0) {
        window.location.replace('yousuck.html');
    }
    else if (headY === tileCount) {
        window.location.replace('yousuck.html');
    }
}

//displays the score
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = 'monospace';
    ctx.fillText('Score: ' + score, canvas.width - 50, 10);
}

//clears the screen, makes it black.
function clearscreen() {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//changes the snake position AKA makes it move.
function changeSnakePos() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

//a snake has been born
function drawSnake() {

    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    
    snakeParts.push(new snakePart(headX, headY));
        if(snakeParts.length > tail_length) {
            snakeParts.shift(); //prevents the snake from becoming *too* long
        }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

//draws an "apple"
function drawApple() {
    ctx.fillStyle = 'white'; //red sucks but i already named all the varibles "apple" and i'm too lazy to change them so
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if(appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleX = Math.floor(Math.random() * tileCount);
        tail_length++; //if the snakes eats an "apple", it gets longer
        score++;
        sound_eat.play();
        speed*20;
    }
}

//thanks StackOverflow.
document.body.addEventListener('keydown', keyDown)

//controls, i had to google them up.
function keyDown(event) {
    //up
    if(event.keyCode == 38) {
        if(yVelocity == 1) 
            return; // if you're up, you're not allowed to go down.

        yVelocity = -1; //changes the VELOCITY, not the position.
        xVelocity = 0;   //it moves on the y axis, not x.
    }

    //down
    if(event.keyCode == 40) {
        if(yVelocity == -1) 
        return; // if you're down, you're not allowed to go up.

        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37) {
        if(xVelocity == 1)
            return; //if you're left, you're not allowed to go right.
        yVelocity = 0;
        xVelocity = -1;
    }

    //right
    if(event.keyCode == 39) {
        if(xVelocity == -1) 
            return; // if you're right, you're not allowed to go left.
        yVelocity = 0;
        xVelocity = 1;
    }
    
}
    

drawgame()


/* a moment to thank to our sponsorship:
        -stackoverflow: for 90% of the things i did in this project
        -some random youtube guy named adam for the tutorial
        -my idiocity for deciding to do this
 */
