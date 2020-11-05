var canvas = document.getElementById("playarea");
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight - 10;

var player = document.getElementById("player");

var playerImage = new Image();
playerImage.src = "sprites/player.png"

var playerLocationX = 800;
var playerLocationY = 400;

var playerMovementX = 0;
var playerMovementY = 0;

var playerMovementSpeed = 13;

function Body_KeyDown(args) {

    switch (args.which) {
        case 119: // W
        case 87:
            playerMovementY = -1;
            break;
        case 97:
        case 65: // A
            playerMovementX = -1;
            break;
        case 115:
        case 83: // S
            playerMovementY = 1;
            break;
        case 100:
        case 68: // D
            playerMovementX = 1
            break;
        default:
            console.log(args.which);
            break;
    }

}


function Body_KeyUp(args) {
    switch (args.which) {
        case 119: // W
        case 87:
            playerMovementY = 0;
            break;
        case 97:
        case 65: // A
            playerMovementX = 0;
            break;
        case 115:
        case 83: // S
            playerMovementY = 0;
            break;
        case 100:
        case 68: // D
            playerMovementX = 0;
            break;
        default:
            console.log(args.which);
            break;
    }
}


function Render() {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (playerLocationY < 10 && playerMovementY == -1) {
        playerMovementY = 0;
    }

    if (playerLocationY > 810 && playerMovementY == 1) {
        playerMovementY = 0;
    }

    if (playerLocationX < 10 && playerMovementX == -1) {
        playerMovementX = 0;
    }

    if (playerLocationX > 1820 && playerMovementX == 1) {
        playerMovementX = 0;
    }

    playerLocationX = (playerMovementX * playerMovementSpeed) + playerLocationX;
    playerLocationY = (playerMovementY * playerMovementSpeed) + playerLocationY;

    ctx.drawImage(playerImage, playerLocationX, playerLocationY, 80, 80);

    setTimeout(() => {
        Render();
    }, 33);
}

Render();