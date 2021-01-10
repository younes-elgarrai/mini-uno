//============================================================================================

// MINI UNO - PART 1

//============================================================================================



var lastPlay = {
    couleur : 'bleu',
    chiffre : '6',
}

var cards = [
{
    couleur : 'vert',
    chiffre : '6',
},
{
    couleur : 'rouge',
    chiffre : '6',
},
{
    couleur : 'bleu',
    chiffre : '9',
},
{
    couleur : 'vert',
    chiffre : '9',
}
]


//============================================================================================

// la fonction prend en entrée la carte jouée, et le tableau du deck en main, 
// pour retourner le même tableau avec null à la place des cartes non jouables.


const playableNull = (play , deck) => {
    var playNull = deck.map(element => {

        if ( element.couleur == play.couleur || element.chiffre == play.chiffre) {
            return element;
            }else{
                return null;
            };

        });

    return playNull;
    };

// la fonction retourne le tableau des cartes jouables.

const playable = (play , deck) => {
    var playnull = deck.map(element => {

        if ( element.couleur == play.couleur || element.chiffre == play.chiffre) {
            return element;
            }else{
                return null;
            };

        });

    return playnull.filter(elem => {return elem != null;} )
    };

// la fonction game joue a partir de la donnée de la carte jouée 
// et du deck en main, en selectionnant la premiere carte jouable. Elle retourne le prochain deck;

const game = (play , deck) => {

    var index = deck.indexOf(playable(play , deck)[0]);

    if (index > -1) {
            lastPlay = playable(play , deck)[0];
            deck.splice(index,1);
            console.log(deck);
            return deck;
    }else{
        console.log("Je passe mon tour");
    };

    if(deck.length == 1){
        console.log("Uno !");
    };

    if(deck.length == 0){
        console.log("Gagné!");
    }


};

//============================================================================================

// MINI UNO - PART 2

//============================================================================================

// Pour travailler à partir du DOM, la fonction si dessous construit et retourne un tableau d'objets carte
// à partir d'un tableau d'éléments HTML 

const deckArray = (deck) => {
    var Arr = [];
    for(let i = 0; i < deck.length; i++){
        Arr.push(
            {couleur: deck[i].classList[2],
             chiffre: deck[i].innerText}
        );
    }
    return Arr;
};

// Pour travailler à partir du DOM, la fonction si dessous retourne un objet carte
// à partir de l'élement HTML représentant la carte jouée.


const lastPlayArray = (play) => {
    return {couleur: play[0].classList[2],
        chiffre: play[0].innerText};
    
}; 

//============================================================================================

// initialisation des variables


var deckInit = document.getElementsByClassName('deck');

var lastPlayInit = document.getElementsByClassName('play');


var deckNext ; // pour stocker le prochain deck

var playNext ; // pour stocker la carte jouée


// fonction game2 : la fonction joue, et modifie le DOM en conséquence des décisions du joueur.
// la fonction est RECURSIVE via la fonction listener de l'event handler: quand j'ai choisi une carte,
// je dois indiquer les cartes jouables, et leur permettre d'être jouée via un event handler.

var game2 = (deck , play) => {

    var playTable = playableNull(lastPlayArray(play), deckArray(deck)); 

    for (let i = 0; i < deck.length; i++){
        if(playTable[i] == null){
            deck[i].style.borderColor = "black";
        }else{
            deck[i].style.borderColor = "yellow"
            deck[i].addEventListener('click', listener);
        };
    };
};

var listener = function(){ 
    if(this.innerText == lastPlayInit[0].innerText || this.classList[2] == lastPlayInit[0].classList[2]){
        lastPlayInit[0].innerHTML = this.innerHTML;
        lastPlayInit[0].classList.replace(lastPlayInit[0].classList[2], this.classList[2]);
        this.remove();
        deckNext = document.getElementsByClassName('deck');
        playNext = document.getElementsByClassName('play');
    }

    if(deckNext.length == 1){
        alert('Uno!');
    }
    if(deckNext.length == 0){
        alert('Gagné!');
    }

    game2(deckNext, playNext);

 
    };

//  la fonction game2 est lancée sur le jeu initial

game2(deckInit, lastPlayInit);













