// 0.1 Jeu Plateforme ajout des objets: skater au dimensions de 25X50
// 0.1 Jeu Plateforme avec déplacement du skater avec flèches du clavier gauche, droite en utilisant la physique
// 0.1 Jeu Plateforme avec déplacement du skater dans les limites du jeu
// 0.1 Préparation de la boucle jouer et la variable jouer = true
// 0.1 Préparation de la function arreterJeu
// 0.2 Utiliser la touche d'espacement pour sauter
// 0.3 Préparer un bloc pour plateforme et charger le sprite sans le faire afficher maintenant à l'écran. Le sprite bloc est 25X25
// 0.3 VIDÉO: Faire un array qui sera la carte de mon jeu avec le sprite bloc. Pour un écran de 800X600, je peux avoir 32 X 24 blocs (arrayPlateforme.mp4)
// 0.3 Faire afficher le sprite bloc sur le world selon mon array qui représente ma carte 
// 0.3 Dessiner une clé ou autre objet sur piskel de 25X25et l'ajouter comme un 2
// 0.3 Utiliser Groups:Add a sprite to group ... utiliser physicsGroup comme dans la vidéo arrayPlateforme.
// 0.4 Activer la clé pour qu'on puisse interagir avec.
// 0.4 Arrêter le jeu lorsque la clé touché
// 0.5 Ajouter les archers

var jeu = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: chargement, create: creation, update: repetition});
var monDragon;
var fleches;
var jouer = false;
var carte;
var plateforme;
var mesPlateformes;
var gemme;
var archer;
var archer2;
var archer3;
var archer4;
var archer5;
var archer6;


function chargement(){
    //cle, ensuit le chemin ou est l'image
    jeu.load.image('background' , 'ressources/images/background.png');
    jeu.load.image('monDragon', 'ressources/images/dragon_bleu.png');
    jeu.load.image('plateforme', 'ressources/images/block_plateforme.png');
    jeu.load.image('gemme', 'ressources/images/gemme.png');
    jeu.load.image('archer', 'ressources/images/archer.png');
    jeu.load.image('archer2', 'ressources/images/archer_2.png');
    jeu.load.image('archer3', 'ressources/images/archer_3.png');
    jeu.load.image('archer4', 'ressources/images/archer_4.png');
    jeu.load.image('archer5', 'ressources/images/archer_5.png');
    jeu.load.image('archer6', 'ressources/images/archer_6.png');
}

