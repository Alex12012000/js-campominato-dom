
const playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', gameStart)

function gameStart() {

    // variabile che richiama il main-grid nel dom
    const mainGrid = document.getElementById('main-grid');
    const userMessage = document.getElementById("user-message");
    mainGrid.style.pointerEvents = '';
    
    // Chiedo la difficoltà all'utente
    let userDifficulty = document.getElementById('difficulty').value;
    
    // Difficoltà di base
    let maxNumbers = 0;

    // Reset grigilia
    let difficultyClass = '';
    mainGrid.innerHTML = '';

    // Definisco la difficoltà in base alla scelta fatta dall'utente 
    // Chiedo all'utente la difficoltà finche non inserisce un numero corretto
    if(userDifficulty === "1") {
        maxNumbers = 100;
        difficultyClass = 'easy';
    } else if (userDifficulty === "2") {
        maxNumbers = 81;
        difficultyClass = 'normal';
    } else if (userDifficulty === "3") {
        maxNumbers = 49;
        difficultyClass = 'hard';
    } else {
        maxNumbers = 81;
        difficultyClass = 'normal';
    }
   
    
    // Tentativi dell'utente
    let maxAttempts = maxNumbers - 16;
    console.log(maxAttempts)
    // Variabile che racchiude l'array con le bombe generate
    let bomb = bombGenerator(16, 1, maxNumbers);
    console.log(bomb)

    // Array numeri utente
    let userInputArray = [];

    // Creo una cella con un numero nel dom
    for(let i = 1; i <= maxNumbers; i++) {
        // creo un div
        let div = document.createElement('div');
        // appendo il div nel main-grid
        mainGrid.append(div);
        // popolo il div con uno span e il numero generato in base alla difficolta scelta dall'utente
        div.innerHTML =`<span>${i}</span>`;
        // aggiungo le classi square e la difficultyclass al div
        div.classList.add('square', difficultyClass);
        
        // click dell'utente sulla cella, se la cella è una bomba 
        // aggiungo classe red e diventa rossa
        // altrimenti la cella diventa blu
        div.addEventListener('click', bombOrSafe)
        function bombOrSafe() {

            // se l'utente clicca su un numero gia selezionato o clicca su una bomba
            // il numero non viene inserito nell'array
            if (!userInputArray.includes(i) && !bomb.includes(i)) {
                userInputArray.push(i)
                console.log(userInputArray)
            }
            // se l'utente preme un numero bomba il la cella diventa rossa, l'utente perde e il gioco finisce
            // altrimenti la cella diventa blu
            if (bomb.includes(i)) {
                div.classList.add('red');
                alert('hai perso');
                mainGrid.style.pointerEvents = 'none';
                userMessage.innerHTML = 'Peccato, hai perso :-( Hai azzeccato ' + userInputArray.length + ' tentativi . Gioca ancora..';
                
            } else {
                div.classList.add('blue')
                
                // se l'utente seleziona le celle per il numero massimo di tentativi l'utente vince
                // e il gioco finisce
                if (userInputArray.length === maxAttempts) {
                    alert('hai vinto')
                    mainGrid.style.pointerEvents = 'none';
                    userMessage.innerHTML = 'Il tuo punteggio è: ' + userInputArray.length + ' premi play per giocare di nuovo!';
                }
            }
        }
        
    }
     

   
    
}

// ------------------------
//      FUNZIONI
// -----------------------

// Funzione che genera 16 bombe con un numero che va da un minimo di 1 fino ad un massimo indicato dalla difficoltà scelta dall'utente

function bombGenerator (bombNumb, max, min) {

    // array di bombe
    let bombs = [];

    // finche il numero di bombe nell'array è minore del numero massimo di bombe da generare, continua a generare numeri random
    // che verranno pushati all'interno dell'array di bombe
    while (bombs.length < bombNumb) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
        
        // se il numero non è incluso nell'array di bombe lo inserisco, altrimenti continuo a chiedere un numero
        if(!bombs.includes(randomNumber)) {
            bombs.push(randomNumber);
        }
    }

    // Ritorna un array
    return bombs;
}
