// classes import 
import Plateform from "./Class/Plateform.js";
import GenericObject from "./Class/GenericObject.js";
import Player from "./Class/Player.js";
import Spikes from "./Class/Spikes.js";
import MovingEnemy from "./Class/MovingEnemy.js";
import Item from "./Class/Item.js";
import Boss from "./Class/Boss.js";
import Buttons from "./Class/Buttons.js";
import Title from "./Class/Title.js";
import DragAndDropHandler from "./Class/DragAndDropHandler.js";
import BackgroundMenu from "./Class/BackgroundMenu.js";
import { addDoc, dumpCollection, showScoreboard } from "../Firebase.js";
import Animate from "./Class/Animate.js";

// audio import
const soundURL = "sound/";
let volumeLevel = 0.1;

// create the audio objects
let bossMusic = new Audio();
let musicLevel1 = new Audio();
let musicMenu = new Audio();
let musicLevel2 = new Audio();
let musicEnding = new Audio();

// set the music loop to true
bossMusic.loop = true;
musicLevel1.loop = true;
musicMenu.loop = true;
musicLevel2.loop = true;
musicEnding.loop = true;

// fetch the music.json file and set the volume of the music
fetch("/music.json")
  .then((response) => response.json())
  .then((data) => {
    bossMusic.src = soundURL + data.bossMusic;
    bossMusic.volume = volumeLevel;

    musicLevel1.src = soundURL + data.musicLevel1;
    musicLevel1.volume = volumeLevel;

    musicMenu.src = soundURL + data.musicMenu;
    musicMenu.volume = volumeLevel;

    musicLevel2.src = soundURL + data.musicLevel2;
    musicLevel2.volume = volumeLevel;

    musicEnding.src = soundURL + data.musicEnding;
    musicEnding.volume = volumeLevel;
  });

// images import
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
const toscanePlatform = new Image();
const desertBackground = new Image();
const desertPlatform = new Image();
const plateformVenise = new Image();
const plateformVeniseBottom = new Image();
const plateformVeniseSmall = new Image();
const cityBackground = new Image();
const mozzarellaImg = new Image();
const chefEnemy = new Image();
const burgerEnemy = new Image();
const howToPlay = new Image();
const sauce = new Image();
const startGame = new Image();
const highscore = new Image();
const title = new Image();
const customize = new Image();
const howToPlayBackground = new Image();
const highscoreBackground = new Image();
const backToMenu = new Image();
const backgroundMenu = new Image();
const prosciuttoImg = new Image();
const patePizzaImg = new Image();
const bossBackground = new Image();
const bossPlatform = new Image();
const bossSprite = new Image();
const geolocationIcon = new Image();
const backEnding = new Image();
const home = new Image();
home.src = imgURL + "home.png";
backEnding.src = imgURL + "bravo.png";
geolocationIcon.src = imgURL + "geolocalisation.png";
bossBackground.src = imgURL + "bossBackground.png";
desertPlatform.src = imgURL + "desertPlatform.png";
bossPlatform.src = imgURL + "bossPlatform.png";
sauce.src = imgURL + "tomatoSauce.png";
toscanaBackground.src = imgURL + "toscanaBackground.png";
toscanePlatform.src = imgURL + "platformToscane.png";
patePizzaImg.src = imgURL + "dough.png";
prosciuttoImg.src = imgURL + "prosciutto.png";
bossSprite.src = imgURL + "boss.png";
chefEnemy.src = imgURL + "chefSprite.png";
burgerEnemy.src = imgURL + "burgerSprite.png";
customize.src = imgURL + "customize.png";
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
plateformVeniseSmall.src = imgURL + "platformVeniseSmall.png";
howToPlay.src = imgURL + "HowToPlay.png";
startGame.src = imgURL + "StartGame.png";
highscore.src = imgURL + "Highscore.png";
title.src = imgURL + "title.png";
backgroundMenu.src = imgURL + "mainBackground.png";
howToPlayBackground.src = imgURL + "HowToPlayBackground.png";
highscoreBackground.src = imgURL + "HighscoreBackground.png";
backToMenu.src = imgURL + "backToMenu.png";

// animation import
const animate_class = new Animate();

