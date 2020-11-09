class Zombies {

    ctx;

    zombies = Array();

    constructor(ctx) {
        this.ctx = ctx;
    }

    GenerateZombie() {

        this.zombies[this.zombies.length] = new Zombie();

    }

    CheckZombieHits(playerAttack, playerDirection, playerAttackCount, playerLocationX, playerLocationY) {

        if (playerAttackCount == 7) {
            switch (playerAttack) {
                case 0:
                    for (var i = 0; i < this.zombies.length; i++) {
                        if (playerDirection == "left") {
                            if (this.zombies[i].zombieLocationX + 280 > playerLocationX &&
                                this.zombies[i].zombieLocationX - 0 < playerLocationX &&
                                this.zombies[i].zombieLocationY + 50 > playerLocationY &&
                                this.zombies[i].zombieLocationY - 50 < playerLocationY) {
                                this.zombies[i].health--;
                            }
                        }
                        else {
                            if (this.zombies[i].zombieLocationX - 200 < playerLocationX &&
                                this.zombies[i].zombieLocationX + 50 > playerLocationX &&
                                this.zombies[i].zombieLocationY + 50 > playerLocationY &&
                                this.zombies[i].zombieLocationY - 50 < playerLocationY) {
                                this.zombies[i].health--;
                            }
                        }
                    }
                    break;
            }
        }
    }

    MoveZombies() {

        var scoreChange = 0;
        var crystalDamage = 0

        for (var i = 0; i < this.zombies.length; i++) {
            if (this.zombies[i].health != 0) {
                crystalDamage += this.zombies[i].Move();
            }
            else {
                this.zombies.splice(i, 1);
                i--;
                scoreChange++;
            }
        }

        return {scoreChange, crystalDamage};
    }

    ResetZombies() {
        this.zombies = Array();
    }

    RenderAllZombies() {

        for (var i = 0; i < this.zombies.length; i++) {
            this.zombies[i].Render();
        }

    }

}

class Zombie extends GameObject {

    zombieImageRight = new Image();
    zombieImageLeft = new Image();
    lastzombieMovement = this.zombieImageRight;

    zombieAttackImage = new Image();

    zombieLocationX = 0;
    zombieLocationY = 0;

    zombieMovementSpeed = 4;

    health = 4;

    constructor(ctx) {

        super(ctx);

        this.zombieImageRight.src = "sprites/zombieright.png";
        this.zombieImageLeft.src = "sprites/zombieleft.png";

        this.zombieLocationX = (Math.floor(Math.random() * 2) * 2000) - 80;
        this.zombieLocationY = Math.floor(Math.random() * 800);
    }

    Move() {
        var crystalDamage = 0;

        if (this.zombieLocationX > 1020) { //crystalLocationX
            this.zombieLocationX -= this.zombieMovementSpeed;
            this.lastzombieMovement = this.zombieImageLeft;
        }
        else if (this.zombieLocationX < 880) {
            this.zombieLocationX += this.zombieMovementSpeed;
            this.lastzombieMovement = this.zombieImageRight;
        }
        else {
            crystalDamage += 0.5;
        }

        if (Math.floor(Math.random() * 4) == 0) {
            if (this.zombieLocationY > 400) { //crystalLocationX
                this.zombieLocationY -= this.zombieMovementSpeed;
            }
            else if (this.zombieLocationY < 350) {
                this.zombieLocationY += this.zombieMovementSpeed;
            }
            else {
                crystalDamage += 0.5;
            }
        }

        return Math.floor(crystalDamage);
    }

    Render() {

        if (this.zombieMovementX > 0) {
            this.lastzombieMovement = this.zombieImageRight;
        }
        else if (this.zombieMovementX < 0) {
            this.lastzombieMovement = this.zombieImageLeft;
        }
        ctx.drawImage(this.lastzombieMovement, this.zombieLocationX, this.zombieLocationY, 80, 80);
        
        ctx.fillText(this.health + "/4", this.zombieLocationX + 40, this.zombieLocationY + 110);
    }
}
