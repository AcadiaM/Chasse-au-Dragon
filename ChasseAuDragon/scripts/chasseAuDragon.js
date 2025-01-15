//Auteur: Acadia Marchand, Le 31 decembre 2021
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
// 0.6 Ajouter les vies
// 0.6 Faire en sorte si tu frappe un archer tu perd un vie et s'il te rest 0 vies le jeu arrete
// 0.7 Ajouter les directives et les differents textes


//Les variables utiliser
var jeu = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: chargement, create: creation, update: repetition});

var monDragon; //Le sprite du dragon de 45 x 40

var fleches; //Les fleches de mouvement sur le clavier

var jouer = false; //Le jeux commence false a moins qu'il est egale a true

var carte; //La carte ou je place mes plateformes, les archers et la gemme

var plateforme; //Le sprite de la platforme de 25 x 25
var mesPlateformes; //Groupe physiques pour les plateformes

var gemme; //Le sprite de la gemme de 25 x 25
var maGemme; //Groupe Physique de la gemme

var archer; //Le sprite de l'archer de 30 x 50
var mesArchers; //Groupe physiques pour les archers
var archer2; //Le sprite de l'archer2 de 30 x 50
var archer3; //Le sprite de l'archer3 de 30 x 50
var archer4; //Le sprite de l'archer4 de 30 x 50
var archer5; //Le sprite de l'archer5 de 30 x 50
var archer6; //Le sprite de l'archer6 de 30 x 50

var vies = 2; //Le nombre de vies qu'a le dragon
var viesString = ''; //Le string pour les vies
var viesTexte //Le texte pour les vies

var btnDirectives; //La bouton que tu peux clicker pour commencer le jeux
var texteDirectives; //Le texte qui apparaitra sur le bouton

var gagnerTexte; //Le texte qui appraitra lorsque tu gagne :D

var perduTexte; //Le texte qui apparaitra lorsque tu perd :C


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
    jeu.load.image('bouton', 'ressources/images/bouton.png');
}

function creation(){

    jeu.add.tileSprite(0, 0, 800, 600, 'background');
    jeu.physics.startSystem(Phaser.Physics.ARCADE);


    //Position x et y, cle et ancrage du dragon
    monDragon = jeu.add.sprite(400,600, 'monDragon');
    monDragon.anchor.setTo(0.5,0.5);
    //Activer les physiques du dragon
    jeu.physics.enable(monDragon, Phaser.Physics.ARCADE);

    //Ajouter la gemme
    gemme = jeu.add.sprite('gemme');

    //Ajouter les archers
    archer = jeu.add.sprite('archer');
    archer2 = jeu.add.sprite('archer2');
    archer3 = jeu.add.sprite('archer3');
    archer4 = jeu.add.sprite('archer4');
    archer5 = jeu.add.sprite('archer5');
    archer6 = jeu.add.sprite('archer6');

    //Collision entre le dragon et les murs
    monDragon.body.collideWorldBounds = true;

    //Ajouter de la gravité
    jeu.physics.arcade.gravity.y = 1000;

    //Ajouter un "bounce" au dragon
    monDragon.body.bounce.y = 0.2;

    //Activer les fleches de mouvement
    fleches = jeu.input.keyboard.createCursorKeys();

    //Ajouter le bouton OK et les directives
    btnDirectives = jeu.add.button(jeu.world.centerX, jeu.world.centerY, 'bouton', debuter);
    btnDirectives.anchor.setTo(0.5,0.5);
    texteDirectives = jeu.add.text(jeu.world.centerX, jeu.world.centerY, " Tu es un dragon et des archers sont venus \nvoler ta gemme! Il faudra la récupérer, mais \nvous avez seulement 2 vies. Si tu frappes\n un des archers, tu perdras une vie.\n Tu contrôles le dragon avec les flèches\n gauche et droit du clavier et tu voles avec la flèche\n de haut. Clique sur le bouton OK pour commencer. \nBonne Chance!", { font: '16px Arial', fill: '#fff' });
    texteDirectives.anchor.setTo(0.5,0.5);

    //Ajouter le texte des vies dans le coins
    viesString = "Vies : ";
    viesTexte = jeu.add.text (10, 10, viesString + vies, { font: '20px Arial', fill: '#fff' });

    //Creer les groupe physique pour la gemme, les archers et les plateformes;
    mesPlateformes = jeu.add.physicsGroup();
    mesArchers = jeu.add.physicsGroup();
    maGemme = jeu.add.physicsGroup();

    //La carte pour le placement des plateformes, des archers et de la gemme
    var largeur = 25; //ceci represente la largeur de mon bloc
    var hauteur = 25; //ceci represente l'hauteur de mon bloc

this.carte = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,2,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0],
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
	//Ajouter les archers, la gemme et les plateformes
		if (this.carte [y][x] == 1){
			plateforme = jeu.add.sprite(posX, posY, "plateforme");
			mesPlateformes.add(plateforme);
			plateforme.body.immovable = true;
			plateforme.body.allowGravity = false;
		}
		else if (this.carte [y][x] == 2){
			gemme = jeu.add.sprite(posX, posY, "gemme");
            maGemme.add(gemme);
            gemme.anchor.setTo(0.5,0.5);
            jeu.physics.enable(gemme, Phaser.Physics.ARCADE);
            gemme.body.collideWorldBounds = true;
            gemme.body.allowGravity = false;
		}
        else if (this.carte [y][x] == 3){
            archer = jeu.add.sprite(posX, posY, 'archer');
            mesArchers.add(archer);
            archer.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer, Phaser.Physics.ARCADE);
            archer.body.collideWorldBounds = true;
            archer.body.allowGravity = false;
        }
        else if (this.carte [y][x] == 4){
            archer2 = jeu.add.sprite(posX, posY, 'archer2');
            mesArchers.add(archer2);
            archer2.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer2, Phaser.Physics.ARCADE);
            archer2.body.collideWorldBounds = true;
            archer2.body.allowGravity = false;
        }
        else if (this.carte [y][x] == 5){
            archer3 = jeu.add.sprite(posX, posY, 'archer3');
            mesArchers.add(archer3);
            archer3.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer3, Phaser.Physics.ARCADE);
            archer3.body.collideWorldBounds = true;
            archer3.body.allowGravity = false;
        }
        else if (this.carte [y][x] == 6){
            archer4 = jeu.add.sprite(posX, posY, 'archer4');
            mesArchers.add(archer4);
            archer4.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer4, Phaser.Physics.ARCADE);
            archer4.body.collideWorldBounds = true;
            archer4.body.allowGravity = false;
        
        }
        else if (this.carte [y][x] == 7){
            archer5 = jeu.add.sprite(posX, posY, 'archer5');
            mesArchers.add(archer5);
            archer5.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer5, Phaser.Physics.ARCADE);
            archer5.body.collideWorldBounds = true;
            archer5.body.allowGravity = false;
        }
        else if (this.carte [y][x] == 8){
            archer6 = jeu.add.sprite(posX, posY, 'archer6');
            mesArchers.add(archer6);
            archer6.anchor.setTo(0.5,0.5);
            jeu.physics.enable(archer6, Phaser.Physics.ARCADE);
            archer6.body.collideWorldBounds = true;
            archer6.body.allowGravity = false;
        }
	}
}
//Appellet la fonction pour les directives
directives();

}

