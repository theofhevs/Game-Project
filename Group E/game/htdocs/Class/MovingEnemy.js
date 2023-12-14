class MovingEnemy {
    constructor(x, y, movementType, min, max,velocityX,velocityY, image, spriteX) {
        this.position = { x, y };
        this.width = 80;
        this.height = 80;
        this.velocity = { x: velocityX, y: velocityY };
        this.movementType = movementType;
        this.min = min;
        this.max = max;
        this.image = image;
        this.spriteX = spriteX;
        this.gameFrame = 0;
        this.staggerFrames = 20;
    }

    draw(c) {
        if(this.movementType === 'vertical'){
            if (this.gameFrame % this.staggerFrames === 0) {
                if (this.spriteX < 3) this.spriteX++;
                else this.spriteX = 0;
            }
            this.gameFrame++;
            c.drawImage(this.image, this.spriteX * 256,0,256,256, this.position.x, this.position.y, this.width, this.height)
        }
        else{
            if (this.gameFrame % this.staggerFrames === 0) {
                if (this.spriteX < 7) this.spriteX++;
                else this.spriteX = 0;
            }
            this.gameFrame++;
            c.drawImage(this.image, this.spriteX * 256,0,256,256, this.position.x, this.position.y, this.width, this.height)
        }   
    }

    updatePosition() {
        if (this.movementType === 'vertical') {
            //this.velocity.y = 1; // Déplacement vertical vers le bas

            // update the vertical position based on the direction
            this.position.y += this.velocity.y;

            // check if the enemy reaches the limits of its platform
            if (this.position.y < this.min)
                this.velocity.y = 1; 
            else if (this.position.y  > this.max - this.width)
                this.velocity.y = -1; 
        } 

        else if (this.movementType === 'horizontal'){
            // check the horizontal position based on the direction
            this.position.x += this.velocity.x;

            // check if the enemy reaches the limits of its platform
            if (this.position.x < this.min)
                this.velocity.x = 1; 
            else if (this.position.x > this.max-this.width)
                this.velocity.x = -1; 
        }
    }
}

export default MovingEnemy;