function creation(){
    jeu.add.tileSprite(0, 0, 800, 600, 'background');
    jeu.physics.startSystem(Phaser.Physics.ARCADE);
    //Position x et y, cle
    monDragon = jeu.add.sprite(400,600, 'monDragon');
    monDragon.anchor.setTo(0.5,0.5);
    jeu.physics.enable(monDragon, Phaser.Physics.ARCADE);

    gemme = jeu.add.sprite('gemme');
    gemme.anchor.setTo(0.5,0.5);

    archer = jeu.add.sprite('archer');
    archer2 = jeu.add.sprite('archer2');
    archer3 = jeu.add.sprite('archer3');
    archer4 = jeu.add.sprite('archer4');
    archer5 = jeu.add.sprite('archer5');
    archer6 = jeu.add.sprite('archer6');

    monDragon.body.collideWorldBounds = true;

    monDragon.body.velocity.setTo(0,200);

    jeu.physics.arcade.gravity.y = 350;

    monDragon.body.bounce.y = 0.2;

    fleches = jeu.input.keyboard.createCursorKeys();

    mesPlateformes = jeu.add.physicsGroup();

    var largeur = 25; //ceci represente la largeur de mon bloc
    var hauteur = 25; //ceci represente l'hauteur de mon bloc

this.carte = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,3,0,0],
    [0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

for (let y = 0; y <this.carte.length; y++){
	//le y reprsente la position y du bloc alors il fera la position 0 en premier avec tous les x
	//ensuit il fera la position y de 25 puisque posY - 1 X 25, donc deuxieme ligne de 25 pixels
	//ensuite 3e ligne..
	for (let x = 0; x < this.carte[y].length; x++){
		//le premier posX va etre 0 x 25 alors s'il contient un 1, il va placer a la position x de 0
		//le 2e posX sera 1 alors 1x25 alors s'il contient un 1, il va placer a la position x de 25
		//le 3e posX sera 2 alors 2 x 25 alor s'il contient un 1, il va placer a la position x de 50
		// ... il continu avec 2 , 5, 6, jusqu'a la longeur du tableau
		let posX = x * largeur;
		let posY = y * hauteur;
	
		if (this.carte [y][x] == 1){
			plateforme = jeu.add.sprite(posX, posY, "plateforme");
			mesPlateformes.add(plateforme);
			plateforme.body.immovable = true;
			plateforme.body.allowGravity = false;
		}
		else if (this.carte [y][x] == 2){
			gemme = jeu.add.sprite(posX, posY, "gemme");
            gemme.anchor.setTo(0.5,0.5);
            jeu.physics.enable(gemme, Phaser.Physics.ARCADE);
            gemme.body.collideWorldBounds = true;
		}
        else if (this.carte [y][x] == 3){
            archer = jeu.add.sprite(posX, posY, 'archer');
            archer.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer, Phaser.Physics.ARCADE);
            archer.body.collideWorldBounds = true;
        }
        else if (this.carte [y][x] == 4){
            archer2 = jeu.add.sprite(posX, posY, 'archer2');
            archer2.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer2, Phaser.Physics.ARCADE);
            archer2.body.collideWorldBounds = true;
        }
        else if (this.carte [y][x] == 5){
            archer3 = jeu.add.sprite(posX, posY, 'archer3');
            archer3.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer3, Phaser.Physics.ARCADE);
            archer3.body.collideWorldBounds = true;
        }
        else if (this.carte [y][x] == 6){
            archer4 = jeu.add.sprite(posX, posY, 'archer4');
            archer4.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer4, Phaser.Physics.ARCADE);
            archer4.body.collideWorldBounds = true;
        
        }
        else if (this.carte [y][x] == 7){
            archer5 = jeu.add.sprite(posX, posY, 'archer5');
            archer5.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer5, Phaser.Physics.ARCADE);
            archer5.body.collideWorldBounds = true;
        }
        else if (this.carte [y][x] == 8){
            archer5 = jeu.add.sprite(posX, posY, 'archer5');
            archer5.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer5, Phaser.Physics.ARCADE);
            archer5.body.collideWorldBounds = true;
        }
        else if (this.carte [y][x] == 9){
            archer6 = jeu.add.sprite(posX, posY, 'archer6');
            archer6.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer6, Phaser.Physics.ARCADE);
            archer6.body.collideWorldBounds = true;
        }
	}
}

}

debuter();

function repetition(){
    if (jouer){

        jeu.physics.arcade.collide(monDragon, mesPlateformes);
        jeu.physics.arcade.collide(gemme, mesPlateformes);
        jeu.physics.arcade.collide(monDragon, archer2);
        jeu.physics.arcade.collide(archer2, gemme);
        jeu.physics.arcade.collide(archer, mesPlateformes);
        jeu.physics.arcade.collide(archer2, mesPlateformes);
        jeu.physics.arcade.collide(archer3, mesPlateformes);
        jeu.physics.arcade.collide(archer4, mesPlateformes);
        jeu.physics.arcade.collide(archer5, mesPlateformes);
        jeu.physics.arcade.collide(archer6, mesPlateformes);

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

        if (fleches.up.isDown){
            monDragon.body.velocity.y = -220;

        }

    }
    gagner();
}

function debuter(){
    jouer = true;
}

function arreterJeu(){
    jouer = false;
}

function gagner(){
    if (jeu.physics.arcade.overlap(monDragon, gemme)){
        arreterJeu();
        gemme.kill();
    }
}