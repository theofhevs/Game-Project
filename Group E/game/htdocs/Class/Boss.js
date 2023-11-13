
class Boss {
    constructor(x, y, min, max, velocityX, velocityY) {
        this.position = { x, y };
        this.width = 135;
        this.height = 135;
        this.color = 'green'; // Utilisation de la couleur définie
        this.velocity = { x: velocityX, y: velocityY };
        this.min = min;
        this.max = max;
    }

    draw(c) {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    updateVertical() {
        const speed = 10
        // Mettez à jour la position verticale en fonction de la direction
        this.position.x += this.velocity.x * speed;

        // Vérifiez si l'ennemi atteint les limites de sa plateforme
        if (this.position.x < this.min) {
            this.velocity.x = 1;
        } else if (this.position.x > this.max - this.width) {
            this.velocity.x = -1;
        }




    }

    test() {
        this.velocity.x = 0


    }







}

export default Boss;