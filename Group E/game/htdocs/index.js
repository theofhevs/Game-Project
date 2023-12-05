//import les class
import Plateform from "./Class/Plateform.js";
import GenericObject from "./Class/GenericObject.js";
import Player from "./Class/Player.js";
import Spikes from "./Class/Spikes.js";
import MovingEnemy from "./Class/MovingEnemy.js";
import Item from "./Class/Item.js";
import Boss from "./Class/Boss.js";
import Bouttons from "./Class/Bouttons.js";
import Titre from "./Class/Titre.js";
import BackgroundMenu from "./Class/BackgroundMenu.js";
import { addDoc, dumpCollection, showScoreboard } from "../Firebase.js";
import Animate from "./Class/Animate.js";

// ajout des images
const soundURL = "sound/";

let bossMusic = new Audio();
bossMusic.src = soundURL + "bossFight.mp3";
bossMusic.loop = true;

let musicLevel1 = new Audio();
musicLevel1.src = soundURL + "ryanGosling.mp3";
musicLevel1.loop = true;

let musicMenu = new Audio();
musicMenu.src = soundURL + "MenuMusic.mp3";
musicMenu.loop = true;

let musicLevel2 = new Audio();
musicLevel2.src = soundURL + "desertMusic.mp3";
musicLevel2.loop = true;





const imgURL = "img/";
const plateformFont = new Image();
const mainBackGround = new Image();
const tinyPlateformFont = new Image();
const playerFont = new Image();
const spikesImg = new Image();
const spikesBottomImg = new Image();
const spikesLeftImg = new Image();
const spikesRightImg = new Image();
const toscanaBackground = new Image();
const desertBackground = new Image();
const desertPlatform = new Image();
const plateformVenise = new Image();
const plateformVeniseBottom = new Image();
const cityBackground = new Image();
const mozzarellaImg = new Image();
const chefEnemy = new Image();
const burgerEnemy = new Image();
const howToPlay = new Image();
const sauce = new Image();
const startGame = new Image();
const highscore = new Image();
const title = new Image();
const howToPlayBackground = new Image();
const highscoreBackground = new Image();
const backToMenu = new Image();
const backgroundMenu = new Image();
const prosciuttoImg = new Image();
const patePizzaImg = new Image();
const bossBackground = new Image();
const bossPlatform = new Image();
const bossSprite = new Image();
const animate_class = new Animate();
const geolocationIcon = new Image();
geolocationIcon.src = imgURL + "geolocalisation.png";
bossBackground.src = imgURL + "bossBackground.png";
desertPlatform.src = imgURL + "desertPlatform.png";
bossPlatform.src = imgURL + "bossPlatform.png";
sauce.src = imgURL + "tomatoSauce.png";
toscanaBackground.src = imgURL + "toscanaBackground.png";
patePizzaImg.src = imgURL + "dough.png";
prosciuttoImg.src = imgURL + "prosciutto.png";
bossSprite.src = imgURL + "boss.png"
chefEnemy.src = imgURL + "chefSprite.png";
burgerEnemy.src = imgURL + "burgerSprite.png";
mozzarellaImg.src = imgURL + "mozzarella.png";
cityBackground.src = imgURL + "italianCityLarge.png";
desertBackground.src = imgURL + "desertBackgroundLarge.png";
spikesImg.src = imgURL + "spikes.png";
spikesBottomImg.src = imgURL + "spikesBottom.png";
spikesLeftImg.src = imgURL + "spikesLeft.png";
spikesRightImg.src = imgURL + "spikesRight.png";
playerFont.src = imgURL + "sprite.png";
plateformFont.src = imgURL + "platform.png";
mainBackGround.src = imgURL + "BG_large.png";
tinyPlateformFont.src = imgURL + "platform.png";
plateformVenise.src = imgURL + "platformVenise.png";
plateformVeniseBottom.src = imgURL + "platformVeniseBottom.png";
howToPlay.src = imgURL + "HowToPlay.png";
startGame.src = imgURL + "StartGame.png";
highscore.src = imgURL + "Highscore.png";
title.src = imgURL + "title.png";
backgroundMenu.src = imgURL + "mainBackground.png";
howToPlayBackground.src = imgURL + "HowToPlayBackground.png";
highscoreBackground.src = imgURL + "HighscoreBackground.png";
backToMenu.src = imgURL + "backToMenu.png";

