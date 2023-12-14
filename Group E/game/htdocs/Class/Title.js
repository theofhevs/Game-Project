class Title {
  // define title size, position and image
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width / 2.5;
    this.height = image.height / 2.5;
  }
  
  // title creation in the canvas
  draw(c) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export default Title;
