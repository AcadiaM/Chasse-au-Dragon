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

var jeu = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: chargement, create: creation, update: repetition});
var monDragon;
var fleches;
var btnFeu;
var jouer = false;
var carte;
var plateforme;
var mesPlateformes;
var gemme;


function chargement(){
    //cle, ensuit le chemin ou est l'image
    jeu.load.image('background' , 'ressources/images/background.png');
    jeu.load.image('monDragon', 'ressources/images/dragon_bleu.png');
    jeu.load.image('plateforme', 'ressources/images/block_plateforme.png');
    jeu.load.image('gemme', 'ressources/images/gemme.png');

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

    monDragon.body.collideWorldBounds = true;

    monDragon.body.velocity.setTo(0,200);

    jeu.physics.arcade.gravity.y = 350;

    monDragon.body.bounce.y = 0.2;

    fleches = jeu.input.keyboard.createCursorKeys();
    btnFeu = jeu.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    mesPlateformes = jeu.add.physicsGroup();

    var largeur = 25; //ceci represente la largeur de mon bloc
    var hauteur = 25; //ceci represente l'hauteur de mon bloc

this.carte = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0],
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
	}
}

}

debuter();

function repetition(){
    if (jouer){

        jeu.physics.arcade.collide(monDragon, mesPlateformes);
        jeu.physics.arcade.collide(gemme, mesPlateformes);
        // jeu.physics.arcade.collide(monDragon, gemme);
        // jeu.physics.arcade.collide(gemme, monDragon);
        monDragon.body.velocity.x = 0;

        if (jeu.physics.arcade.overlap(monDragon, gemme)){
            arreterJeu();
            gemme.kill();

        }

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
}

function debuter(){
    jouer = true;
}

function arreterJeu(){
    jouer = false;
}

