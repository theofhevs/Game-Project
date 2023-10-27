import Plateform from "./Class/Plateform.js";
import GenericObject from "./Class/GenericObject.js";
import Player from "./Class/Player.js";
import Enemy from "./Class/Enemy.js";
// ajout des images 
const siteURL = "http://localhost/";
const plateformFont = new Image();
const mainBackGround = new Image();
const tinyPlateformFont = new Image();
const playerFont = new Image();
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

    let spriteFrame = 0;
    let gameFrame = 0;
    const staggerFrames = 5;
    
    // création de l'objet player
    let player = new Player(playerFont, spriteFrame, gameFrame, staggerFrames)

   
    // création de l'objet plateform
    let plateforms = []

    // création de l'objet concernant le BackGround
    let genericObjects = []

    // création de l'objet enemies
    let enemies = [];

    // Set l'accélération lorsque le player tombe
    const gravity = 0.4

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
        player.position.x + player.width > enemy.position.x &&
        player.position.x < enemy.position.x + enemy.width 


        && player.position.y + player.height > enemy.position.y - 1 &&
        player.position.y  < enemy.position.y + enemy.height 
    );
    // La condition se déclenche si les deux collisions (X et Y) sont vraies
    if (Collision ) {
        console.log("C'est carré le S")
        init()
        }
    }


    // permet de respawn après être tombé (même code que les ligne 108 - 143)
    function init() {

        // création de l'objet player
        player = new Player(playerFont, spriteFrame, gameFrame, staggerFrames)

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

        console.log('Position de la deuxième plateforme :', plateforms[1].position.x, plateforms[1].position.y);
        // create an enemy at the same position as the third platform

        enemies = [
            // TODO changé le hardcoding pour le 40
            new Enemy(plateforms[5].position.x+240, plateforms[5].position.y - 80),
            new Enemy(plateforms[1].position.x+240, plateforms[1].position.y - 80)
            // Add more enemies as needed
        ];

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
        
        enemies.forEach((enemy) => {
            checkPlayerEnemyCollision(player,enemy)
            enemy.draw(c);
        });
        player.update(c,canvas,gravity)


        // si la touche est enfoncé déplacement de 5 sinon 0
        // le 400 et 100 réprésentent les positions que le joueurs ne peut pas dépassé
        if (keys.right.pressed && player.position.x < 400) {
            player.velocity.x = player.speed

        } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
            player.velocity.x = -player.speed

        } else {
            player.velocity.x = 0
            // permet de donner l'illusion que les plateformes se déplacent lorsque le joueur bouge
            if (keys.right.pressed) {
                scrollOffset += player.speed
                plateforms.forEach((plateform) => {
                    plateform.position.x -= player.speed
                })

                genericObjects.forEach(genericObject => {
                    genericObject.position.x -= player.speed * 0.66
                })

                enemies.forEach((enemy) => {
                    enemy.position.x -= player.speed
                })

            } else if (keys.left.pressed && scrollOffset > 0) {
                scrollOffset -= player.speed
                plateforms.forEach((plateform) => {
                    plateform.position.x += player.speed
                })
                genericObjects.forEach(genericObject => {
                    genericObject.position.x += player.speed * 0.66
                })
                enemies.forEach((enemy) => {
                    enemy.position.x += player.speed
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
        
        // Win condition vraiment la base pour réussi un niveau
        if (scrollOffset > 2000) {
            console.log('you win')
        }

        // lose condition (player tombe dans le vide)
        if (player.position.y > canvas.height)
            init()
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
                if (player.velocity.y === 0)
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

    init()
    animate()
})