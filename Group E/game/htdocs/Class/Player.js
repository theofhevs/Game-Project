 class Player {
    // player creation 
    constructor(image, spriteX, spriteY, isAnimated) {
        this.spriteX = spriteX
        this.spriteY = spriteY
        this.isAnimated = isAnimated
        this.gameFrame = 0
        this.staggerFrames = 20

        // set player speed and initial position
        this.speed = 4
        this.position = {
            x: 125,
            y: 100
        }

        // set player velocity
        this.velocity = {
            x: 0,
            y: 0
        }

        // set player image
        this.image = image

        // set player size
        this.width = 96
        this.height = 96
    }
    // création du personnage dans le Canvas
    draw(c) {
        if(this.isAnimated){
            //for sprite animation
            if (this.gameFrame % this.staggerFrames === 0) {
                if (this.spriteX < 3) this.spriteX++;
                else this.spriteX = 0;
            }
            this.gameFrame++;

            c.drawImage(this.image, this.spriteX * 256, this.spriteY * 256, 256, 252, this.position.x, this.position.y, this.width, this.height)
        }
        else
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    
    }
    // handle player position and velocity
    update(c, canvas, gravity) {
        this.draw(c)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // permet de Set la position la plus basse du jeu évité que le player tombe à l'infinie
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

export default Player 