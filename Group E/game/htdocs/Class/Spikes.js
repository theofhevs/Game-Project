class Spikes {
    constructor(x, y, image) {
        this.position = { x, y };
        this.width = 50;
        this.height = 50;
        this.image = image
    }

    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

export default Spikes