function repetition(){
    //Collision entre le dragon et les plateformes
    jeu.physics.arcade.collide(monDragon, mesPlateformes);

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

            if (fleches.up.isDown){

                monDragon.body.velocity.y = -300;

            }
        
        }
        //Appeller les fonctions pour quand le dragon perd une vie et quand mettre fin au jeux
    perteVie();
    finMatch();
}


//Les fonctions

//Fonction qui arrete le jeux
function arreterJeu(){
    jouer = false;
}

//Fonction avec les conditions pour arreter le jeu
function finMatch(){
    if (jeu.physics.arcade.overlap(monDragon, gemme)){
        arreterJeu();
        gemme.kill();
        archer.kill();
        archer2.kill();
        archer3.kill();
        archer4.kill();
        archer5.kill();
        archer6.kill();
        monDragon.kill();
        gagnerTexte = jeu.add.text(jeu.world.centerX, jeu.world.centerY, "Bravo! Vous avez récupéré votre gemme! :D\nRafraichi la page pour jouer encore!", { font: '30px Arial', fill: '#082fff' });
        gagnerTexte.anchor.setTo(0.5,0.5);
        gagnerTexte.visible = true;
        mesPlateformes.kill();
    }
    if (vies == 0){
        arreterJeu();
        archer.kill();
        archer2.kill();
        archer3.kill();
        archer4.kill();
        archer5.kill();
        archer6.kill();
        gemme.kill();
        monDragon.kill();
        perduTexte = jeu.add.text(jeu.world.centerX, jeu.world.centerY, "Vous avez perdu votre gemme. :c\nRafraichi la page pour jouer encore!", { font: '30px Arial', fill: '#082fff' });
        perduTexte.anchor.setTo(0.5,0.5)
        perduTexte.visible = true;
        mesPlateformes.kill();
    }
}

//La fonction qui fait commencer le jeux apres que tu click sur le bouton OK
function debuter(){
    jouer = true;
    btnDirectives.visible = false;
    texteDirectives.visible = false;
    maGemme.visible = true;
    mesPlateformes.visible = true;
    mesArchers.visible = true;
}

//La fonction pour faire apparaitre les directives au tout debut
function directives(){
    jouer = true;
    btnDirectives.visible = true;
    maGemme.visible = false;
    mesPlateformes.visible = false;
    mesArchers.visible = false;
}

//La fonction avec les conditions qui fait en sorte que le dragon peu perdre des vies
function perteVie(){
    if ( (jeu.physics.arcade.overlap(monDragon, archer)) ){
        vies -= 1;
        viesTexte.text = viesString + vies;
        archer.kill();
    }
    if ( (jeu.physics.arcade.overlap(monDragon, archer2))){
        vies -= 1;
        viesTexte.text = viesString + vies;
        archer2.kill();
    }
    if ( (jeu.physics.arcade.overlap(monDragon, archer3))){
        vies -= 1;
        viesTexte.text = viesString + vies;
        archer3.kill();
    }
    if ( (jeu.physics.arcade.overlap(monDragon, archer4))){
        vies -= 1;
        viesTexte.text = viesString + vies;
        archer4.kill();
    }
    if ( (jeu.physics.arcade.overlap(monDragon, archer5))){
        vies -= 1;
        viesTexte.text = viesString + vies;
        archer5.kill();
    }
    if ( (jeu.physics.arcade.overlap(monDragon, archer6))){
        vies -= 1;
        viesTexte.text = viesString + vies;
        archer6.kill();
    }
}