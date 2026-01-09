// Variables HTML
let the_question = document.getElementById("Question");
let the_answer = document.getElementById("reponse");
let the_gamecchangertrue = document.getElementById("Continue");
let the_gamecchangerfalse = document.getElementById("ornot");
let the_warning = document.getElementById("warning");
let the_score = document.getElementById("score");
let the_appreciation = document.getElementById("appreciation");
let the_time = document.getElementById("timer");

// Écrans
let ecranDifficulte = document.getElementById("ecran-difficulte");
let ecranJeu = document.getElementById("ecran-jeu");

// Boutons de difficulté
let btnFacile = document.getElementById("btn-facile");
let btnMoyen = document.getElementById("btn-moyen");
let btnDifficile = document.getElementById("btn-difficile");

// Variable pour stocker les questions
let questrep = [];
let i = 0;
let toutesLesQuestions = null;

// Créer les boutons de réponse
/*let btn = document.createElement("button");
let btn2 = document.createElement("button");
let btn3 = document.createElement("button");
let btn4 = document.createElement("button");
*/
//Boucle pour créer et mettre les boutons dans une classe
let boutonsdereponse = [];
for (let i = 0; i < 4; i++){
    let btn = document.createElement("button");
    btn.classList.add("btn-reponse-style");
    document.getElementById("position-reponse").appendChild(btn);
    boutonsdereponse.push(btn);
}


// CHARGER LES QUESTIONS DEPUIS JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        toutesLesQuestions = data;
        console.log("Questions chargées avec succès !");
    })
    .catch(error => {
        console.error('Erreur de chargement:', error);
        alert("Erreur lors du chargement des questions");
    });

// ÉVÉNEMENTS POUR LES BOUTONS DE DIFFICULTÉ
btnFacile.addEventListener("click", () => {
    demarrerJeu("facile");

});

btnMoyen.addEventListener("click", () => {
    demarrerJeu("moyen");
});

btnDifficile.addEventListener("click", () => {
    demarrerJeu("difficile");
});

// Fonction pour démarrer le jeu avec la difficulté choisie
function demarrerJeu(difficulte) {
    if (!toutesLesQuestions) {
        alert("Les questions ne sont pas encore chargées, veuillez patienter...");
        return;
    }
    
    questrep = toutesLesQuestions[difficulte];
    i = 0;
    
    // Cacher l'écran de difficulté et afficher l'écran de jeu
    ecranDifficulte.style.display = "none";
    ecranJeu.style.display = "block";
    
    // Afficher la première question
    afficherQuestion();
    
    // Configurer les boutons
    the_gamecchangertrue.textContent = "CONTINUER";
    the_gamecchangerfalse.textContent = "Arrêter";
}
// Timer
  //declaration de variable
  let the_countdown = null;
  let secondes = 30;

  // fonction pour demarrer et redemarrer un nouveau timer 
  function demarrertimer() {
    // Arret du timer precédent s'il existe 
    if (the_countdown) {
        clearInterval(the_countdown);
    }
    // Réinitialiser à 30 secondes 
    secondes = 30;
    the_time.textContent = `00:${secondes}`;

    //demarrer le nouveau timer 
    the_countdown = setInterval(() => {
        secondes--;

        //Formater l'affichage (ajouter un 0 si <10)
        const affichage = secondes < 10 ? `00:0${secondes}` : `00:${secondes}`;
        the_time.textContent = affichage;

        if (secondes <= 0) {
            clearInterval(the_countdown);
            i++;
            afficherQuestion();
            demarrertimer();
        }
    }, 1000);

  }
// Fonction pour afficher une question
function afficherQuestion() {
    if (i >= questrep.length) {
        if (the_countdown) {
            clearInterval(the_countdown);
        }

        the_question.textContent = "Quiz terminé ! 🎉";
        the_score.textContent = `SCORES : ${scores}`;

        if (scores == 0){
            the_appreciation.textContent = "BRAINDEAD 🤣🤣"
        }
        else if (scores == 1){
            the_appreciation.textContent = "A little mediocre 😒"
        }
         else if (scores == 2){
            the_appreciation.textContent = "NOT BAD NOT BAD 😊"
        }
         else if (scores == 3){
            the_appreciation.textContent = "GOOD 😃"
        }
         else{
            the_appreciation.textContent = "WHOOOOOAAAAAAA VOUS N'ETES PAS DUMB 🤩"
         }
        boutonsdereponse.forEach(btn => btn.style.display = "none");
        the_gamecchangertrue.style.display = "none";
        the_answer.style.display = "none";
         the_time.style.display = "none"; 
        return;
    }
    
    the_question.textContent = questrep[i].question;
     // Afficher les textes des boutons
    for (let j = 0; j < 4; j++) {
        boutonsdereponse[j].textContent = questrep[i].reponses[j].texte;
        boutonsdereponse[j].style.display = "inline-block";
    }
    the_answer.textContent = "";
    the_warning.textContent = "";
    
    // Redemarrage du timer 
    demarrertimer();
}
// Les Variables utilisé pour montrer les scores:

let scores = 0;

// Ajouter les événements aux boutons de réponse
boutonsdereponse.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        the_warning.textContent = "";
        if (questrep[i].reponses[index].correct) {
            the_answer.textContent = "Bonne réponse ✓";
            the_answer.style.color = "rgb(69, 130, 117)";
            scores++; 
        } else {
            the_answer.textContent = "Mauvaise réponse ✗";
            the_answer.style.color = "rgba(243, 103, 138, 1)";  
        }
    });
});

// Bouton Continuer
the_gamecchangertrue.addEventListener("click", () => {
    if (the_answer.textContent == "") {
        the_warning.textContent = "RÉPONDEZ D'ABORD À LA QUESTION !";
    } else {
        i++;
        afficherQuestion();
    }
});

// Bouton Arrêter
the_gamecchangerfalse.addEventListener("click", () => {

    the_question.textContent = "MERCI D'AVOIR JOUÉ ! 👋";
    the_question.style.textAlign = "center";
    ecranJeu.style.height = "100px";

    the_answer.textContent = "";
    the_warning.textContent = "";
    
    boutonsdereponse.forEach(btn => btn.style.display = "none");
    the_gamecchangertrue.style.display = "none";
    the_gamecchangerfalse.style.display = "none";
    clearInterval(the_countdown);
    the_time.style.display = "none";

    // Option : afficher un bouton pour recommencer
    setTimeout(() => {
        if (confirm("Voulez-vous rejouer ?")) {
            location.reload(); // Recharge la page
        }
    }, 1000);
});