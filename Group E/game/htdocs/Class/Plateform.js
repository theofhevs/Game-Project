class Plateform {
    // definit sa position ainsi que sa grandeur
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height

    }
    // création de la plateforme dans le Canvas
    draw(c) {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

}

export default Plateform