// setup the canvas and context 
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas");
  const c = canvas.getContext("2d");
  console.log(c);

  // define the canvas dimensions
  canvas.width = 1024;
  canvas.height = 576;

  // define the sprite animation variables
  let spriteX = 0;
  let spriteY = 0;
  let isAnimated = true;

  // define the overlay object
  const overlay = {
    opacity: 0,
  };

  // variables for the game loop
  let fps = 100;
  let now;
  let then = Date.now();
  let interval = 1000 / fps;
  let delta;

  // game state variables
  const STATE_MENU = "menu";
  const STATE_HOWTOPLAY = "howToPlay";
  const STATE_HIGHSCORE = "highscore";
  const STATE_PLAYERSELECTION = "playerSelection";
  const STATE_GAME_ON = "gameOn";
  const STATE_END = "ending";
  let gameState = STATE_MENU;

  // handle click (x,y du click)
  // for each button
  // if(button.IsInBounds(x,y))
  //-> state = button.stateTo
  //-> buttons = button.nextButtons

  // player creation
  let player = new Player(playerFont, spriteX, spriteY, isAnimated);

  let currentLevel = 1;

  let formattedTime;

  // item creation 
  let item = [];

  const itemIndices = {
    dough: 0,
    sauce: 1,
    mozzarella: 2,
    prosciutto: 3,
  };

  // item opacities for each level 
  const itemOpacities = {
    [itemIndices.dough]: { 1: 0.3, 2: 2.5, 3: 2.5, 4: 2.5, 5: 2.5 },
    [itemIndices.sauce]: { 1: 0.3, 2: 0.3, 3: 2.5, 4: 2.5, 5: 2.5 },
    [itemIndices.mozzarella]: { 1: 0.3, 2: 0.3, 3: 0.3, 4: 2.5, 5: 2.5 },
    [itemIndices.prosciutto]: { 1: 0.3, 2: 0.3, 3: 0.3, 4: 0.3, 5: 2.5 },
  };

  // menu creation 
  let buttons = [];
  let titleGame = [];
  let menuBackground = [];
  let BackgroundhowToPlay = [];
  let boutonBack = [];
  let Backgroundhighscore = [];
  let BackgroundEnding = [];
  let BackgroundPlayerSelection = [];
  let buttonGeolocation = [];

  // plateform creation
  let plateforms = [];

  // background creation
  let genericObjects = [];

  // spikes creation
  let spikes = [];

  // moving enemies creation 
  let movingEnemies = [];
  let movingEnemiesY = [];

  // boss creation
  let bosses = [];
  // boss position
  let maxReachedCounter = 0;
  // used to switch between the boss phases
  let isBossUpdateVerticalAllowed = true;
  // add a counter to count the number of hits on the boss
  let countHitBoss = 0;
  // random number to set the boss position
  let random = 5;
  // start position of the boss
  let positionBossRandom = 890;
  
  // set the gravity
  const gravity = 0.4;

  // check if the player is on an enemy
  let isPlayerOnEnemy = false;

  // key pressed
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

  // define an objectif to finish a level
  let scrollOffset = 0;

  // lock the incrementation of the level
  let isIncrementingLevel = false;

  // item creation
  function drawItem(image, index, margin) {
    const iconSize = 50; // size of the item
    const x = canvas.width - iconSize - margin; // space between the item and the platform
    const y = 10; // top margin
    const opacity = itemOpacities[index][currentLevel];

    // draw the item
    c.globalAlpha = opacity;
    c.drawImage(image, x, y, iconSize, iconSize);
    c.globalAlpha = 1.0;
  }

  function checkPlayerItemCollision(player, item) {
    // check if there is a collision with the item
    const CollisionItem =
      player.position.x + player.width / 1.2 > item.position.x &&
      player.position.x * 1.1 < item.position.x + item.width &&
      player.position.y + player.height > item.position.y &&
      player.position.y < item.position.y + item.height;

    // check the lock to avoid multiple incrementation of the level
    if (CollisionItem && !isIncrementingLevel) {
      isIncrementingLevel = true;

      console.log(currentLevel);
      gsap.to(overlay, {
        opacity: 1,
        onComplete: () => {
          currentLevel++;
          // init the level
          if (currentLevel === 1)
            initlevel1();
           else if (currentLevel === 2) 
            initlevel2();
           else if (currentLevel === 3) 
            initlevel3();
           else if (currentLevel === 4) 
            initlevel4();
           else if (currentLevel === 5) 
            initlevelFinal();
          
          gsap.to(overlay, {
            opacity: 0,
            onComplete: () => {
              isIncrementingLevel = false; 
            },
          });
        },
      });
    }
  }

  function checkPlayerEnemyCollision(player, enemy) {
    // check if there is a collision
    const Collision =
      // x position
      player.position.x + player.width / 1.2 > enemy.position.x &&
      player.position.x * 1.1 < enemy.position.x + enemy.width &&
      // y position
      player.position.y + player.height > enemy.position.y &&
      player.position.y < enemy.position.y + enemy.height;
    // the condition triggers if both collisions (X and Y) are true
    if (Collision) {
      // init the level 
      if (currentLevel === 1) 
        initlevel1();
       else if (currentLevel === 2) 
        initlevel2();
       else if (currentLevel === 3) 
        initlevel3();
       else if (currentLevel === 4) 
        initlevel4();
       else if (currentLevel === 5) 
        initlevelFinal();
    }
  }

  // check if there is a collision with the moving enemy
  function checkPlayerEnemyMovingCollision(player, MovingEnemy) {
    const Collision =
      // width
      player.position.x + player.width > MovingEnemy.position.x &&
      player.position.x < MovingEnemy.position.x + MovingEnemy.width &&
      // height
      player.position.y + player.height > MovingEnemy.position.y + 1 &&
      player.position.y < MovingEnemy.position.y + MovingEnemy.height;
    // the condition triggers if both collisions (X and Y) are true
    if (Collision) {
      console.log("");

      if (currentLevel === 1) 
        initlevel1();
      else if (currentLevel === 2) 
        initlevel2();
      else if (currentLevel === 3) 
        initlevel3();
      else if (currentLevel === 4) 
        initlevel4();
      else if (currentLevel === 5) 
        initlevelFinal();
    }
  }

  // used only when the boss is static = vulnerable
  function checkPlayerBossStaticCollision(player, Boss) {
    const Collision =
      player.position.x + player.width > Boss.position.x &&
      player.position.x < Boss.position.x + Boss.width &&
      // code pour la hauteur
      player.position.y + player.height > Boss.position.y + 1 &&
      player.position.y < Boss.position.y + Boss.height;
    // the condition triggers if both collisions (X and Y) are true
    if (Collision) {
      isBossUpdateVerticalAllowed = true;
      countHitBoss = 0;
      console.log("tu es dans le boss");
      initlevelFinal();
    }
  }

  // used only when the boss is moving = invulnerable
  function checkMovingBossCollision(player, boss) {
    // check if there is a collision
    const Collision =
      // x position
      player.position.x + player.width / 1.2 > boss.position.x &&
      player.position.x * 1.1 < boss.position.x + boss.width &&
      // y position
      player.position.y + player.height > boss.position.y &&
      player.position.y < boss.position.y + boss.height;
    // the condition triggers if both collisions (X and Y) are true
    if (Collision) {
      isBossUpdateVerticalAllowed = true;
      countHitBoss = 0;
      initlevelFinal();
    }
  }

  // menu initialization
  function initMenu() {
    musicMenu.pause();
    menuBackground = [
      new BackgroundMenu({ x: 0, y: 0, image: backgroundMenu }),
    ];

    titleGame = [new Title({ x: 115, y: 20, image: title })];

    buttons = [
      new Buttons({
        x: 35,
        y: 200,
        image: howToPlay,
        belongTo: [STATE_MENU],
        initMethod: () => {
          initHowToPlay();
          gameState = STATE_HOWTOPLAY;
        },
      }),
      new Buttons({
        x: 285,
        y: 200,
        image: startGame,
        belongTo: [STATE_MENU],
        initMethod: () => {
          initlevel1();
          startTimer();
          gameState = STATE_GAME_ON;
        },
      }),
      new Buttons({
        x: 535,
        y: 200,
        image: highscore,
        belongTo: [STATE_MENU],
        initMethod: () => {
          initHighscore();

          gameState = STATE_HIGHSCORE;
        },
      }),
      new Buttons({
        x: 785,
        y: 200,
        image: customize,
        belongTo: [STATE_MENU],
        initMethod: () => {
          initPlayerSelection();
          gameState = STATE_PLAYERSELECTION;
        },
      }),
      new Buttons({
        x: 105,
        y: 200,
        image: customize,
        belongTo: [STATE_PLAYERSELECTION],
        initMethod: () => {
          playerFont.src = imgURL + "sprite.png";
          playerFont.onload = () => {
            isAnimated = true;

            // reset the drop zone 
            const dropZone = document.getElementById("dropZone");
            if (dropZone)
              dropZone.remove();

            const dragAndDropHandler = new DragAndDropHandler(
              playerFont,
              isAnimated
            );
            dragAndDropHandler.addStyles();

            // set isAnimated to false if the user added a custom image (only if a custom image is added)
            playerFont.onload = () => {
              isAnimated = false;
            };
          };
          console.log(isAnimated);
        },
      }),
      new Buttons({
        x: 10,
        y: 10,
        image: backToMenu,
        belongTo: [STATE_HOWTOPLAY, STATE_HIGHSCORE, STATE_PLAYERSELECTION],
        initMethod: () => {
          // remove the drop zone when the back button is clicked
          if (gameState === STATE_PLAYERSELECTION) {
            const dropZone = document.getElementById("dropZone");
            if (dropZone) dropZone.remove();
          }
          // remove the modal content when the back button is clicked
          const modalContent = document.getElementById("modalContent");
          if (modalContent) {
            modalContent.remove();
          }
          initMenu();
          gameState = STATE_MENU;
        },
      }),
      new Buttons({
        x: 950,
        y: 500,
        image: geolocationIcon,
        belongTo: [STATE_MENU],
        initMethod: () => {
          // remove the modal content when the back button is clicked
          const modalContent = document.getElementById("modalContent");
          if (modalContent)
            modalContent.remove();
          
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                // open Google Maps with a marker at the user's coordinates
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
                );
              },
              (error) => {
                console.error("Error obtaining geolocation", error);
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser.");
          }

          //gameState = STATE_MENU;
        },
      }),
      new Buttons({
        x: 10,
        y: 10,
        image: home,
        belongTo: [STATE_END],
        initMethod: () => {
          window.location.href = window.location.href;
          gameState = STATE_END;
        },
      }),
    ];

    buttons.forEach((button) => {
      setButtonAction(button);
    });

    // add a click event listener to the canvas
    canvas.addEventListener("click", handleCanvasClick);
  }

  function setButtonAction(button) {
    let canvas = document.getElementById("canvas");
    canvas.addEventListener("click", (event) => {
      button.handleClick(event, gameState);
    });
  }

  // how to play initialization
  function initHowToPlay() {
    musicMenu.play();
    BackgroundhowToPlay = [
      new BackgroundMenu({ x: 0, y: 0, image: howToPlayBackground }),
    ];
  }

  // highscore initialization
  function initHighscore() {
    showScoreboard();
    musicMenu.play();
   Backgroundhighscore = [
      new BackgroundMenu({ x: 0, y: 0, image: backgroundMenu }),
    ];
  }

  // ending initialization
  function initEnding() {
    bossMusic.pause();
    musicEnding.play();
    let person = prompt("Please enter your name");
    if (person == null || person == "") {
      person = "Unknown";
    }
    addDoc("result", person, formattedTime);
    BackgroundEnding = [new BackgroundMenu({ x: 0, y: 0, image: backEnding })];
  }

  // player selection initialization
  function initPlayerSelection() {
    musicMenu.play();
    BackgroundPlayerSelection = [
      new BackgroundMenu({ x: 0, y: 0, image: backgroundMenu }),
    ];

    // instantiate the DragAndDropHandler
    const dragAndDropHandler = new DragAndDropHandler(playerFont, isAnimated);
    dragAndDropHandler.addStyles();

    //set isAnimated to false if the user added a custom image (only if a custom image is added)
    playerFont.onload = () => {
      isAnimated = false;
    };
  }

  // handle canvas click event
  function handleCanvasClick(event) {
    // calculate the position of the click
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // check if any of the buttons was clicked
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (
        x >= button.x &&
        x <= button.x + button.width &&
        y >= button.y &&
        y <= button.y + button.height
      ) {
        // the button was clicked, handle the click
        // handleButtonClick(button);
        button.initMethod();
        state = button.stateTo;
        buttons = button.nextButtons;
        handleButtonClick(button);
        return;
      }
    }
  }

  // level 1 initialization
  function initlevel1() {
    musicMenu.pause();
    musicLevel1.play();
    // player object creation
    player = new Player(playerFont, spriteX, spriteY,isAnimated);

    // plateforms creation
    plateforms = [
      new Plateform({
        x: 0,
        y: 350,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 1.5,
        y: 250,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 3,
        y: 305,
        image: tinyPlateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 4.5,
        y: 420,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 6,
        y: 380,
        image: plateformFont,
      }),
    ];

    // background creation
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: mainBackGround,
      }),
    ];

    spikes = [
      new Spikes(
        plateforms[0].position.x + 300,
        plateforms[0].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[1].position.x + 150,
        plateforms[1].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[2].position.x + 240,
        plateforms[2].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[2].position.x + 290,
        plateforms[2].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[4].position.x + 150,
        plateforms[4].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[4].position.x + 220,
        plateforms[4].position.y - 50,
        spikesImg
      ),
    ];

    movingEnemies = [
      new MovingEnemy(
        plateforms[2].position.x + 240,
        plateforms[2].position.y,
        "vertical",
        0,
        plateforms[2].position.y,
        0,
        1,
        burgerEnemy,
        spriteX
      ),
      new MovingEnemy(
        plateforms[1].position.x + 240,
        plateforms[1].position.y - 80,
        "horizontal",
        plateforms[1].position.x,
        plateforms[1].position.x + plateforms[0].width,
        1,
        0,
        chefEnemy,
        spriteX
      ),
      new MovingEnemy(
        plateforms[3].position.x,
        plateforms[3].position.y - 80,
        "horizontal",
        plateforms[3].position.x,
        plateforms[3].position.x + plateforms[0].width,
        1,
        0,
        chefEnemy,
        spriteX
      ),
    ];

    item = [
      new Item(
        plateforms[0].position.x + 455,
        plateforms[0].position.y - 50,
        patePizzaImg
      ),
    ];

    // used to define an objectif to finish a level
    scrollOffset = 0;
  }

  // level 2 initialization
  function initlevel2() {
    musicLevel1.pause();
    musicLevel2.play();

    // player creation
    player = new Player(playerFont, spriteX, spriteY, isAnimated);

    // plateform creation
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

    // background creation 
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: desertBackground,
      }),
    ];

    spikes = [
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
    // used to define an objectif to finish a level
    scrollOffset = 0;
  }

  function initlevel3() {
    musicLevel2.pause();
    // player creation
    player = new Player(playerFont, spriteX, spriteY, isAnimated);

    // plateform creation
    plateforms = [
      //0
      new Plateform({ x: 0, y: 500, image: plateformVenise }),
      //1
      new Plateform({
        x: 0,
        y: -400,
        image: plateformVeniseBottom,
      }),
      //2
      new Plateform({
        x: plateformVenise.width * 2,
        y: 500,
        image: plateformVeniseSmall,
      }),
      //3
      new Plateform({
        x: plateformVenise.width * 2.5,
        y: 300,
        image: plateformVenise,
      }),
      //4
      new Plateform({
        x: plateformVenise.width * 3.5,
        y: 120,
        image: plateformVenise,
      }),
      //5
      new Plateform({
        x: plateformVenise.width * 4.6,
        y: 200,
        image: plateformVeniseSmall,
      }),
      //6
      new Plateform({
        x: plateformVenise.width * 5.2,
        y: 200,
        image: plateformVeniseSmall,
      }),
      //7
      new Plateform({
        x: plateformVenise.width * 4.8,
        y: 500,
        image: plateformVenise,
      }),
      //8
      new Plateform({
        x: plateformVenise.width * 6,
        y: 320,
        image: plateformVeniseSmall,
      }),
      //9
      new Plateform({
        x: plateformVenise.width * 6.6,
        y: 140,
        image: plateformVenise,
      }),
      //10
      new Plateform({
        x: plateformVenise.width * 7.2,
        y: 500,
        image: plateformVeniseSmall,
      }),
      //11
      new Plateform({
        x: plateformVenise.width * 6.6,
        y: 400,
        image: plateformVeniseSmall,
      }),
      //12
      new Plateform({
        x: plateformVenise.width * 7.1,
        y: 300,
        image: plateformVeniseSmall,
      }),
      //13
      new Plateform({
        x: plateformVenise.width * 7.8,
        y: 140,
        image: plateformVenise,
      }),
      //14
      new Plateform({
        x: plateformVenise.width * 9.8,
        y: 500,
        image: plateformVenise,
      }),
    ];

    // background creation
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: cityBackground,
      }),
    ];

    spikes = [
      new Spikes(
        plateforms[0].position.x,
        plateforms[0].position.y - 218,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[0].position.x + 50,
        plateforms[0].position.y - 218,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[0].position.x + 250,
        plateforms[0].position.y - 218,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[0].position.x + 300,
        plateforms[0].position.y - 218,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[0].position.x + 350,
        plateforms[0].position.y - 218,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[0].position.x + 400,
        plateforms[0].position.y - 218,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[5].position.x,
        plateforms[5].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 50,
        plateforms[5].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 100,
        plateforms[5].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 140,
        plateforms[5].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[5].position.x + 140,
        plateforms[5].position.y,
        spikesRightImg
      ),
      new Spikes(
        plateforms[5].position.x + 140,
        plateforms[5].position.y + 50,
        spikesRightImg
      ),
      new Spikes(
        plateforms[5].position.x + 140,
        plateforms[5].position.y + 100,
        spikesRightImg
      ),
      new Spikes(
        plateforms[5].position.x + 140,
        plateforms[5].position.y + 150,
        spikesRightImg
      ),
      new Spikes(
        plateforms[5].position.x + 140,
        plateforms[5].position.y + 200,
        spikesRightImg
      ),
      new Spikes(
        plateforms[5].position.x + 140,
        plateforms[5].position.y + 250,
        spikesRightImg
      ),
      new Spikes(
        plateforms[6].position.x - 30,
        plateforms[6].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[6].position.x,
        plateforms[6].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[6].position.x + 50,
        plateforms[6].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[6].position.x + 100,
        plateforms[6].position.y - 50,
        spikesImg
      ),
      new Spikes(
        plateforms[6].position.x - 30,
        plateforms[6].position.y,
        spikesLeftImg
      ),
      new Spikes(
        plateforms[6].position.x - 30,
        plateforms[6].position.y + 50,
        spikesLeftImg
      ),
      new Spikes(
        plateforms[6].position.x - 30,
        plateforms[6].position.y + 100,
        spikesLeftImg
      ),
      new Spikes(
        plateforms[6].position.x - 30,
        plateforms[6].position.y + 150,
        spikesLeftImg
      ),
      new Spikes(
        plateforms[9].position.x - 30,
        plateforms[9].position.y + 50,
        spikesLeftImg
      ),
      new Spikes(
        plateforms[9].position.x - 30,
        plateforms[9].position.y + 100,
        spikesLeftImg
      ),
      new Spikes(
        plateforms[9].position.x - 30,
        plateforms[9].position.y + 150,
        spikesLeftImg
      ),
      new Spikes(
        plateforms[9].position.x - 30,
        plateforms[9].position.y + 200,
        spikesLeftImg
      ),
      new Spikes(
        plateforms[9].position.x + 400,
        plateforms[9].position.y - 180,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[9].position.x + 450,
        plateforms[9].position.y - 180,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[9].position.x + 500,
        plateforms[9].position.y - 180,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[9].position.x + 550,
        plateforms[9].position.y - 180,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[9].position.x + 600,
        plateforms[9].position.y - 180,
        spikesBottomImg
      ),
      new Spikes(
        plateforms[9].position.x + 650,
        plateforms[9].position.y - 180,
        spikesBottomImg
      ),
    ];

    movingEnemies = [
      new MovingEnemy(
        plateforms[0].position.x + 700,
        plateforms[0].position.y - 80,
        "vertical",
        200,
        plateforms[0].position.y,
        0,
        1,
        burgerEnemy,
        spriteX
      ),
      new MovingEnemy(
        plateforms[2].position.x + 240,
        plateforms[2].position.y - 80,
        "horizontal",
        plateforms[2].position.x,
        plateforms[2].position.x + plateforms[2].width,
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

    // used to define an objectif to finish a level
    scrollOffset = 0;
  }

  function initlevel4() {
    // player object creation 
    player = new Player(playerFont, spriteX, spriteY, isAnimated);

    // plateform objects creation
    plateforms = [
      new Plateform({ x: 0, y: 400, image: toscanePlatform }),
      new Plateform({
        x: 0,
        y: -500,
        image: toscanePlatform,
      }),
      new Plateform({
        x: toscanePlatform.width * 2,
        y: 500,
        image: toscanePlatform,
      }),
      new Plateform({
        x: toscanePlatform.width * 3.2,
        y: 500,
        image: toscanePlatform,
      }),
      new Plateform({
        x: toscanePlatform.width * 3.8,
        y: 500,
        image: toscanePlatform,
      }),
      new Plateform({
        x: toscanePlatform.width * 5.3,
        y: 500,
        image: toscanePlatform,
      }),
      new Plateform({
        x: toscanePlatform.width * 6.7,
        y: 500,
        image: toscanePlatform,
      }),
      new Plateform({
        x: toscanePlatform.width * 8.25,
        y: 500,
        image: toscanePlatform,
      }),
      new Plateform({
        x: toscanePlatform.width * 9.8,
        y: 500,
        image: toscanePlatform,
      }),
    ];

    // background creation
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: toscanaBackground,
      }),
    ];

    spikes = [
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

    // used to define an objectif to finish a level
    scrollOffset = 0;
  }

  function initlevelFinal() {
    bossMusic.play();
    // player object creation
    player = new Player(playerFont, spriteX, spriteY, isAnimated);

    // plateform objects creation
    plateforms = [
      new Plateform({ x: 0, y: 400, image: bossPlatform }),
      new Plateform({ x: bossPlatform.width, y: 400, image: bossPlatform }),
    ];

    // background creation
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: bossBackground,
      }),
    ];

    bosses = [
      new Boss(
        125,
        plateforms[0].position.y - 135,
        0,
        canvas.width,
        10,
        bossSprite,
        spriteX
      ),
    ];

    item = [];

    spikes = [];

    movingEnemies = [];

    // used to define an objectif to finish a level
    scrollOffset = 0;
  }

  // canvas refresh
  function refresh() {
    requestAnimationFrame(refresh);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      // update time
      then = now - (delta % interval);
      choixAffichage();
    }
  }

  // animate the correct screen depending on the gameState
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
      case STATE_PLAYERSELECTION:
        animatePlayerSelection();
        break;
      case STATE_END:
        animateEnding();
        break;
    }
  }

  // init the start of the game and the elapsed time
  let startTime = 0; 
  let elapsedTime = 0; 

  // start the timer when the game starts
  function startTimer() {
    startTime = Date.now(); 
  }

  // to refresh in real time the player position
  function animate() {
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // time management
    const currentTime = Date.now();
    elapsedTime = Math.floor((currentTime - startTime) / 1000); // Temps en secondes
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

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

      // update the position of the moving enemies
      MovingEnemy.updatePosition();
      MovingEnemy.draw(c);
    });

    if (currentLevel === 5) {
      bosses.forEach((boss) => {
        boss.draw(c);
        // if the boolean is true, the boss can move and is not attackable
        if (isBossUpdateVerticalAllowed) {
          boss.updateVertical();
          checkMovingBossCollision(player, boss);
        }
        // if the boolean is false, the boss can't move and is attackable
        if (!isBossUpdateVerticalAllowed) {
          checkPlayerBossStaticCollision(player, boss);
        }

        if (Math.abs(boss.position.x + boss.width == 890) && countHitBoss === 0) {
          //boss.max = 890;
          maxReachedCounter++;
        } else if (Math.abs(boss.position.x + boss.width == 506) && countHitBoss === 1)  {
          //boss.max = 500;
          maxReachedCounter++;
        } else if (Math.abs(boss.position.x + boss.width == 310) && countHitBoss === 2) {
          //boss.max = 308;
          maxReachedCounter++;
        }

        // if the boss reached the max position, he can't move for 3 seconds
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

    // handle the automatic jump of the player when he gets top of an enemy
    if (isPlayerOnEnemy) {
      if (player.velocity.y === 0) {
        isPlayerOnEnemy = false;
        player.velocity.y -= 12;
      }
    }

    player.update(c, canvas, gravity);

    // static level for the boss
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
      // if the keys are pressed, the velocity of the player is updated
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

    // handle collision between the player and the plateforms
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

    // handle the collision between the player and the moving enemies
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

    // handle the collision between the player and the boss
    bosses.forEach((Boss, index) => {
      // to be able to hit the boss only once per jump
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
          if (countHitBoss === 1) {
            bosses.splice(index, 1);
            player.velocity.y = 0;
            isPlayerOnEnemy = true;

            setTimeout(() => {
              gameState = STATE_END;
              initEnding();
            }, 3000);
          }
        } else {
          isPlayerOnEnemy = false;
        }
      }
    });

    if (player.position.y > canvas.height) {
      if (currentLevel === 1) 
        initlevel1();
      else if (currentLevel === 2) 
        initlevel2();
      else if (currentLevel === 3) 
        initlevel3();
      else if (currentLevel === 4) 
        initlevel4();
      else if (currentLevel === 5) 
        initlevelFinal();
    }

    // display the time
    c.fillStyle = "white";
    c.font = "20px Arial";
    c.fillText("Time: " + formattedTime, 20, 30);

    // display the items
    drawItem(patePizzaImg, itemIndices.dough, 10);
    drawItem(sauce, itemIndices.sauce, 70);
    drawItem(mozzarellaImg, itemIndices.mozzarella, 130);
    drawItem(prosciuttoImg, itemIndices.prosciutto, 190);

    // overlay for the level transition
    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
  }

  // to launch the menu page when the game is launched
  function animateMenu() {
    animate_class.animateMenu(menuBackground, buttons, titleGame, gameState);
    initMenu();
  }

  // to launch the how to play page
  function animateHowToPlay() {
    animate_class.animateHowToPlay(BackgroundhowToPlay, buttons, gameState);
  }

  // to launch the highscore page
  function animateHighscore() {
    animate_class.animateHowToPlay(Backgroundhighscore, buttons, gameState);
  }

  // to launch the player selection page
  function animatePlayerSelection() {
    animate_class.animatePlayerSelection(BackgroundPlayerSelection,buttons,gameState);
  }

  // to launch the ending page
  function animateEnding() {
    animate_class.animateHowToPlay(BackgroundEnding, buttons, gameState);
  }

  // keys assignment for the movements when key is pressed
  window.addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
      case 65:
        keys.left.pressed = true;
        spriteY = 2;
        if (player.spriteY !== 2) player.spriteY = 2;
        break;
      case 68:
        keys.right.pressed = true;
        spriteY = 1;
        if (player.spriteY !== 1) player.spriteY = 1;
        break;
      case 87:
        keys.up.pressed = true;
        spriteY = 3;
        if (player.spriteY !== 3 && player.velocity.y === 0) player.spriteY = 3;
        if ((player.velocity.y === 0 || isPlayerOnEnemy) && !isPlayerOnEnemy) player.velocity.y -= 12;
        break;
    }
  });

  // keys assignment for the movements when key is released
  window.addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
      case 65:
        keys.left.pressed = false;
        if (!keys.right.pressed) player.spriteY = 0;
        break;
      case 68:
        keys.right.pressed = false;
        if (!keys.left.pressed) player.spriteY = 0;
        break;
      case 87:
        keys.up.pressed = false;
        if (!keys.left.pressed && !keys.right.pressed) player.spriteY = 0;
        if (keys.left.pressed) player.spriteY = 2;
        if (keys.right.pressed) player.spriteY = 1;
        break;
    }
  });
  refresh();
});
