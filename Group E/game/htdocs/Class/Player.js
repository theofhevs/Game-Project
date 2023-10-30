 // Creation du Personnage 
 class Player {
    // definit sa position ainsi que sa grandeur
    constructor(image, spriteX, spriteY, gameFrame, staggerFrames) {
        this.spriteX = spriteX
        this.spriteY = spriteY
        this.gameFrame = gameFrame
        this.staggerFrames = staggerFrames

        this.speed = 4
        this.position = {
            x: 125,
            y: 100
        }

        // set la gravité du personnage 
        this.velocity = {
            x: 0,
            y: 0
        }

        this.image = image

        //taille du player
        this.width = 96
        this.height = 96
    }
    // création du personnage dans le Canvas
    draw(c) {
        //for sprite animation
        if (this.gameFrame % this.staggerFrames === 0) {
            if (this.spriteX < 3) this.spriteX++;
            else this.spriteX = 0;
        }
        this.gameFrame++;

        c.drawImage(this.image, this.spriteX * 256, this.spriteY * 256, 256, 250, this.position.x, this.position.y, this.width, this.height)
    
    }
    // gère la position du joueur avec la velocité choisi
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