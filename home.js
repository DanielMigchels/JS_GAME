var canvas = document.getElementById("playarea");
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth - 10;
ctx.canvas.height = window.innerHeight - 10;

ctx.font="30px Arial";
ctx.fillStyle = "black";
ctx.textAlign = "center";

score = 0;

var player = new Player(ctx);
var crystal = new Crystal(ctx);
var zombies = new Zombies(ctx);

function Body_KeyDown(args) {
    player.HandleKeyDown(args);
}


function Body_KeyUp(args) {
    player.HandleKeyUp(args);
}

function SpawnZombie() {

    zombies.GenerateZombie();

    setTimeout(() => {
        SpawnZombie();
    }, 7500 / ((score * 0.25)+1));

}

function GameplayMechanics() {
    
    zombies.CheckZombieHits(0, player.playerDirection, player.playerAttackCooldown, player.playerLocationX, player.playerLocationY);

    moveZombieReturnObject = zombies.MoveZombies();
    score += moveZombieReturnObject["scoreChange"];
    crystal.DamageCrystal(moveZombieReturnObject["crystalDamage"]);

    if (player.playerRepair == 1 && player.playerRepairCooldown <= 0) {
        crystal.RepairCrystal(player.playerLocationX, player.playerLocationY);
        player.playerRepairCooldown = 150;
    }
    else {
        player.playerRepairCooldown--;
    }
}

function Render() {

    GameplayMechanics();

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    crystal.Render();
    zombies.RenderAllZombies();
    player.Render();

    ctx.fillText("Score: " + this.score, 100, 50);

    if (!crystal.gameOver) {
        setTimeout(() => {
            Render();
        }, 33);
    }
    else {
        ctx.font="90px Arial";
        ctx.fillText("Game Over! Score: " + this.score, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
    
}

Render();
SpawnZombie();