class Item {
    // item position, size and image
    constructor(x, y, image) {
        this.position = { x, y };
        this.width = 50;
        this.height = 50;
        this.image = image
    }

    // item creation in the canvas
    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

export default Item