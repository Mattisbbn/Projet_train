'use strict';

/************************************************************/
/* Constantes */
/************************************************************/

/*------------------------------------------------------------*/
// Dimensions du plateau
/*------------------------------------------------------------*/

// Nombre de cases par défaut du simulateur
const LARGEUR_PLATEAU = 30;
const HAUTEUR_PLATEAU = 15;

// Dimensions des cases par défaut en pixels
const LARGEUR_CASE = 35;
const HAUTEUR_CASE = 40;

/*------------------------------------------------------------*/
// Types des cases
/*------------------------------------------------------------*/
class Type_de_case {
    static Foret = new Type_de_case('foret');
    static Eau = new Type_de_case('eau');
    static Rail_horizontal = new Type_de_case('rail horizontal');
    static Rail_vertical = new Type_de_case('rail vertical');
    static Rail_droite_vers_haut = new Type_de_case('rail droite vers haut');
    static Rail_haut_vers_droite = new Type_de_case('rail haut vers droite');
    static Rail_droite_vers_bas = new Type_de_case('rail droite vers bas');
    static Rail_bas_vers_droite = new Type_de_case('rail bas vers droite');

    constructor(nom) {
        this.nom = nom;
    }
}

/*------------------------------------------------------------*/
// Images
/*------------------------------------------------------------*/
const IMAGE_EAU = new Image();
IMAGE_EAU.src = 'images/eau.png';

const IMAGE_FORET = new Image();
IMAGE_FORET.src = 'images/foret.png';

const IMAGE_LOCO = new Image();
IMAGE_LOCO.src = 'images/locomotive.png';

const IMAGE_RAIL_HORIZONTAL = new Image();
IMAGE_RAIL_HORIZONTAL.src = 'images/rail-horizontal.png';

const IMAGE_RAIL_VERTICAL = new Image();
IMAGE_RAIL_VERTICAL.src = 'images/rail-vertical.png';

const IMAGE_RAIL_BAS_VERS_DROITE = new Image();
IMAGE_RAIL_BAS_VERS_DROITE.src = 'images/rail-bas-vers-droite.png';

const IMAGE_RAIL_DROITE_VERS_BAS = new Image();
IMAGE_RAIL_DROITE_VERS_BAS.src = 'images/rail-droite-vers-bas.png';

const IMAGE_RAIL_DROITE_VERS_HAUT = new Image();
IMAGE_RAIL_DROITE_VERS_HAUT.src = 'images/rail-droite-vers-haut.png';

const IMAGE_RAIL_HAUT_VERS_DROITE = new Image();
IMAGE_RAIL_HAUT_VERS_DROITE.src = 'images/rail-haut-vers-droite.png';

const IMAGE_WAGON = new Image();
IMAGE_WAGON.src = 'images/wagon.png';

/************************************************************/
// Variables globales
/************************************************************/
let plateau; // Déclarez une variable globale pour l'instance du plateau
let contexte; // Déclarez une variable globale pour le contexte du canvas

/************************************************************/
/* Classes */
/************************************************************/

/*------------------------------------------------------------*/
// Plateau
/*------------------------------------------------------------*/

class Plateau {
    /* Constructeur d'un plateau vierge */
    constructor() {
        this.largeur = LARGEUR_PLATEAU;
        this.hauteur = HAUTEUR_PLATEAU;

        // État des cases du plateau
        // Tableau de colonnes, chaque colonne étant elle-même un tableau de cases
        this.cases = [];
        for (let x = 0; x < this.largeur; x++) {
            this.cases[x] = [];
            for (let y = 0; y < this.hauteur; y++) {
                this.cases[x][y] = Type_de_case.Foret;
            }
        }
    }
}

/************************************************************/
// Méthodes
/************************************************************/

function image_of_case(type_de_case) {
    switch (type_de_case) {
        case Type_de_case.Foret: return IMAGE_FORET;
        case Type_de_case.Eau: return IMAGE_EAU;
        case Type_de_case.Rail_horizontal: return IMAGE_RAIL_HORIZONTAL;
        case Type_de_case.Rail_vertical: return IMAGE_RAIL_VERTICAL;
        case Type_de_case.Rail_droite_vers_haut: return IMAGE_RAIL_DROITE_VERS_HAUT;
        case Type_de_case.Rail_haut_vers_droite: return IMAGE_RAIL_HAUT_VERS_DROITE;
        case Type_de_case.Rail_droite_vers_bas: return IMAGE_RAIL_DROITE_VERS_BAS;
        case Type_de_case.Rail_bas_vers_droite: return IMAGE_RAIL_BAS_VERS_DROITE;
    }
}

