class Plateform {
    // define plateform, position and image
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height

    }
    // plateform creation in the canvas
    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

}

export default Plateform
