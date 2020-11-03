var canvas = document.getElementById("playarea");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight - 10;

var player = document.getElementById("player");

var playerLocationX = window.innerWidth / 2;
var playerLocationY = window.innerHeight / 2;

var MovementSpeed = 13;

function Body_Clicked(args) {

    

    ctx.beginPath();
    ctx.moveTo(playerLocationX + 15, playerLocationY + 10);
    ctx.lineTo((args.clientX - 20) + Math.floor(Math.random() * 21), (args.clientY - 20) + Math.floor(Math.random() * 21));
    ctx.strokeStyle = "#e67300";
    ctx.lineWidth = 4;
    ctx.stroke();

    setTimeout(function () {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }, 50);


}

function Body_KeyPressed(args) {

    switch (args.which) {
        case 119: // W
        case 87:
            if (playerLocationY > 20) {
                playerLocationY -= MovementSpeed;
                UpdatePlayerLocation();
                console.log("Player MoveUp");
            }
            break;
        case 97:
        case 65: // A
            if (playerLocationX > 20) {
                playerLocationX -= MovementSpeed;
                UpdatePlayerLocation();
                console.log("Player MoveLeft");
            }

            break;
        case 115:
        case 83: // S
            if (playerLocationY <= (window.innerHeight - 70)) {
                playerLocationY += MovementSpeed;
                UpdatePlayerLocation();
                console.log("Player MoveDown");
            }
            break;
        case 100:
        case 68: // D
            if (playerLocationX <= (window.innerWidth - 70)) {
                playerLocationX += MovementSpeed;
                UpdatePlayerLocation();
                console.log("Player MoveRight");
            }
            break;
        case 32: //space
            // SHOOT
            break;
        default:
            alert(args.which);
            break;
    }

}

function UpdatePlayerLocation() {

    player.style.top = playerLocationY + "px";
    player.style.left = playerLocationX + "px";

}

UpdatePlayerLocation();