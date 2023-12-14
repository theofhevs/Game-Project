class Animate {
  canvas;
  c;

  constructor() {
    this.canvas = document.getElementById("canvas");
    this.c = this.canvas.getContext("2d");
  }

  // menu animation function with background, buttons and title
  animateMenu(menuBackground, buttons, titleGame, gameState) {
    this.fillStyle = "white";
    this.c.fillRect(0, 0, canvas.width, canvas.height);

    menuBackground.forEach((menuBackground) => {
      menuBackground.draw(this.c);
    });

    buttons.forEach((button) => {
      for (let i = 0; i < button.belongTo.length; i++) {
        if (button.belongTo[i] === gameState) {
          button.draw(this.c);
        }
      }
    });

    titleGame.forEach((titleGame) => {
      titleGame.draw(this.c);
    });
  }

  // how to play animation function with background and buttons
  animateHowToPlay(BackgroundhowToPlay, buttons, gameState) {
    this.c.fillStyle = "white";
    this.c.fillRect(0, 0, canvas.width, canvas.height);

    BackgroundhowToPlay.forEach((BackgroundhowToPlay) => {
      BackgroundhowToPlay.draw(this.c);
    });

    buttons.forEach((button) => {
      for (let i = 0; i < button.belongTo.length; i++) {
        if (button.belongTo[i] === gameState) {
          button.draw(this.c);
        }
      }
    });
  }

  // highscore animation function with background and buttons
  animateHighscore(Backgroundhighscore, buttons, gameState) {
    this.c.fillStyle = "white";
    this.c.fillRect(0, 0, canvas.width, canvas.height);

    Backgroundhighscore.forEach((Backgroundhighscore) => {
      Backgroundhighscore.draw(this.c);
    });

    buttons.forEach((button) => {
      for (let i = 0; i < button.belongTo.length; i++) {
        if (button.belongTo[i] === gameState) {
          button.draw(this.c);
        }
      }
    });
  }

  // player selection animation function with background and buttons
  animatePlayerSelection(BackgroundPlayerSelection, buttons, gameState) {
    this.c.fillStyle = "white";
    this.c.fillRect(0, 0, canvas.width, canvas.height);

    BackgroundPlayerSelection.forEach((BackgroundPlayerSelection) => {
      BackgroundPlayerSelection.draw(this.c);
    });

    buttons.forEach((button) => {
      for (let i = 0; i < button.belongTo.length; i++) {
        if (button.belongTo[i] === gameState) {
          button.draw(this.c);
        }
      }
    });
  }

}

export default Animate;
