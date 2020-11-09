class Crystal extends GameObject {

    health = 100;
    gameOver = false;

    crystalImage = new Image();
    crystalLocationX = 880;
    crystalLocationY = 380

    constructor(ctx) {
        super(ctx);
        this.crystalImage.src = "sprites/crystal.png";
    }

    DamageCrystal(damage) {
        this.health -= damage;

        if (this.health <= 0) {
            this.gameOver = true;
        }
    }

    RepairCrystal(playerLocationX, playerLocationY) {

        if (this.crystalLocationX + 250 > playerLocationX &&
            this.crystalLocationX - 50 < playerLocationX &&
            this.crystalLocationY + 150 > playerLocationY &&
            this.crystalLocationY - 50 < playerLocationY) {
            
                this.health += 50;

        }
    }

    ResetCrystal() {
        this.health = 100;
        this.gameOver = false;
    }

    Render() {

        ctx.drawImage(this.crystalImage, 880, 380, 200, 100);

        ctx.fillText(this.health, 980, 520);

    }

}