function dessine_case(contexte, plateau, x, y) {
    const la_case = plateau.cases[x][y];
    let image_a_afficher = image_of_case(la_case);
    contexte.drawImage(image_a_afficher, x * LARGEUR_CASE, y * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
}

function dessine_plateau(contexte, plateau) {
    // Dessin du plateau avec paysages et rails
    for (let x = 0; x < plateau.largeur; x++) {
        for (let y = 0; y < plateau.hauteur; y++) {
            dessine_case(contexte, plateau, x, y);
        }
    }
}

/************************************************************/
// Plateau de jeu initial
/************************************************************/

function cree_plateau_initial(plateau) {
    // Circuit
    plateau.cases[12][7] = Type_de_case.Rail_horizontal;
    plateau.cases[13][7] = Type_de_case.Rail_horizontal;
    plateau.cases[14][7] = Type_de_case.Rail_horizontal;
    plateau.cases[15][7] = Type_de_case.Rail_horizontal;
    plateau.cases[16][7] = Type_de_case.Rail_horizontal;
    plateau.cases[17][7] = Type_de_case.Rail_horizontal;
    plateau.cases[18][7] = Type_de_case.Rail_horizontal;
    plateau.cases[19][7] = Type_de_case.Rail_droite_vers_haut;
    plateau.cases[19][6] = Type_de_case.Rail_vertical;
    plateau.cases[19][5] = Type_de_case.Rail_droite_vers_bas;
    plateau.cases[12][5] = Type_de_case.Rail_horizontal;
    plateau.cases[13][5] = Type_de_case.Rail_horizontal;
    plateau.cases[14][5] = Type_de_case.Rail_horizontal;
    plateau.cases[15][5] = Type_de_case.Rail_horizontal;
    plateau.cases[16][5] = Type_de_case.Rail_horizontal;
    plateau.cases[17][5] = Type_de_case.Rail_horizontal;
    plateau.cases[18][5] = Type_de_case.Rail_horizontal;
    plateau.cases[11][5] = Type_de_case.Rail_haut_vers_droite;
    plateau.cases[11][6] = Type_de_case.Rail_vertical;
    plateau.cases[11][7] = Type_de_case.Rail_bas_vers_droite;

    // Segment isolé à gauche
    plateau.cases[0][7] = Type_de_case.Rail_horizontal;
    plateau.cases[1][7] = Type_de_case.Rail_horizontal;
    plateau.cases[2][7] = Type_de_case.Rail_horizontal;
    plateau.cases[3][7] = Type_de_case.Rail_horizontal;
    plateau.cases[4][7] = Type_de_case.Rail_horizontal;
    plateau.cases[5][7] = Type_de_case.Eau;
    plateau.cases[6][7] = Type_de_case.Rail_horizontal;
    plateau.cases[7][7] = Type_de_case.Rail_horizontal;

    // Plan d'eau
    for (let x = 22; x <= 27; x++) {
        for (let y = 2; y <= 5; y++) {
            plateau.cases[x][y] = Type_de_case.Eau;
        }
    }

    // Segment isolé à droite
    plateau.cases[22][8] = Type_de_case.Rail_horizontal;
    plateau.cases[23][8] = Type_de_case.Rail_horizontal;
    plateau.cases[24][8] = Type_de_case.Rail_horizontal;
    plateau.cases[25][8] = Type_de_case.Rail_horizontal;
    plateau.cases[26][8] = Type_de_case.Rail_bas_vers_droite;
    plateau.cases[27][8] = Type_de_case.Rail_horizontal;
    plateau.cases[28][8] = Type_de_case.Rail_horizontal;
    plateau.cases[29][8] = Type_de_case.Rail_horizontal;

    // TCHOU
    plateau.cases[3][10] = Type_de_case.Eau;
    plateau.cases[4][10] = Type_de_case.Eau;
    plateau.cases[4][11] = Type_de_case.Eau;
    plateau.cases[4][12] = Type_de_case.Eau;
    plateau.cases[4][13] = Type_de_case.Eau;
    plateau.cases[5][10] = Type_de_case.Eau;
    plateau.cases[7][10] = Type_de_case.Eau;
    plateau.cases[7][11] = Type_de_case.Eau;
    plateau.cases[7][12] = Type_de_case.Eau;
    plateau.cases[7][13] = Type_de_case.Eau;
    plateau.cases[8][10] = Type_de_case.Eau;
    plateau.cases[9][10] = Type_de_case.Eau;
    plateau.cases[8][13] = Type_de_case.Eau;
    plateau.cases[9][13] = Type_de_case.Eau;
    plateau.cases[11][10] = Type_de_case.Eau;
    plateau.cases[11][11] = Type_de_case.Eau;
    plateau.cases[11][12] = Type_de_case.Eau;
    plateau.cases[11][13] = Type_de_case.Eau;
    plateau.cases[12][11] = Type_de_case.Eau;
    plateau.cases[13][10] = Type_de_case.Eau;
    plateau.cases[13][11] = Type_de_case.Eau;
    plateau.cases[13][12] = Type_de_case.Eau;
    plateau.cases[13][13] = Type_de_case.Eau;
    plateau.cases[15][10] = Type_de_case.Eau;
    plateau.cases[15][11] = Type_de_case.Eau;
    plateau.cases[15][12] = Type_de_case.Eau;
    plateau.cases[15][13] = Type_de_case.Eau;
    plateau.cases[16][10] = Type_de_case.Eau;
    plateau.cases[16][13] = Type_de_case.Eau;
    plateau.cases[17][10] = Type_de_case.Eau;
    plateau.cases[17][11] = Type_de_case.Eau;
    plateau.cases[17][12] = Type_de_case.Eau;
    plateau.cases[17][13] = Type_de_case.Eau;
    plateau.cases[19][10] = Type_de_case.Eau;
    plateau.cases[19][11] = Type_de_case.Eau;
    plateau.cases[19][12] = Type_de_case.Eau;
    plateau.cases[19][13] = Type_de_case.Eau;
    plateau.cases[20][13] = Type_de_case.Eau;
    plateau.cases[21][10] = Type_de_case.Eau;
    plateau.cases[21][11] = Type_de_case.Eau;
    plateau.cases[21][12] = Type_de_case.Eau;
    plateau.cases[21][13] = Type_de_case.Eau;
}

/************************************************************/
// Fonction principale
/************************************************************/

function tchou() {
    console.log("Tchou, attention au départ !");
    /*------------------------------------------------------------*/
    // Variables DOM
    /*------------------------------------------------------------*/
    contexte = document.getElementById('simulateur').getContext("2d");

    // Création du plateau
    plateau = new Plateau();
    cree_plateau_initial(plateau);

    // Dessine le plateau
    dessine_plateau(contexte, plateau);

    // Sélection de la balise #simulateur
    const simulateur = document.querySelector('#simulateur');

    // Ajout d'un auditeur d'événements pour suivre le mouvement de la souris
    simulateur.addEventListener('click', function(event) {
        // Obtenir les coordonnées de la souris par rapport à la balise #simulateur
        const rect = simulateur.getBoundingClientRect();
        const mouseX = Math.floor((event.clientX - rect.left) / LARGEUR_CASE);
        const mouseY = Math.floor((event.clientY - rect.top) / HAUTEUR_CASE);

        // Vérifiez que les coordonnées sont valides
        if (mouseX >= 0 && mouseX < plateau.largeur && mouseY >= 0 && mouseY < plateau.hauteur) {
            // Afficher les coordonnées dans la console à des fins de débogage
            console.log("Position de la souris : X = " + mouseX + ", Y = " + mouseY);


            buttons.forEach((x) => {
                if(x.disabled === true){
                    console.log(x.id);
                }
            });

        
           
            plateau.cases[mouseX][mouseY] = Type_de_case.Eau;

            // Redessiner la case modifiée
            dessine_case(contexte, plateau, mouseX, mouseY);
        }
    });

    
}



const buttons = document.querySelectorAll("button");
function changeButtonsState(button) {
    if (button.disabled === false) {
        buttons.forEach((btn) => btn.disabled = false);
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

buttons.forEach((button) => button.addEventListener("click", function() {
    changeButtonsState(button);
}));


/************************************************************/
// Programme principal
/************************************************************/
window.addEventListener("load", () => {
    // Appel à la fonction principale
    tchou();
});

