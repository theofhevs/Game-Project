//import les class
import Plateform from "./Class/Plateform.js";
import GenericObject from "./Class/GenericObject.js";
import Player from "./Class/Player.js";
import Spikes from "./Class/Spikes.js";
import MovingEnemy from "./Class/MovingEnemy.js";
import Mozzarella from "./Class/Mozzarella.js"
// ajout des images
const siteURL = "http://127.0.0.1:5500/Group%20E/game/htdocs/";
const plateformFont = new Image();
const mainBackGround = new Image();
const tinyPlateformFont = new Image();
const playerFont = new Image();
const spikesImg = new Image();
const desertBackground = new Image();
const plateformVenise = new Image();
const cityBackground = new Image();
const mozzarellaImg = new Image();
const chefEnemy = new Image();
const burgerEnemy = new Image();
chefEnemy.src = siteURL + "/img/chefSprite.png";
burgerEnemy.src = siteURL + "/img/burgerSprite.png";
mozzarellaImg.src = siteURL + "/img/mozzarella.png";
cityBackground.src = siteURL + "/img/italianCityLarge.png";
desertBackground.src = siteURL + "/img/desertBackgroundLarge.png";
spikesImg.src = siteURL + "/img/spikes.png";
playerFont.src = siteURL + "/img/sprite.png";
plateformFont.src = siteURL + "/img/platform.png";
mainBackGround.src = siteURL + "/img/BG_large.png";
tinyPlateformFont.src = siteURL + "/img/platform.png";
plateformVenise.src = siteURL + "/img/platformVenise.png";

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
    opacity:0,
  }

  // création de l'objet player
  let player = new Player(
    playerFont,
    spriteX,
    spriteY
  );

  let currentLevel = 1;

  let startTime = 0; // Initialisez le temps de départ
  let elapsedTime = 0; // Initialisez le temps écoulé

  // création de l'objet mozzarella
  let mozzarella = []

  const mozzarellaOpacities = [0.3, 0.3];

  // création de l'objet plateform
  let plateforms = [];

  // création de l'objet concernant le BackGround
  let genericObjects = [];

  // création de l'objet enemies
  let spikes = [];

  // création objet Moving Moving Enemy
  let movingEnemies = [];
  let movingEnemiesY = [];

  // Set l'accélération lorsque le player tombe
  const gravity = 0.4;

  let isPlayerOnEnemy = false;

  // création Objet Keys
  const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up : {
        pressed: false
    }
  }

  // variable qui permettra de définir un objectif pour finir un niveau par exemple
  let scrollOffset = 0;

  // Ajoutez cette variable de verrouillage
  let isIncrementingLevel = false; 

//création item pas encore collecté
function drawMozzarellaIcon() {
    const iconSize = 50; // Taille de l'icône de mozzarella
    const x = canvas.width - iconSize - 10; // Ajustez 10 pour un espace entre l'icône et le bord
    const y = 10; // Ajustez cette valeur selon votre préférence
    const opacity1 = mozzarellaOpacities[currentLevel - 1];

    c.globalAlpha = opacity1;
c.drawImage(mozzarellaImg, x, y, iconSize, iconSize);
c.globalAlpha = 1.0;
}

