//import les class
import Plateform from "./Class/Plateform.js";
import GenericObject from "./Class/GenericObject.js";
import Player from "./Class/Player.js";
import Spikes from "./Class/Spikes.js";
import MovingEnemy from "./Class/MovingEnemy.js";
// ajout des images 
const siteURL = "http://127.0.0.1:5500/Group%20E/game/htdocs/";
const plateformFont = new Image();
const mainBackGround = new Image();
const tinyPlateformFont = new Image();
const playerFont = new Image();
const spikesImg = new Image();
const desertBackground = new Image();
desertBackground.src = siteURL + "/img/desertBackgroundLarge.png"
spikesImg.src = siteURL + "/img/spikes.png";
playerFont.src = siteURL + "/img/sprite.png";
plateformFont.src = siteURL + "/img/platform.png";
mainBackGround.src = siteURL + "/img/BG_large.png";
tinyPlateformFont.src = siteURL + "/img/platform.png"


// Setup pour link le JS avec HTMLA
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    console.log(c)

    // defini Le canvas avec la taille de la fenetre
    canvas.width = 1024
    canvas.height = 576

    let spriteX = 0;
    let spriteY = 0;
    let gameFrame = 0;
    const staggerFrames = 20;
    
    // création de l'objet player
    let player = new Player(playerFont, spriteX, spriteY, gameFrame, staggerFrames)


    let currentLevel = 1;


    // création de l'objet plateform
    let plateforms = []

    // création de l'objet concernant le BackGround
    let genericObjects = []

    // création de l'objet enemies
    let spikes = [];

    // création objet Moving Moving Enemy
    let movingEnemies = [];
    let movingEnemiesY = []

    

    

    // Set l'accélération lorsque le player tombe
    const gravity = 0.4;

    let isPlayerOnEnemy = false;

    //for sprite animation


    // création Objet Keys
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    }

     // variable qui permettra de définir un objectif pour finir un niveau par exemple
     let scrollOffset = 0


    function checkPlayerEnemyCollision(player, enemy) {
    // Vérifie s'il y a une collision en X
    const Collision = (
        player.position.x + player.width / 1.2 > enemy.position.x &&
        player.position.x  * 1.1 < enemy.position.x + enemy.width


        && player.position.y + player.height > enemy.position.y &&
        player.position.y  < enemy.position.y + enemy.height 
    );
    // La condition se déclenche si les deux collisions (X et Y) sont vraies
    if (Collision) {
        console.log("");
    
        if (currentLevel === 1) {
            initlevel1();
        } else if (currentLevel === 2) {
            initlevel2();
        }
    }
    }

    function checkPlayerEnemyMovingCollision(player, MovingEnemy) {
        const Collision = (
            player.position.x + player.width > MovingEnemy.position.x &&
            player.position.x < MovingEnemy.position.x + MovingEnemy.width 
    
            // code pour la hauteur
            && player.position.y + player.height > MovingEnemy.position.y + 1 &&
            player.position.y  < MovingEnemy.position.y + MovingEnemy.height 
        );
        // La condition se déclenche si les deux collisions (X et Y) sont vraies
        if (Collision) {
        console.log("");
    
        if (currentLevel === 1) {
            initlevel1();
        } else if (currentLevel === 2) {
            initlevel2();
        }
    }

        }

        




    // permet de respawn après être tombé (même code que les ligne 108 - 143)
    function initlevel1() {

        // création de l'objet player
        player = new Player(playerFont, spriteX, spriteY, gameFrame, staggerFrames)

        // création de l'objet plateform
        plateforms = [
            new Plateform({ x: 0, y: 350, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 2 - 350, y: 470, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 2, y: 305, image: tinyPlateformFont }),
            new Plateform({ x: plateformFont.width * 3.2, y: 420, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 3.8, y: 300, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 5.3, y: 300, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 6.7, y: 300, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 8.25, y: 300, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 9.8, y: 300, image: plateformFont })
        ]

        // création de l'objet concernant le BackGround
        genericObjects = [new GenericObject({
            x: 0,
            y: 0,
            image: mainBackGround
            })
        ]

        spikes = [
            // TODO change the hardcoding
            new Spikes(plateforms[4].position.x+150, plateforms[4].position.y - 50, spikesImg),
            new Spikes(plateforms[5].position.x+240, plateforms[5].position.y - 50, spikesImg),
            new Spikes(plateforms[5].position.x+290, plateforms[5].position.y - 50, spikesImg)
        ];

        movingEnemies = [
            new MovingEnemy (plateforms[1].position.x+240, plateforms[1].position.y - 80,'vertical',200,400,0,1),
            new MovingEnemy(plateforms[0].position.x+240, plateforms[0].position.y - 80,'horizontal',plateforms[0].position.x,plateforms[0].position.x+plateforms[0].width,1,0)
        ]



        

       

        // variable qui permettra de définir un objectif pour finir un niveau par exemple
        scrollOffset = 0
    }

    function initlevel2() {

        // création de l'objet player
        player = new Player(playerFont, spriteX, spriteY, gameFrame, staggerFrames)

        // création de l'objet plateform
        plateforms = [
            new Plateform({ x: 0, y: 350, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 2 - 350, y: 500, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 2, y: 500, image: tinyPlateformFont }),
            new Plateform({ x: plateformFont.width * 3.2, y: 500, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 3.8, y: 500, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 5.3, y: 500, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 6.7, y: 500, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 8.25, y: 500, image: plateformFont }),
            new Plateform({ x: plateformFont.width * 9.8, y: 500, image: plateformFont })
        ]

        // création de l'objet concernant le BackGround
        genericObjects = [new GenericObject({
            x: 0,
            y: 0,
            image: desertBackground
            })
        ]

        spikes = [
            // TODO change the hardcoding
            new Spikes(plateforms[4].position.x+150, plateforms[4].position.y - 50, spikesImg),
            new Spikes(plateforms[5].position.x+240, plateforms[5].position.y - 50, spikesImg),
            new Spikes(plateforms[5].position.x+290, plateforms[5].position.y - 50, spikesImg)
        ];

        movingEnemies = [
            new MovingEnemy (plateforms[1].position.x+240, plateforms[1].position.y - 80,'vertical',200,400,0,1),
            new MovingEnemy(plateforms[0].position.x+240, plateforms[0].position.y - 80,'horizontal',plateforms[0].position.x,plateforms[0].position.x+plateforms[0].width,1,0)
        ]



        

       

        // variable qui permettra de définir un objectif pour finir un niveau par exemple
        scrollOffset = 0
    }

    // permet de refresh en temps réel la position du player (evite que le player se déplace à l'infini dès qu'une touche est enfoncé)
    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)

        genericObjects.forEach(genericObject => {
            genericObject.draw(c)

        });

        plateforms.forEach((plateform) => {
            plateform.draw(c)

        });
        
        spikes.forEach((spikes) => {
            checkPlayerEnemyCollision(player,spikes)
            spikes.draw(c);
        });
        
        movingEnemies.forEach((MovingEnemy) => {
            checkPlayerEnemyMovingCollision(player,MovingEnemy)
            
            // Mettez à jour la position horizontale du MovingEnemy
            MovingEnemy.updatePosition();
            MovingEnemy.draw(c);
        });

       



        // Gérer le saut automatique si le joueur est sur l'ennemi
        if (isPlayerOnEnemy) {
        if (player.velocity.y === 0) {
            isPlayerOnEnemy = false
            player.velocity.y -= 12;
        }
    }

        player.update(c,canvas,gravity)


        // si la touche est enfoncé déplacement de 5 sinon 0
        // le 400 et 100 réprésentent les positions que le joueurs ne peut pas dépassé
        if (keys.right.pressed && player.position.x < 400) {
            player.velocity.x = player.speed
            spriteY = 1;

        } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
            player.velocity.x = -player.speed

        } else {
            player.velocity.x = 0
            // permet de donner l'illusion que les plateformes se déplacent lorsque le joueur bouge
            if (keys.right.pressed) {
                spriteY = 0;
                scrollOffset += player.speed
                plateforms.forEach((plateform) => {
                    plateform.position.x -= player.speed
                })

                genericObjects.forEach(genericObject => {
                    genericObject.position.x -= player.speed * 0.66
                })

                spikes.forEach((spikes) => {
                    spikes.position.x -= player.speed
                })

                movingEnemies.forEach((MovingEnemy) => {
                    if(MovingEnemy.movementType==='horizontal'){
                        MovingEnemy.min -= player.speed
                        MovingEnemy.max -= player.speed
                    }

                        MovingEnemy.position.x -= player.speed
                    
                })



            } else if (keys.left.pressed && scrollOffset > 0) {
                scrollOffset -= player.speed
                plateforms.forEach((plateform) => {
                    plateform.position.x += player.speed
                })
                genericObjects.forEach(genericObject => {
                    genericObject.position.x += player.speed * 0.66
                })
                spikes.forEach((spikes) => {
                    spikes.position.x += player.speed
                })
                movingEnemies.forEach((MovingEnemy) => {
                    if(MovingEnemy.movementType==='horizontal'){
                        MovingEnemy.min += player.speed
                        MovingEnemy.max += player.speed
                    }
                    MovingEnemy.position.x += player.speed
                })

            }
        }

        // gère la collision du joueur avec les plateformes
        plateforms.forEach((plateform) => {
            if (
                player.position.y + player.height <= plateform.position.y && player.position.y
                + player.height + player.velocity.y >= plateform.position.y &&
                player.position.x + player.width  >= plateform.position.x &&
                player.position.x <= plateform.position.x + plateform.width
            ) {
                player.velocity.y = 0
            }
        })
        // gère les collision du joueur avec les Moving Enemy
        movingEnemies.forEach((MovingEnemy,index) => {
            if (
                player.position.y + player.height <= MovingEnemy.position.y && player.position.y
                + player.height + player.velocity.y >= MovingEnemy.position.y &&
                player.position.x + player.width  >= MovingEnemy.position.x &&
                player.position.x <= MovingEnemy.position.x + MovingEnemy.width
            ) {
                movingEnemies.splice(index,1)
                player.velocity.y = 0
                isPlayerOnEnemy = true;
            }
            else{
                isPlayerOnEnemy = false;
            }
        })

        if (player.position.y > canvas.height) {
            if (currentLevel === 1) {
                initlevel1();
            } else if (currentLevel === 2) {
                initlevel2();
            }
        }
        if (scrollOffset > 5000) {
            console.log('you win');

            // Passez au niveau suivant
            currentLevel++; // Augmentez le niveau actuel de 1.

            // Réinitialisez le niveau correspondant
            if (currentLevel === 2) {
                initlevel2();
            } else {
                initlevel1(); // Par défaut, retournez au niveau 1 si le niveau n'est pas défini.
            }

        }
        
        // Win condition vraiment la base pour réussi un niveau
        if (scrollOffset > 2000) {
            console.log('you win')
        }

       
    }


    // assignation des touches pour les déplacements QUAND TOUCHE ENFONCE
    window.addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                console.log('left')
                keys.left.pressed = true
                break
            case 83:
                console.log('down')
                break
            case 68:
                console.log('right')
                keys.right.pressed = true
                break
            case 87:
                console.log('up')
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
                break
            case 83:
                console.log('down')
                break
            case 68:
                console.log('right')
                keys.right.pressed = false
                break
            case 87:
                console.log('up')
                break
        }
    })

    initlevel1()
    animate()
})