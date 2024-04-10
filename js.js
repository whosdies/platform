var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var gametime = 0;

var player = {x:160, y:340, height:80, width:50, xspeed:0, yspeed:0}


function block(x, y, width, height, xspeed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xspeed = xspeed;
}
function drawenemy(block){
    pop = new Image();
    pop.src = "rr.png";
    context.drawImage(pop, block.x, block.y, block.width, block.height);
}

function drawbonus(block){
    pop = new Image();
    pop.src = "rrr.png";
    context.drawImage(pop, block.x, block.y, block.width, block.height);
}


var enemy = new block(canvas.width, canvas.height-150, 50, 100, -5);

var bonus = new block(canvas.width, canvas.height-150, 30, 50, -3);


function platform(x,y, width, height, xspeed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xspeed = xspeed;
}

function drawplatform(block){
    img = new Image();
    img.src = "1711880070092_20.png";
    context.drawImage(img, block.x, block.y, block.width, block.height)
}

var platform1 = new platform(0, canvas.height-50, canvas.width, 50, -3);
var platform2 = new platform(canvas.width, canvas.height-50, canvas.width, 50, -3);

function updategame(){
    player.x += player.xspeed;
    player.y += player.yspeed;

    if (player.y >= canvas.height - player.height - 50){
        player.yspeed = 0;
        player.xspeed = 0;
    }

    enemy.x += enemy.xspeed;

    bonus.x += bonus.xspeed;

    if (enemy.x < 0-enemy.width){
        enemy.x = canvas.width;
        enemy.width = Math.floor(Math.random() * 100) + 50;
        enemy.height = Math.floor(Math.random() * 200) + 50;
        enemy.y = canvas.height - 50 - enemy.height;
        enemy.xspeed =(Math.floor(Math.random() * 5) + 3) * -1;
    }

    if(bonus.x < 0-bonus.width){
        bonus.x = canvas.width;
        bonus.width = Math.floor(Math.random() * 50) + 20;
        bonus.height = Math.floor(Math.random() * 80) + 40;
        bonus.y = canvas.height - 50 - enemy.height;
        bonus.xspeed =(Math.floor(Math.random() * 3) + 2) * -1;
    }

    platform1.x += platform1.xspeed;
    platform2.x += platform2.xspeed;

    if(platform1.x < 0-platform1.width){
        platform1.x =platform2.width -10;
    }
    if(platform2.x < 0-platform2.width){
        platform2.x =platform1.width- 10;
    }

    gametime ++;
}
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawenemy(enemy);
    drawbonus(bonus);

    pic = new Image();
    pic.src = "1711703113090_Man_walking.png";
    context.drawImage(pic, player.x, player.y, player.width, player.height);
    ground = new Image();
    ground.src = "1711880070092_20.png";
    
    context.drawImage(ground, 0, canvas.height-50, canvas.width, 50);

    drawplatform(platform1);
    drawplatform(platform2);

    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("пройдено:" + gametime, 10, 30);
}

function checkcollision(){
    if(player.x + player.width > enemy.x && player.x < enemy.x + enemy.width && player.y + player.height > enemy.y && player.y < enemy.y+enemy.height){
        modal.style.display = "block";
        document.getElementById("message").innerHTML = "проигрыш <br/> пройдено "+gametime+ " пути";
        game.stop();
    }

    if(player.x + player.width > bonus.x && player.x < bonus.x + bonus.width && player.y + player.height > bonus.y && player.y < bonus.y+bonus.height){
        modal.style.display = "block";
        document.getElementById("message").innerHTML = "проигрыш <br/> пройдено "+gametime+ " пути";
        game.stop();
    }
    
}
var modal = document.getElementById("modal");

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
        location.reload();
    }
}

function onkeyPress(event){
    const key = event.key.toLowerCase();
    if (key === "a"){
        player.xspeed = -5;
    }
    if (key === "d"){
        player.xspeed = 5;
    }
    if (key === " "){
        player.yspeed = -8;
    }
}
window.addEventListener("keydown", onkeyPress);
function onkeyRelease(event){
    const key = event.key.toLowerCase();
    if (key === "a" || key === "d"){
        player.xspeed = 0;
    } 
    if (key === " "){
        player.yspeed = 5;
    }
}
window.addEventListener("keyup", onkeyRelease);
function tick(){
    checkcollision();
    updategame();
    draw();
    game = window.setTimeout("tick()", 1000/60)
    
}

tick();