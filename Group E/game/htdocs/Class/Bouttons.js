class Bouttons {
  //définir la position des boutons
  constructor({ x, y, image, belongTo, initMethod }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.belongTo = belongTo;
    this.initMethod = initMethod;
  }

  draw(c) {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  //handleclickmethod
  handleClick(event, gameState) {
    /*let canvas = document.getElementById("canvas");
    console.log("fdgkjfdggjsdfklgfjd");
    console.log(this.position.x, this.position.y, this.width, this.height);
    console.log(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
      // TODO: check if the better way is to use the offset or the client
    );*/

    let isActive = false;
    for (let i = 0; i < this.belongTo.length; i++) {
      if (this.belongTo[i] === gameState) {
        isActive = true;
      }
    }

    //console.log(isActive);

    if (isActive) {
      if (
        event.clientX - canvas.offsetLeft >= this.position.x &&
        event.clientX - canvas.offsetLeft <= this.position.x + this.width &&
        event.clientY - canvas.offsetTop >= this.position.y &&
        event.clientY - canvas.offsetTop <= this.position.y + this.height
      ) {
        console.log("cliked");
        this.initMethod();
      }
    }
  }
}

export default Bouttons;
