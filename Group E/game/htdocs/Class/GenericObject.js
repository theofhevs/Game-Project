    // set the background position, size and image
    class GenericObject {
        // define the position of the background
        constructor({ x, y, image }) {
            this.position = {
                x,
                y
            }
            this.image = image
            this.width = image.width
            this.height = image.height


        }
        // background creation in the canvas
        draw(c) {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        }

    }
    export default GenericObject