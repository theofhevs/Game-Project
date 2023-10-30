class MovingEnemy {
    constructor(x, y, movementType, min, max,velocityX,velocityY) {
        this.position = { x, y };
        this.width = 40;
        this.height = 80;
        this.color = 'blue'; // Utilisation de la couleur définie
        this.velocity = { x: velocityX, y: velocityY };
        this.movementType = movementType;
        this.min = min;
        this.max = max;
    }

    draw(c) {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    updatePosition() {
        if (this.movementType === 'vertical') {
            //this.velocity.y = 1; // Déplacement vertical vers le bas

            // Mettez à jour la position verticale en fonction de la direction
            this.position.y += this.velocity.y;

            // Vérifiez si l'ennemi atteint les limites de sa plateforme
            if (this.position.y < this.min) {
                this.velocity.y = 1; 
            } else if (this.position.y  > this.max) {
                this.velocity.y = -1; 
            }
        } 

        else if (this.movementType === 'horizontal'){
            // Mettez à jour la position verticale en fonction de la direction
            this.position.x += this.velocity.x;

            // Vérifiez si l'ennemi atteint les limites de sa plateforme
            if (this.position.x < this.min) {
                this.velocity.x = 1; 
            } else if (this.position.x > this.max-this.width) {
                this.velocity.x = -1; 
            }

        }
    }
}

export default MovingEnemy;