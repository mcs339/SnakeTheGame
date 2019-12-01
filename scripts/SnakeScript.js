
let canvas = document.getElementById("main-form");
let ctx = canvas.getContext("2d");

const windowWidth = 576;
const windowHeight = 640;


const smallWindowX =0;
const smallWindowY = 64;
const smallWindowWidth = 576;
const smallWindowHeight = 576;

const gameWindowX =32;
const gameWindowY = 96;
const gameWindowWidth = 512;
const gameWindowHeight = 512;

const box = 32;

//***********************************************************//

const foodImg = new Image();
foodImg.src = "images/food.png";


let food = {
    x: Math.round(Math.random() * 15 + 1) * box,
    y: Math.round(Math.random() * 15 + 3) * box
}


//***********************************************************//

document.addEventListener("keydown", direction);

let dir;

function direction(e) {
    if(e.keyCode == 38 && dir!="down"){
        dir = "up";
    }
    else if(e.keyCode == 39 && dir!="left"){
        dir = "right";
    }
    else if(e.keyCode == 40 && dir!="up"){
        dir = "down";
    }
    else if(e.keyCode == 37 && dir!="right"){
        dir = "left";
    }
}
//***********************************************************//

snake = [];
snake[0]={
    x: 8*box,
    y: 11*box
}


//***********************************************************//


function drawBackground() {
    ctx.fillStyle = "#426928";
    ctx.fillRect(0, 0, windowWidth, windowHeight);

    ctx.fillStyle = "#4d7f30";
    ctx.fillRect(smallWindowX, smallWindowY, smallWindowWidth, smallWindowHeight);

    ctx.fillStyle = "#98ca3e";
    ctx.fillRect(gameWindowX, gameWindowY, gameWindowWidth, gameWindowHeight);

    for (let i=96; i<608; i+=64){           // По y
        for (let j=32; j<544; j+=64){       // По x
            ctx.fillStyle = "#a4d246";
            ctx.fillRect(j, i, 32, 32);
        }
    }

    for (let i=128; i<608; i+=64) {             // По y
        for (let j = 64; j < 544; j += 64) {    // По x
            ctx.fillStyle = "#a4d246";
            ctx.fillRect(j, i, 32, 32);
        }
    }
}

//***********************************************************//

function drawGame(){
    drawBackground();
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.fillStyle = "#007303";

    for(let i=0; i<snake.length; i++){
        if(i==0) {
            ctx.fillStyle = "red";
            ctx.fillRect(snake[0].x, snake[0].y, box, box);
        }
        else {
            ctx.fillStyle = "#007303";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

    }


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.round(Math.random() * 15 + 1) * box,
            y: Math.round(Math.random() * 15 + 3) * box
        }
    }
    else {
        snake.pop();
    }






    if(dir=="up"){
        snakeY-=box;
    }
    if(dir=="right"){
        snakeX+=box;
    }
    if(dir=="down"){
        snakeY+=box;
    }
    if(dir=="left"){
        snakeX-=box;
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    if(newHead.x>16*box || newHead.x<1*box || newHead.y> 18*box || newHead.y<3*box){
        clearInterval(game);
    }

    for(let i=0; i<snake.length; i++){
        if (newHead.x == snake[i].x && newHead.y == snake[i].y)
            clearInterval(game);
    }

    snake.unshift(newHead);
}


let game = setInterval(drawGame, 100);