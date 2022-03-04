// CREAZIONE STRUTTURA
let side = '500px'
let levelInp = document.querySelector('#level')
let campo = document.querySelector('.campo')
campo.style.maxWidth = '500px'
let play = document.querySelector('.play')
let replay = document.querySelector('.replay')
// levels, play and restart
let levels = [100, 81, 49]
play.addEventListener('click', selectLevel)
replay.addEventListener('click', cancel)
// selezione livello e generazione griglia + caselle bomba
function selectLevel() {
    cancel()
    if (levelInp.value == 'firstLevel') {
        generazione(levels[0]);
        generatingBombs(levels[0])
    } else if (levelInp.value == 'secondLevel') {
        generatingBombs(levels[0])
        generazione(levels[1]);
    } else  if (levelInp.value == 'thirdLevel') {
        generazione(levels[2]);
        generatingBombs(levels[0])
    } else {
        alert('Seleziona un livello')
    }   
};

// generazione bombe
function generatingBombs(level) {
    let looserNumbers = []
    while (looserNumbers.length < 16) {
        let random = Math.floor(Math.random() * level) + 1;
        if (!(looserNumbers.includes(random))) {
            looserNumbers.push(random);
        }
    };
    console.log(looserNumbers) 
};
// reset
function cancel () {
    campo.innerHTML = ''
    replay.classList.add('d-none')
};
// box generati all'interno della griglia
function generazione (level) {
    let dim = 100 / Math.sqrt(level)
    for (let i = 1; i <= level; i++) {
        let box = document.createElement('div')
        replay.classList.remove('d-none')
        box.className = "box d-flex p-1 justify-content-center align-items-center bg-light"
        box.classList.add(`box-${i}`)
        box.style.border = '1px solid black'
        box.style.width = dim + '%'
        // canalizzatore del click specifico 'box' collegato alla funzione changecolor
        box.addEventListener('click', changeColor)
        box.innerHTML = i;
        campo.append(box)
    }
};

// CAMBIO SFONDO CASELLA + DECRETO VINCITORE E PERDENTE
function changeColor() {
    let successCell = document.querySelectorAll('.bg-secondary')
    let looserCell = document.querySelectorAll('.bg-danger')
    let totalCell = document.querySelectorAll('.box')
    let bombCounter = 0
    for (let i = 0; i < looserNumbers.length; i++) {
        const element = looserNumbers[i];
        if ((this.innerHTML + '' == element + '')) {
            bombCounter = bombCounter + 1;
            this.classList.add('bg-danger');
            this.classList.remove('bg-light');
        } else {
            this.classList.add('bg-secondary');
            this.classList.remove('bg-light');
        }
        if (looserCell.length == 3) {
            campo.innerHTML = 'Hai perso'
            // schermata looser
        } else if (successCell.length == (totalCell.length - 3)) {
            campo.innerHTML = 'Hai vinto'
            // schermata winner
        }
    }
    // Decreto looser/winner

};





