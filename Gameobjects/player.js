class Player extends GameObject {

    playerImageRight = new Image();
    playerImageLeft = new Image();
    lastPlayerMovement = this.playerImageRight;
    playerDirection = "right";

    playerAttackImage = new Image();

    playerLocationX = 800;
    playerLocationY = 400;

    playerMovementX = 0;
    playerMovementY = 0;

    playerMovementSpeed = 17;

    playerAttack = 0;
    playerAttackCooldown = 0;
    
    playerRepair = 0;
    playerRepairCooldown = 0;


    constructor(ctx) {
        super(ctx);

        this.playerImageRight.src = "sprites/wizardright.png";
        this.playerImageLeft.src = "sprites/wizardleft.png";
        this.playerAttackImage.src = "sprites/attack.png";
    }

    HandleKeyDown(key) {

        switch (key.which) {
            case 119: // W
            case 87:
                this.playerMovementY = -1;
                break;
            case 97:
            case 65: // A
                this.playerMovementX = -1;
                break;
            case 115:
            case 83: // S
                this.playerMovementY = 1;
                break;
            case 100:
            case 68: // D
                this.playerMovementX = 1
                break;
            case 32: // SPACE
                this.playerAttack = 1;
                break;
            case 82: // R
                this.playerRepair = 1;
                break;
            default:
                console.log(key.which);
                break;
        }

    }

    HandleKeyUp(key) {
        switch (key.which) {
            case 119: // W
            case 87:
                this.playerMovementY = 0;
                break;
            case 97:
            case 65: // A
                this.playerMovementX = 0;
                break;
            case 115:
            case 83: // S
                this.playerMovementY = 0;
                break;
            case 100:
            case 68: // D
                this.playerMovementX = 0;
                break;
            case 32: // SPACE
                this.playerAttack = 0;
                break;
            case 82: // R
                this.playerRepair = 0;
                break;
            default:
                console.log(key.which);
                break;
        }
    }

    Render() {
        if (this.playerLocationY < 10 && this.playerMovementY == -1) {
            this.playerMovementY = 0;
        }

        if (this.playerLocationY > 810 && this.playerMovementY == 1) {
            this.playerMovementY = 0;
        }

        if (this.playerLocationX < 10 && this.playerMovementX == -1) {
            this.playerMovementX = 0;
        }

        if (this.playerLocationX > 1820 && this.playerMovementX == 1) {
            this.playerMovementX = 0;
        }

        this.playerLocationX = (this.playerMovementX * this.playerMovementSpeed) + this.playerLocationX;
        this.playerLocationY = (this.playerMovementY * this.playerMovementSpeed) + this.playerLocationY;

        if (this.playerMovementX > 0) {
            this.lastPlayerMovement = this.playerImageRight;
            this.playerDirection = "right";
        }
        else if (this.playerMovementX < 0) {
            this.lastPlayerMovement = this.playerImageLeft;
            this.playerDirection = "left";
        }
        ctx.drawImage(this.lastPlayerMovement, this.playerLocationX, this.playerLocationY, 80, 80);

        if (this.playerAttack == 1) {

            if (this.playerAttackCooldown <= 0) {
                this.playerAttackCooldown = 8;
            }
            if (this.playerAttackCooldown > 4) {
                if (this.lastPlayerMovement == this.playerImageRight) {
                    ctx.drawImage(this.playerAttackImage, this.playerLocationX + 70, this.playerLocationY, 180, 80);
                }
                else if (this.lastPlayerMovement == this.playerImageLeft) {
                    ctx.drawImage(this.playerAttackImage, this.playerLocationX - 180, this.playerLocationY, 180, 80);
                }
            }
            
            
        }

        if (this.playerAttackCooldown > 0) {
            this.playerAttackCooldown--;
        }

    }
}
