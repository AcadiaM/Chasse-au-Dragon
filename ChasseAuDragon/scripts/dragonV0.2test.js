// 0.1 Jeu Plateforme ajout des objets: skater au dimensions de 25X50
// 0.1 Jeu Plateforme avec déplacement du skater avec flèches du clavier gauche, droite en utilisant la physique
// 0.1 Jeu Plateforme avec déplacement du skater dans les limites du jeu
// 0.1 Préparation de la boucle jouer et la variable jouer = true
// 0.1 Préparation de la function arreterJeu

var jeu = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: chargement, create: creation, update: repetition});
var monDragon;
var fleches;
var jouer = false;


function chargement(){
    //cle, ensuit le chemin ou est l'image
    jeu.load.image('monDragon', 'ressources/images/dragon_bleu.png');

}

function creation(){
    jeu.physics.startSystem(Phaser.Physics.ARCADE);
    //Position x et y, cle
    monDragon = jeu.add.sprite(400,300, 'monDragon');
    monDragon.anchor.setTo(0.5,0.5);
    jeu.physics.enable(monDragon, Phaser.Physics.ARCADE);

    monDragon.body.collideWorldBounds = true;

    monDragon.body.velocity.setTo(0,200);

    jeu.physics.arcade.gravity.y = 250

    monDragon.body.bounce.y = 0.2;

    fleches = jeu.input.keyboard.createCursorKeys();
}

debuter();

function repetition(){
    if (jouer){

        monDragon.body.velocity.x = 0;

        if (fleches.left.isDown){

            monDragon.body.velocity.x = -200;
            monDragon.scale.setTo(-1,1);

        }
        else if (fleches.right.isDown){

            monDragon.body.velocity.x = 200;
            monDragon.scale.setTo(1,1);

        }

        else{

            monDragon.body.velocity.x = 0;

        }

    }
}

function debuter(){
    jouer = true;
}

function arreterJeu(){
    jouer = false;
}