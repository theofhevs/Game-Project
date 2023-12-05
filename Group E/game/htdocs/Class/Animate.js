class Animate {
  canvas;
  c;

  constructor() {
    this.canvas = document.getElementById("canvas");
    this.c = this.canvas.getContext("2d");
  }

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

  animateHighscore(Backgroundhighscore, buttons, gameState) {
    /* animate_class.animateHowToPlay(
             Backgroundhighscore,
             buttons,
             gameState
           ); */
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
