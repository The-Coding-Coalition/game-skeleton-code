/////////////////////////////////////////////////////////////////////////////////////////
/*
    Don't edit this top section unless you're very confident in what you're doing!
*/

const canvas = document.getElementById("game"); // replace "game" with the ID name of your canvas in quotes if the ID is different
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", getKeydown);
document.addEventListener("keyup", getKeyup);

window.onload = function() {
    init();
    game();
};

setInterval(game, 10);
/////////////////////////////////////////////////////////////////////////////////////////

/*
    Keep in mind that the skeleton code is meant for a 1600 x 700 pixel canvas,
    the values below may not be drawn properly on different sized canvases.
*/

let player = {
    // Change the values below as needed
    x: 100,
    y: 100,
    length: 36,
    ////////////////////////////////////

    // Don't change the values below unless you're confident in what you're doing
    left: false,
    right: false,
    up: false,
    down: false
    /////////////////////////////////////////////////////////////////////////////
};

let terrain = [ // Add terrain here
    {x: 600, y: 250, width: 400, height: 200} // Sample terrain
]

let enemies = [ // Add enemies here
    {x: 1300, y: 575, radius: 30} // Sample enemy
]

let speed = 3; // Change value of speed as needed
let dx;
let dy;

function init() { // Loaded once when the page is loaded
    ctx.strokeStyle = "black";
    ctx.font = "24px sans-serif";
}

function game() { // Runs constantly (100 times per second)
    draw();
    collisionDetection();
    hitDetection();
    playerMovement();
    enemyMovement();
}

function draw() { // Draws everything on the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    for (let i = 0; i < enemies.length; i++) {
        ctx.beginPath();
        ctx.arc(enemies[i].x, enemies[i].y, enemies[i].radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.length, player.length);
    ctx.strokeRect(player.x, player.y, player.length, player.length);

    ctx.fillStyle = "black";
    for (let i = 0; i < terrain.length; i++) {
        ctx.fillRect(terrain[i].x, terrain[i].y, terrain[i].width, terrain[i].height);
        ctx.strokeRect(terrain[i].x, terrain[i].y, terrain[i].width, terrain[i].height);
    }
}

function playerMovement() { // Player movement
    if (player.left) {
        dx = -1 * speed;
    }
    else if (player.right) {
        dx = speed;
    }
    else {
        dx = 0;
    }

    if (player.up) {
        dy = -1 * speed;
    }
    else if (player.down) {
        dy = speed;
    }
    else {
        dy = 0;
    }

    player.x += dx;
    player.y += dy;
}

function enemyMovement() { // Enemy movement
    /*
        Feel free to code your own enemy enemy movement!
    */
}

function collisionDetection() {
    // Checks to see if player has collided with a wall
    for (let i = 0; i < terrain.length; i++) {
        if (player.x < terrain[i].x + terrain[i].width && player.x > terrain[i].x && player.y + player.length - (speed * 3) > terrain[i].y && player.y + (speed * 3) < terrain[i].y + terrain[i].height) {
            player.x = terrain[i].x + terrain[i].width;
        }
        else if (player.x + player.length > terrain[i].x && player.x + player.length < terrain[i].x + terrain[i].width && player.y + player.length - (speed * 3) > terrain[i].y && player.y + (speed * 3) < terrain[i].y + terrain[i].height) {
            player.x = terrain[i].x - player.length;
        }
        else if (player.y < terrain[i].y + terrain[i].height && player.y > terrain[i].y && player.x + player.length - (speed * 3) > terrain[i].x && player.x + (speed * 3) < terrain[i].x + terrain[i].width) {
            player.y = terrain[i].y + terrain[i].height;
        }
        else if (player.y + player.length > terrain[i].y && player.y + player.length < terrain[i].y + terrain[i].height && player.x + player.length - (speed * 3) > terrain[i].x && player.x + (speed * 3) < terrain[i].x + terrain[i].width) {
            player.y = terrain[i].y - player.length;
        }
    }

    // Checks to see if player has hit edge of canvas
    if (player.x < 0) {
        player.x = 0;
    }
    else if (player.x + player.length > canvas.width) {
        player.x = canvas.width - player.length;
    }

    if (player.y < 0) {
        player.y = 0;
    }
    else if (player.y + player.length > canvas.height) {
        player.y = canvas.height - player.length;
    }
}

function hitDetection() { // Checks to see if player has hit an enemy
    for (let i = 0; i < enemies.length; i++) {
        if (Math.sqrt(((enemies[i].x - (player.x + (player.length / 2))) ** 2) + ((enemies[i].y - (player.y + (player.length / 2))) ** 2)) <= enemies[i].radius + (player.length / 2)) {
            ctx.fillText("HIT", player.x, player.y - player.length); // Replace this with whatever you want to happen to the player after getting hit
        }
    }
}

function getKeydown(event) { // Checks to see what key the user is holding down
    if (event.keyCode == 37) {
        player.left = true;
        player.right = false;
    }
    if (event.keyCode == 38) {
        player.up = true;
        player.down = false;
    }
    else if (event.keyCode == 39) {
        player.right = true;
        player.left = false;
    }
    else if (event.keyCode == 40) {
        player.down = true;
        player.up = false;
    }
    if (event.keyCode == 65) {
        player.left = true;
        player.right = false;
    }
    else if (event.keyCode == 87) {
        player.up = true;
        player.down = false;
    }
    else if (event.keyCode == 68) {
        player.right = true;
        player.left = false;
    }
    else if (event.keyCode == 83) {
        player.down = true;
        player.up = false;
    }
}

function getKeyup(event2) { // Checks to see when the user releases a key
    if (event2.keyCode == 37) {
        player.left = false;
    }
    if (event2.keyCode == 38) {
        player.up = false;
    }
    else if (event2.keyCode == 39) {
        player.right = false;
    }
    else if (event2.keyCode == 40) {
        player.down = false;
    }
    if (event.keyCode == 65) {
        player.left = false;
    }
    else if (event.keyCode == 87) {
        player.up = false;
    }
    else if (event.keyCode == 68) {
        player.right = false;
    }
    else if (event.keyCode == 83) {
        player.down = false;
    }
}