function checkPlayerItemCollision(player, item) {
       
    // Vérifie s'il y a une collision en X
    const CollisionItem = (
        player.position.x + player.width / 1.2 > item.position.x &&
        player.position.x  * 1.1 < item.position.x + item.width


        && player.position.y + player.height > item.position.y &&
        player.position.y  < item.position.y + item.height 
    );
    //Vérifiez le verrouillage ici
    if(CollisionItem && !isIncrementingLevel) {
        isIncrementingLevel = true;// Définissez le verrouillage pour éviter l'incrémentation multiple
    
            console.log(currentLevel)
            gsap.to(overlay, {
                opacity : 1,
                onComplete: ()=>{
                    currentLevel++;
                    // Réinitialisez le niveau correspondant
                        if (currentLevel === 1) {
                            initlevel1();
                        } else if (currentLevel === 2) {
                            initlevel2();
                        } else if (currentLevel === 3) {
                            initlevel3();
                        } else if (currentLevel === 4) {
                            initlevelFinal();
                        }
                    gsap.to(overlay, {
                        opacity : 0,
                        onComplete: () => {
                            isIncrementingLevel = false; // Réinitialisez le verrouillage après l'animation
                        },
                    })
                }
            })
            
         

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
        initlevelFinal();
      }
    }
  }

  // permet de respawn après être tombé (même code que les ligne 108 - 143)
  function initlevel1() {
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
        200,plateforms[1].position.y,0,1, burgerEnemy,spriteX),
      new MovingEnemy(
        plateforms[0].position.x + 240,
        plateforms[0].position.y - 80,
        "horizontal",plateforms[0].position.x,plateforms[0].position.x+plateforms[0].width,1,0, chefEnemy,spriteX),
    ];

    mozzarella = [
        new Mozzarella(plateforms[1].position.x+290, plateforms[1].position.y - 50, mozzarellaImg)
    ]

    mozzarellaOpacities[0] = 0.3;
        // Dessine l'icône de mozzarella en haut à droite
        drawMozzarellaIcon(0.3);

    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  function initlevel2() {
    // création de l'objet player
    player = new Player(playerFont, spriteX, spriteY);

    // création de l'objet plateform
    plateforms = [
      new Plateform({ x: 0, y: 350, image: plateformFont }),
      new Plateform({
        x: plateformFont.width * 2 - 350,
        y: 500,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 2,
        y: 500,
        image: tinyPlateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 3.2,
        y: 500,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 3.8,
        y: 500,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 5.3,
        y: 500,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 6.7,
        y: 500,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 8.25,
        y: 500,
        image: plateformFont,
      }),
      new Plateform({
        x: plateformFont.width * 9.8,
        y: 500,
        image: plateformFont,
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
        200,plateforms[1].position.y,
        0,
        1, burgerEnemy,spriteX),
      new MovingEnemy(
        plateforms[0].position.x + 240,
        plateforms[0].position.y - 80,
        "horizontal",
        plateforms[0].position.x,
        plateforms[0].position.x + plateforms[0].width,
        1,
        0,chefEnemy,spriteX
      ),
    ];

    mozzarella = [
        new Mozzarella(plateforms[1].position.x+290, plateforms[1].position.y - 50, mozzarellaImg)
    ]
    
    mozzarellaOpacities[1] = 2.5;
         // Dessine l'icône de mozzarella en haut à droite
        drawMozzarellaIcon(2);

    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  function initlevelFinal() {
    // création de l'objet player
    player = new Player(playerFont, spriteX, spriteY);

    // création de l'objet plateform
    plateforms = [
      new Plateform({ x: 0, y: 400, image: plateformFont }),
      new Plateform({ x: plateformFont.width, y: 400, image: plateformFont }),
    ];

    // création de l'objet concernant le BackGround
    genericObjects = [
      new GenericObject({
        x: 0,
        y: 0,
        image: desertBackground,
      }),
    ];
    mozzarella = [
   ]

    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  function initlevel3() {
    // création de l'objet player
    player = new Player(playerFont, spriteX, spriteY);

    // création de l'objet plateform
    plateforms = [
      new Plateform({ x: 0, y: 350, image: plateformVenise }),
      new Plateform({
        x: plateformVenise.width * 2 - 350,
        y: 500,
        image: plateformVenise,
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
        1, burgerEnemy,spriteX
      ),
      new MovingEnemy(
        plateforms[0].position.x + 240,
        plateforms[0].position.y - 80,
        "horizontal",
        plateforms[0].position.x,
        plateforms[0].position.x + plateforms[0].width,
        1,
        0,chefEnemy,spriteX
      ),
    ];

    mozzarella = [
        new Mozzarella(plateforms[1].position.x+290, plateforms[1].position.y - 50, mozzarellaImg)
    ]

    // variable qui permettra de définir un objectif pour finir un niveau par exemple
    scrollOffset = 0;
  }

  // permet de refresh en temps réel la position du player (evite que le player se déplace à l'infini dès qu'une touche est enfoncé)
  function animate(currentTime) {
    requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (!startTime) {
        startTime = currentTime;
    }
      elapsedTime = Math.floor((currentTime - startTime) / 1000); // Temps en secondes
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


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

    mozzarella.forEach((mozzarella) => {
        checkPlayerItemCollision(player,mozzarella)
        mozzarella.draw(c);
    });

    movingEnemies.forEach((MovingEnemy) => {
      checkPlayerEnemyMovingCollision(player, MovingEnemy);

      // Mettez à jour la position horizontale du MovingEnemy
      MovingEnemy.updatePosition();
      MovingEnemy.draw(c);
    });

    // Gérer le saut automatique si le joueur est sur l'ennemi
    if (isPlayerOnEnemy) {
      if (player.velocity.y === 0) {
        isPlayerOnEnemy = false;
        player.velocity.y -= 12;
      }
    }

    player.update(c, canvas, gravity);

    // permet de mettre en place un niveau static pour le BossFinal
    if (currentLevel === 4) {
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
          mozzarella.forEach((mozzarella) => {
            mozzarella.position.x -= player.speed
        })

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
          mozzarella.forEach((mozzarella) => {
            mozzarella.position.x += player.speed
        })
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

    if (player.position.y > canvas.height) {
      if (currentLevel === 1) {
        initlevel1();
      } else if (currentLevel === 2) {
        initlevel2();
      } else if (currentLevel === 3) {
        initlevel3();
      } else if (currentLevel === 4) {
        initlevelFinal();
      }
    }
    
    // Affichage du temps à l'écran
    c.fillStyle = 'white';
    c.font = '20px Arial';
    c.fillText('Time: ' + formattedTime, 20, 30);
        
    // Dessine l'icône de mozzarella en haut à gauche
    drawMozzarellaIcon();

    //overlay pour changement de niveau
    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    c.restore()
     

    }

  // assignation des touches pour les déplacements QUAND TOUCHE ENFONCE
  window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            spriteY = 2;
            if (player.spriteY !== 2)
                player.spriteY = 2;
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            spriteY = 1;
            if (player.spriteY !== 1)
                player.spriteY = 1;
            break
        case 87:
            console.log('up')
            keys.up.pressed = true
            spriteY = 3;
            if (player.spriteY !== 3 && player.velocity.y === 0)
                player.spriteY = 3;
            if ((player.velocity.y === 0 || isPlayerOnEnemy) && !isPlayerOnEnemy)
                player.velocity.y -= 12
            break
    }
})

// assignation des touches pour les déplacements QUAND TOUCHE RELACHE
window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            if (!keys.right.pressed)
                player.spriteY = 0;  
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            if (!keys.left.pressed)
                player.spriteY = 0;  
            break
        case 87:
            console.log('up')
            keys.up.pressed = false
            if(!keys.left.pressed && !keys.right.pressed)
                player.spriteY = 0;
            if (keys.left.pressed)
                player.spriteY = 2;  
            if (keys.right.pressed)
                player.spriteY = 1;  
            break
    }
})

  initlevel1();
  animate();
});
