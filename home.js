var canvas = document.getElementById("playarea");
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight - 10;

var player = new Player(ctx);

function Body_KeyDown(args) {
    player.HandleKeyDown(args);
}


function Body_KeyUp(args) {
    player.HandleKeyUp(args);
}


function Render() {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    player.Render();

    setTimeout(() => {
        Render();
    }, 33);
}

Render();