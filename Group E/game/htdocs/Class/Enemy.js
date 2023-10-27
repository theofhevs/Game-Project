class Enemy {
    constructor(x, y) {
        this.position = { x, y };
        this.width = 40;
        this.height = 80;
        this.color = 'red'; // Ajout de la couleur rouge
    }

    
    draw(c) {
        c.fillStyle = this.color; // Utilisation de la couleur définie
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

export default Enemy