// Setup pour link le JS avec HTMLA


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const c = canvas.getContext("2d");
  console.log(c);


  // defini Le canvas avec la taille de la fenetre
  canvas.width = 1024;
  canvas.height = 576;

  let spriteX = 0;
  let spriteY = 0;


  // création overlay
  const overlay = {
    opacity: 0,
  };

  // variables for the game loop
  let fps = 100;
  let now;
  let then = Date.now();
  let interval = 1000 / fps;
  let delta;

  // état du jeu
  const STATE_MENU = "menu";
  const STATE_HOWTOPLAY = "howToPlay";
  const STATE_HIGHSCORE = "highscore";
  const STATE_GAME_ON = "gameOn";
  //..
  let gameState = STATE_MENU;

  // handle clic (x,y du click)
  // for each button
  // if(button.IsInBounds(x,y))
  //-> state = button.stateTo
  //-> buttons = button.nextButtons

  // création de l'objet player
  let player = new Player(playerFont, spriteX, spriteY);

  let currentLevel = 1;

  let formattedTime;

  // items creation
  let item = [];

  const itemIndices = {
    dough: 0,
    sauce: 1,
    mozzarella: 2,
    prosciutto: 3,
  };

  const itemOpacities = {
    [itemIndices.dough]: { 1: 0.3, 2: 2.5, 3: 2.5, 4: 2.5, 5: 2.5 },
    [itemIndices.sauce]: { 1: 0.3, 2: 0.3, 3: 2.5, 4: 2.5, 5: 2.5 },
    [itemIndices.mozzarella]: { 1: 0.3, 2: 0.3, 3: 0.3, 4: 2.5, 5: 2.5 },
    [itemIndices.prosciutto]: { 1: 0.3, 2: 0.3, 3: 0.3, 4: 0.3, 5: 2.5 }
  };

  //création des objet du menu
  let buttons = [];
  let titleGame = [];
  let menuBackground = [];
  let BackgroundhowToPlay = [];
  let boutonBack = [];
  let Backgroundhighscore = [];
  let buttonGeolocation = [];

  // création de l'objet plateform
  let plateforms = [];

  // création de l'objet concernant le BackGround
  let genericObjects = [];

  // création de l'objet enemies
  let spikes = [];

  // création objet Moving Moving Enemy
  let movingEnemies = [];
  let movingEnemiesY = [];

  // création de l'objet BOSS
  let bosses = [];
  // COMPTEUR PERMETTANT DE DEFINIR A QUELLE MOMENT LE BOSS CHANGE DE PHASE
  let maxReachedCounter = 0;
  // BOOLEAN PERMETTANT DE SWITCH ENTRE LES 2 MODS DU BOSS
  let isBossUpdateVerticalAllowed = true;
  // VARIABLE PERMETTANT DE METTRE UNE VIE AU BOSS
  let countHitBoss = 0;
  // DEPLACEMENT RANDOM BOSS
  let random = 5;
  // Defini le point de départ du boss
  let positionBossRandom = 890;
  // Set l'accélération lorsque le player tombe
  const gravity = 0.4;

  let isPlayerOnEnemy = false;

  // création Objet Keys
  const keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
  };

  // variable qui permettra de définir un objectif pour finir un niveau par exemple
  let scrollOffset = 0;

  // Ajoutez cette variable de verrouillage
  let isIncrementingLevel = false;

  //création item pas encore collecté
  function drawItem(image, index, margin) {
    const iconSize = 50; // Taille de l'icône de l'item
    const x = canvas.width - iconSize - margin; // space between the item and the platform
    const y = 10; // top margin
    const opacity = itemOpacities[index][currentLevel];

    c.globalAlpha = opacity;
    c.drawImage(image, x, y, iconSize, iconSize);
    c.globalAlpha = 1.0;
  }

  function checkPlayerItemCollision(player, item) {
    // Vérifie s'il y a une collision en X
    const CollisionItem =
      player.position.x + player.width / 1.2 > item.position.x &&
      player.position.x * 1.1 < item.position.x + item.width &&
      player.position.y + player.height > item.position.y &&
      player.position.y < item.position.y + item.height;
    //Vérifiez le verrouillage ici
    if (CollisionItem && !isIncrementingLevel) {
      isIncrementingLevel = true; // Définissez le verrouillage pour éviter l'incrémentation multiple

      console.log(currentLevel);
      gsap.to(overlay, {
        opacity: 1,
        onComplete: () => {
          currentLevel++;
          // Réinitialisez le niveau correspondant
          if (currentLevel === 1) {
            initlevel1();
          } else if (currentLevel === 2) {
            initlevel2();
          } else if (currentLevel === 3) {
            initlevel3();
          } else if (currentLevel === 4) {
            initlevel4();
          } else if (currentLevel === 5) {
            initlevelFinal();
          }
          gsap.to(overlay, {
            opacity: 0,
            onComplete: () => {
              isIncrementingLevel = false; // Réinitialisez le verrouillage après l'animation
            },
          });
        },
      });
    }
  }

  function checkPlayerEnemyCollision(player, enemy) {
    // Vérifie s'il y a une collision en X
    const Collision =
      player.position.x + player.width / 1.2 > enemy.position.x &&
      player.position.x * 1.1 < enemy.position.x + enemy.width &&
      player.position.y + player.height > enemy.position.y &&
      player.position.y < enemy.position.y + enemy.height;
    // La condition se déclenche si les deux collisions (X et Y) sont vraies
    if (Collision) {
      console.log("");

      if (currentLevel === 1) {
        initlevel1();
      } else if (currentLevel === 2) {
        initlevel2();
      } else if (currentLevel === 3) {
        initlevel3();
      } else if (currentLevel === 4) {
        initlevel4();
      } else if (currentLevel === 5) {
        initlevelFinal();
      }
    }
  }

  function checkPlayerEnemyMovingCollision(player, MovingEnemy) {
    const Collision =
      player.position.x + player.width > MovingEnemy.position.x &&
      player.position.x < MovingEnemy.position.x + MovingEnemy.width &&
      // code pour la hauteur
      player.position.y + player.height > MovingEnemy.position.y + 1 &&
      player.position.y < MovingEnemy.position.y + MovingEnemy.height;
    // La condition se déclenche si les deux collisions (X et Y) sont vraies
    if (Collision) {
      console.log("");

      if (currentLevel === 1) {
        initlevel1();
      } else if (currentLevel === 2) {
        initlevel2();
      } else if (currentLevel === 3) {
        initlevel3();
      } else if (currentLevel === 4) {
        initlevel4();
      } else if (currentLevel === 5) {
        initlevelFinal();
      }
    }
  }

  // FONCTION UTILISE UNIQUEMENT LORSQUE LE BOSS EST STATIQUE = PEUT PRENDRE DES DEGATS

  function checkPlayerBossStaticCollision(player, Boss) {
    const Collision =
      player.position.x + player.width > Boss.position.x &&
      player.position.x < Boss.position.x + Boss.width &&
      // code pour la hauteur
      player.position.y + player.height > Boss.position.y + 1 &&
      player.position.y < Boss.position.y + Boss.height;
    // La condition se déclenche si les deux collisions (X et Y) sont vraies
    if (Collision) {
      isBossUpdateVerticalAllowed = true;
      countHitBoss = 0;
      console.log("tu es dans le boss");
      initlevelFinal();
    }
  }
  // FONCTION UTILISE UNIQUEMENT LORSQUE LE BOSS BOUGE = INVINSIBLE

  function checkMovingBossCollision(player, boss) {
    // Vérifie s'il y a une collision en X
    const Collision =
      player.position.x + player.width / 1.2 > boss.position.x &&
      player.position.x * 1.1 < boss.position.x + boss.width &&
      player.position.y + player.height > boss.position.y &&
      player.position.y < boss.position.y + boss.height;
    // La condition se déclenche si les deux collisions (X et Y) sont vraies
    if (Collision) {
      isBossUpdateVerticalAllowed = true;
      countHitBoss = 0;
      console.log("tu es muerto");
      initlevelFinal();
    }
  }

  //création du menu
  function initMenu() {
    musicMenu.pause();
    menuBackground = [
      new BackgroundMenu({ x: 0, y: 0, image: backgroundMenu }),
    ];

    titleGame = [new Titre({ x: 115, y: 20, image: title })];

    buttons = [
      new Bouttons({
        x: 150,
        y: 200,
        image: howToPlay,
        belongTo: [STATE_MENU],
        initMethod: () => {
          initHowToPlay();
          gameState = STATE_HOWTOPLAY;
        },
      }),
      new Bouttons({
        x: 410,
        y: 200,
        image: startGame,
        belongTo: [STATE_MENU],
        initMethod: () => {
          initlevel1();
          startTimer();
          gameState = STATE_GAME_ON;
        },
      }),
      new Bouttons({
        x: 670,
        y: 200,
        image: highscore,
        belongTo: [STATE_MENU],
        initMethod: () => {
          initHighscore();


          gameState = STATE_HIGHSCORE;
        },
      }),
      new Bouttons({
        x: 10,
        y: 10,
        image: backToMenu,
        belongTo: [STATE_HOWTOPLAY, STATE_HIGHSCORE],
        initMethod: () => {
          // Remove the modal content when the back button is clicked
          const modalContent = document.getElementById("modalContent");
          if (modalContent) {
            modalContent.remove();
          }

          initMenu();
          gameState = STATE_MENU;
        },
      }),
      new Bouttons({
        x: 950,
        y: 500,
        image: geolocationIcon,
        belongTo: [STATE_MENU],
        initMethod: () => {
          // Remove the modal content when the back button is clicked
          const modalContent = document.getElementById("modalContent");
          if (modalContent) {
            modalContent.remove();
          }
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              const { latitude, longitude } = position.coords;
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              // Open Google Maps with a marker at the user's coordinates
              window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
            }, error => {
              console.error("Error obtaining geolocation", error);
            });
          } else {
            console.error("Geolocation is not supported by this browser.");
          }

          //gameState = STATE_MENU;
        },
      }),
    ];

    buttons.forEach((button) => {
      setButtonAction(button);
    });

    // Add a click event listener to the canvas
    canvas.addEventListener("click", handleCanvasClick);
  }

  function setButtonAction(button) {
    let canvas = document.getElementById("canvas");
    canvas.addEventListener("click", (event) => {
      button.handleClick(event, gameState);
    });
  }

  function initHowToPlay() {
    musicMenu.play();
    BackgroundhowToPlay = [
      new BackgroundMenu({ x: 0, y: 0, image: howToPlayBackground }),
    ];
  }
  function initHighscore() {
    showScoreboard();
    musicMenu.play();
    /*Backgroundhighscore = [
      new BackgroundMenu({ x: 0, y: 0, image: highscoreBackground }),
    ];*/
    // Assuming boutonBack is an array of buttons with a single button for back to menu
    boutonBack.forEach(button => {
      button.onClick(() => {
        // Remove the overlay when the back button is clicked
        const overlay = document.getElementById("fullscreenOverlay");
        if (overlay) {
          overlay.remove();
        }



      });
    });

    canvas.addEventListener("click", handleCanvasClick);
  }

  // Function to handle canvas click events
  function handleCanvasClick(event) {
    // Calculate the position of the click
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Check if any of the buttons were clicked
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (
        x >= button.x &&
        x <= button.x + button.width &&
        y >= button.y &&
        y <= button.y + button.height
      ) {
        // The button was clicked, handle the click
        // handleButtonClick(button);
        button.initMethod();
        state = button.stateTo;
        buttons = button.nextButtons;
        handleButtonClick(button);
        return;
      }
    }
  }

  // permet de respawn après être tombé (même code que les ligne 108 - 143)
  function initlevel1() {
    musicMenu.pause();
    musicLevel1.play();
    // création de l'objet player
    player = new Player(playerFont, spriteX, spriteY);

    // création de l'objet plateform
    plateforms = [
      new Plateform({ x: 0, y: 350, image: plateformFont }),
      new Plateform({
        x: plateformFont.width * 2 - 350,
        y: 470,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 2,
        y: 305,
        image: tinyPlateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 3.2,
        y: 420,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 3.8,
        y: 300,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 5.3,
        y: 300,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 6.7,
        y: 300,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 8.25,
        y: 300,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 9.8,
        y: 300,
        image: plateformFont,
      }),
    ];

    // création de l'objet concernant le BackGround
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: mainBackGround,
      }),
    ];

    spikes = [
      // TODO change the hardcoding
      new Spikes(
        plateforms[4].position.x + 150,
        plateforms[4].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 240,
        plateforms[5].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 290,
        plateforms[5].position.y - 50,
        spikesImg
      ),
    ];

    movingEnemies = [
      new MovingEnemy(
        plateforms[1].position.x + 240,
        plateforms[1].position.y - 80,
        "vertical",
        200,
        plateforms[1].position.y,
        0,
        1,
        burgerEnemy,
        spriteX
      ),
      new MovingEnemy(
        plateforms[0].position.x + 240,
        plateforms[0].position.y - 80,
        "horizontal",
        plateforms[0].position.x,
        plateforms[0].position.x + plateforms[0].width,
        1,
        0,
        chefEnemy,
        spriteX
      ),
    ];

    item = [
      new Item(
        plateforms[1].position.x + 290,
        plateforms[1].position.y - 50,
        patePizzaImg
      ),
    ];

    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  function initlevel2() {
    musicLevel1.pause();
    musicLevel2.play();



    // création de l'objet player
    player = new Player(playerFont, spriteX, spriteY);

    // création de l'objet plateform
    plateforms = [
      new Plateform({ x: 0, y: 350, image: desertPlatform }),
      new Plateform({
        x: desertPlatform.width * 2 - 350,
        y: 500,
        image: desertPlatform,
      }),
      new Plateform({
        x: desertPlatform.width * 2,
        y: 500,
        image: desertPlatform,
      }),
      new Plateform({
        x: desertPlatform.width * 3.2,
        y: 500,
        image: desertPlatform,
      }),
      new Plateform({
        x: desertPlatform.width * 3.8,
        y: 500,
        image: desertPlatform,
      }),
      new Plateform({
        x: desertPlatform.width * 5.3,
        y: 500,
        image: desertPlatform,
      }),
      new Plateform({
        x: desertPlatform.width * 6.7,
        y: 500,
        image: desertPlatform,
      }),
      new Plateform({
        x: desertPlatform.width * 8.25,
        y: 500,
        image: desertPlatform,
      }),
      new Plateform({
        x: desertPlatform.width * 9.8,
        y: 500,
        image: desertPlatform,
      }),
    ];

    // création de l'objet concernant le BackGround
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: desertBackground,
      }),
    ];

    spikes = [
      // TODO change the hardcoding
      new Spikes(
        plateforms[4].position.x + 150,
        plateforms[4].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 240,
        plateforms[5].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 290,
        plateforms[5].position.y - 50,
        spikesImg
      ),
    ];

    movingEnemies = [
      new MovingEnemy(
        plateforms[1].position.x + 240,
        plateforms[1].position.y - 80,
        "vertical",
        200,
        plateforms[1].position.y,
        0,
        1,
        burgerEnemy,
        spriteX
      ),
      new MovingEnemy(
        plateforms[0].position.x + 240,
        plateforms[0].position.y - 80,
        "horizontal",
        plateforms[0].position.x,
        plateforms[0].position.x + plateforms[0].width,
        1,
        0,
        chefEnemy,
        spriteX
      ),
    ];

    item = [
      new Item(
        plateforms[1].position.x + 290,
        plateforms[1].position.y - 50,
        sauce
      ),
    ];
    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  function initlevel3() {
    musicLevel2.pause();
    // création de l'objet player
    player = new Player(playerFont, spriteX, spriteY);

    // création de l'objet plateform
    plateforms = [
      new Plateform({ x: 0, y: 400, image: plateformVenise }),
      new Plateform({
        x: 0,
        y: -500,
        image: plateformVeniseBottom,
      }),
      new Plateform({
        x: plateformVenise.width * 2,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 3.2,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 3.8,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 5.3,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 6.7,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 8.25,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 9.8,
        y: 500,
        image: plateformVenise,
      }),
    ];

    // création de l'objet concernant le BackGround
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: cityBackground,
      }),
    ];

    spikes = [
      // TODO change the hardcoding
      new Spikes(
        plateforms[0].position.x + 150,
        plateforms[0].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 240,
        plateforms[5].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 290,
        plateforms[5].position.y - 50,
        spikesImg
      ),
    ];

    movingEnemies = [
      new MovingEnemy(
        plateforms[1].position.x + 240,
        plateforms[1].position.y - 80,
        "vertical",
        200,
        plateforms[1].position.y,
        0,
        1,
        burgerEnemy,
        spriteX
      ),
      new MovingEnemy(
        plateforms[0].position.x + 240,
        plateforms[0].position.y - 80,
        "horizontal",
        plateforms[0].position.x,
        plateforms[0].position.x + plateforms[0].width,
        1,
        0,
        chefEnemy,
        spriteX
      ),
    ];

    item = [
      new Item(
        plateforms[0].position.x + 290,
        plateforms[0].position.y - 50,
        mozzarellaImg
      ),
    ];

    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  function initlevel4() {
    // création de l'objet player
    player = new Player(playerFont, spriteX, spriteY);

    // création de l'objet plateform
    plateforms = [
      new Plateform({ x: 0, y: 400, image: plateformVenise }),
      new Plateform({
        x: 0,
        y: -500,
        image: plateformVeniseBottom,
      }),
      new Plateform({
        x: plateformVenise.width * 2,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 3.2,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 3.8,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 5.3,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 6.7,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 8.25,
        y: 500,
        image: plateformVenise,
      }),
      new Plateform({
        x: plateformVenise.width * 9.8,
        y: 500,
        image: plateformVenise,
      }),
    ];

    // création de l'objet concernant le BackGround
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: toscanaBackground,
      }),
    ];

    spikes = [
      // TODO change the hardcoding
      new Spikes(
        plateforms[0].position.x + 150,
        plateforms[0].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 240,
        plateforms[5].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 290,
        plateforms[5].position.y - 50,
        spikesImg
      ),
    ];

    movingEnemies = [
      new MovingEnemy(
        plateforms[1].position.x + 240,
        plateforms[1].position.y - 80,
        "vertical",
        200,
        plateforms[1].position.y,
        0,
        1,
        burgerEnemy,
        spriteX
      ),
      new MovingEnemy(
        plateforms[0].position.x + 240,
        plateforms[0].position.y - 80,
        "horizontal",
        plateforms[0].position.x,
        plateforms[0].position.x + plateforms[0].width,
        1,
        0,
        chefEnemy,
        spriteX
      ),
    ];

    item = [
      new Item(
        plateforms[0].position.x + 290,
        plateforms[0].position.y - 50,
        prosciuttoImg
      ),
    ];

    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  function initlevelFinal() {
    bossMusic.play();
    // création de l'objet player
    player = new Player(playerFont, spriteX, spriteY);

    // création de l'objet plateform
    plateforms = [
      new Plateform({ x: 0, y: 400, image: bossPlatform }),
      new Plateform({ x: bossPlatform.width, y: 400, image: bossPlatform }),
    ];

    // création de l'objet concernant le BackGround
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: bossBackground,
      }),
    ];

    bosses = [
      new Boss(125, plateforms[0].position.y - 135, 0, canvas.width, 10, bossSprite, spriteX),
    ];

    item = [];

    spikes = [];

    movingEnemies = [];

    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  // rafraichissement du canvas
  function rafraichissement() {
    requestAnimationFrame(rafraichissement);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      // update time
      then = now - (delta % interval);
      choixAffichage();
    }
  }

  // détermine quoi afficher()
  function choixAffichage() {
    switch (gameState) {
      case STATE_MENU:
        animateMenu();
        break;
      case STATE_GAME_ON:
        animate();
        break;
      case STATE_HOWTOPLAY:
        animateHowToPlay();
        break;
      case STATE_HIGHSCORE:

        animateHighscore();
        break;
    }
  }

  let startTime = 0; // Initialisez le temps de départ
  let elapsedTime = 0; // Initialisez le temps écoulé

  function startTimer() {
    startTime = Date.now(); // Mettez à jour le temps de départ à chaque démarrage du minuteur
  }


  // permet de refresh en temps réel la position du player (evite que le player se déplace à l'infini dès qu'une touche est enfoncé)
  function animate() {
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Vous pouvez ensuite mettre à jour elapsedTime comme suit dans votre boucle ou à un moment donné
    const currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000); // Temps en secondes

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;



    genericObjects.forEach((genericObject) => {
      genericObject.draw(c);
    });

    plateforms.forEach((plateform) => {
      plateform.draw(c);
    });

    spikes.forEach((spikes) => {
      checkPlayerEnemyCollision(player, spikes);
      spikes.draw(c);
    });

    item.forEach((item) => {
      checkPlayerItemCollision(player, item);
      item.draw(c);
    });

    movingEnemies.forEach((MovingEnemy) => {
      checkPlayerEnemyMovingCollision(player, MovingEnemy);

      // Mettez à jour la position horizontale du MovingEnemy
      MovingEnemy.updatePosition();
      MovingEnemy.draw(c);
    });

    if (currentLevel === 5) {
      bosses.forEach((boss) => {
        boss.draw(c);
        // SI LE BOOLEAN EST TRUE ALORS l'ENEMY SE DEPLACE ET EST INVINCIBLE
        if (isBossUpdateVerticalAllowed) {
          boss.updateVertical();
          checkMovingBossCollision(player, boss);
        }
        // si le boolean est faux, le  boss ne bouge pas et nous pouvons maintenant l'attaqué
        if (!isBossUpdateVerticalAllowed) {
          checkPlayerBossStaticCollision(player, boss);
        }

        console.log("le random est de   " + random);

        if (
          Math.abs(boss.position.x + boss.width == 890) &&
          countHitBoss === 0
        ) {
          //boss.max = 890;
          maxReachedCounter++;
        } else if (
          Math.abs(boss.position.x + boss.width == 506) &&
          countHitBoss === 1
        ) {
          //boss.max = 500;
          maxReachedCounter++;
        } else if (
          Math.abs(boss.position.x + boss.width == 310) &&
          countHitBoss === 2
        ) {
          //boss.max = 308;
          maxReachedCounter++;
        }

        if (maxReachedCounter === random) {
          isBossUpdateVerticalAllowed = false;
          random = boss.randomPosition();

          setTimeout(() => {
            maxReachedCounter = 0;
            isBossUpdateVerticalAllowed = true;
          }, 3000);
        }
      });
    }

    // Gérer le saut automatique si le joueur est sur l'ennemi
    if (isPlayerOnEnemy) {
      if (player.velocity.y === 0) {
        isPlayerOnEnemy = false;
        player.velocity.y -= 12;
      }
    }

    player.update(c, canvas, gravity);

    // permet de mettre en place un niveau static pour le BossFinal
    if (currentLevel === 5) {
      if (keys.right.pressed && player.position.x < 930) {
        player.velocity.x = player.speed;
        spriteY = 1;
      } else if (
        (keys.left.pressed && player.position.x > 100) ||
        (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
      ) {
        player.velocity.x = -player.speed;
      } else {
        player.velocity.x = 0;
      }
    } else {
      // si la touche est enfoncé déplacement de 5 sinon 0
      // le 400 et 100 réprésentent les positions que le joueurs ne peut pas dépassé
      if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
        spriteY = 1;
      } else if (
        (keys.left.pressed && player.position.x > 100) ||
        (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
      ) {
        player.velocity.x = -player.speed;
      } else {
        player.velocity.x = 0;
        // permet de donner l'illusion que les plateformes se déplacent lorsque le joueur bouge
        if (keys.right.pressed) {
          spriteY = 0;
          scrollOffset += player.speed;
          plateforms.forEach((plateform) => {
            plateform.position.x -= player.speed;
          });

          genericObjects.forEach((genericObject) => {
            genericObject.position.x -= player.speed * 0.66;
          });

          spikes.forEach((spikes) => {
            spikes.position.x -= player.speed;
          });
          item.forEach((item) => {
            item.position.x -= player.speed;
          });

          movingEnemies.forEach((MovingEnemy) => {
            if (MovingEnemy.movementType === "horizontal") {
              MovingEnemy.min -= player.speed;
              MovingEnemy.max -= player.speed;
            }

            MovingEnemy.position.x -= player.speed;
          });
        } else if (keys.left.pressed && scrollOffset > 0) {
          scrollOffset -= player.speed;
          plateforms.forEach((plateform) => {
            plateform.position.x += player.speed;
          });
          genericObjects.forEach((genericObject) => {
            genericObject.position.x += player.speed * 0.66;
          });
          spikes.forEach((spikes) => {
            spikes.position.x += player.speed;
          });
          item.forEach((item) => {
            item.position.x += player.speed;
          });
          movingEnemies.forEach((MovingEnemy) => {
            if (MovingEnemy.movementType === "horizontal") {
              MovingEnemy.min += player.speed;
              MovingEnemy.max += player.speed;
            }
            MovingEnemy.position.x += player.speed;
          });
        }
      }
    }

    // gère la collision du joueur avec les plateformes
    plateforms.forEach((plateform) => {
      if (
        player.position.y + player.height <= plateform.position.y &&
        player.position.y + player.height + player.velocity.y >=
        plateform.position.y &&
        player.position.x + player.width >= plateform.position.x &&
        player.position.x <= plateform.position.x + plateform.width
      ) {
        player.velocity.y = 0;
      }
    });
    // gère les collision du joueur avec les Moving Enemy
    movingEnemies.forEach((MovingEnemy, index) => {
      if (
        player.position.y + player.height <= MovingEnemy.position.y &&
        player.position.y + player.height + player.velocity.y >=
        MovingEnemy.position.y &&
        player.position.x + player.width >= MovingEnemy.position.x &&
        player.position.x <= MovingEnemy.position.x + MovingEnemy.width
      ) {
        movingEnemies.splice(index, 1);
        player.velocity.y = 0;
        isPlayerOnEnemy = true;
      } else {
        isPlayerOnEnemy = false;
      }
    });

    // gère les collision du joueur avec le Boss
    bosses.forEach((Boss, index) => {
      // PERMET DE FAIRE DES DEGATS AU BOSS, LA CONDITION EST LA POUR ETRE LU UNIQUEMNT LORSQUE LE BOSS EST IMMOBILE
      if (!isBossUpdateVerticalAllowed) {
        if (
          player.position.y + player.height <= Boss.position.y &&
          player.position.y + player.height + player.velocity.y >=
          Boss.position.y &&
          player.position.x + player.width >= Boss.position.x &&
          player.position.x <= Boss.position.x + Boss.width
        ) {
          countHitBoss++;
          Boss.speed = Boss.speed + 2;
          isBossUpdateVerticalAllowed = true;
          player.velocity.y = 0;
          isPlayerOnEnemy = true;
          if (countHitBoss === 3) {
            bosses.splice(index, 1);
            player.velocity.y = 0;
            isPlayerOnEnemy = true;

            /*let person = prompt("Please enter your name");
            if (person == null || person == "") {
              person = "Unknown";
            }
            addDoc("result",person,formattedTime);*/
          }
        } else {
          isPlayerOnEnemy = false;
        }
      }
    });

    if (player.position.y > canvas.height) {
      if (currentLevel === 1) {
        initlevel1();
      } else if (currentLevel === 2) {
        initlevel2();
      } else if (currentLevel === 3) {
        initlevel3();
      } else if (currentLevel === 4) {
        initlevel4();
      } else if (currentLevel === 5) {
        initlevelFinal();
      }
    }

    // Affichage du temps à l'écranin
    c.fillStyle = "white";
    c.font = "20px Arial";
    c.fillText("Time: " + formattedTime, 20, 30);

    drawItem(patePizzaImg, itemIndices.dough, 10);
    drawItem(sauce, itemIndices.sauce, 70);
    drawItem(mozzarellaImg, itemIndices.mozzarella, 130);
    drawItem(prosciuttoImg, itemIndices.prosciutto, 190);

    //overlay pour changement de niveau
    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
  }

  //permet de lancer le menu avant le jeu
  function animateMenu() {
    animate_class.animateMenu(menuBackground, buttons, titleGame, gameState);

    initMenu();
  }

  //permet de lancer la page how to play
  function animateHowToPlay() {
    animate_class.animateHowToPlay(BackgroundhowToPlay, buttons, gameState);
  }

  //permet de lancer la page highscore
  function animateHighscore() {

    animate_class.animateHowToPlay(Backgroundhighscore, buttons, gameState);
  }

  // assignation des touches pour les déplacements QUAND TOUCHE ENFONCE
  window.addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
      case 65:
        //console.log("left");
        keys.left.pressed = true;
        spriteY = 2;
        if (player.spriteY !== 2) player.spriteY = 2;
        break;
      case 83:
        //console.log("down");
        break;
      case 68:
        //console.log("right");
        keys.right.pressed = true;
        spriteY = 1;
        if (player.spriteY !== 1) player.spriteY = 1;
        break;
      case 87:
        // console.log("up");
        keys.up.pressed = true;
        spriteY = 3;
        if (player.spriteY !== 3 && player.velocity.y === 0) player.spriteY = 3;
        if ((player.velocity.y === 0 || isPlayerOnEnemy) && !isPlayerOnEnemy)
          player.velocity.y -= 12;
        break;
    }
  });

  // assignation des touches pour les déplacements QUAND TOUCHE RELACHE
  window.addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
      case 65:
        //console.log("left");
        keys.left.pressed = false;
        if (!keys.right.pressed) player.spriteY = 0;
        break;
      case 83:
        //console.log("down");
        break;
      case 68:
        // console.log("right");
        keys.right.pressed = false;
        if (!keys.left.pressed) player.spriteY = 0;
        break;
      case 87:
        // console.log("up");
        keys.up.pressed = false;
        if (!keys.left.pressed && !keys.right.pressed) player.spriteY = 0;
        if (keys.left.pressed) player.spriteY = 2;
        if (keys.right.pressed) player.spriteY = 1;
        break;
    }
  });
  rafraichissement();
});
