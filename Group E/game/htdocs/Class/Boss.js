class Boss {
    constructor(x, y, min, max, speed, image, spriteX) {
        this.position = { x, y };
        this.width = 135;
        this.height = 135;
        this.velocity = { x: 1, y: 0 };
        this.min = min;
        this.max = max;
        this.speed = speed;
        this.image = image;
        this.spriteX = spriteX;
        this.gameFrame = 0;
        this.staggerFrames = 20;
    }

    draw(c) {
        if (this.gameFrame % this.staggerFrames === 0) {
            if (this.spriteX < 3) this.spriteX++;
            else this.spriteX = 0;
        }
        this.gameFrame++;
        c.drawImage(this.image, this.spriteX * 256,0,256,256, this.position.x, this.position.y, this.width, this.height)
    }

    updateVertical() {

        // Mettez à jour la position verticale en fonction de la direction
        this.position.x += this.velocity.x * this.speed;

        // Vérifiez si l'ennemi atteint les limites de sa plateforme
        if (this.position.x < this.min)
            this.velocity.x = 1;
        else if (this.position.x + this.width > this.max)
            this.velocity.x = -1;
    }

    randomPosition() {
        let random = Math.floor(Math.random() * (11 - 5)) + 5;
        return random
    }

    randomMax() {
        let randomMax = Math.floor(Math.random() * (1025 - 440) + 440);

        return randomMax
    }


}

export default Boss;