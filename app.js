// CREAZIONE STRUTTURA
let side = '500px'
let output = document.querySelector('.output')
let levelInp = document.querySelector('#level')
let campo = document.querySelector('.campo')
campo.style.maxWidth = '500px'
let play = document.querySelector('.play')
let replay = document.querySelector('.replay')
// levels, play and restart
let levels = [100, 81, 49]
play.addEventListener('click', selectLevel)
// selezione livello e generazione griglia + caselle bomba
function selectLevel() {
    cancel()
    if (levelInp.value == 'firstLevel') {
        generazione(levels[0], looserNumbers);
        generatingBombs(levels[0])
    } else if (levelInp.value == 'secondLevel') {
        generatingBombs(levels[0])
        generazione(levels[1], looserNumbers);
    } else  if (levelInp.value == 'thirdLevel') {
        generazione(levels[2], looserNumbers);
        generatingBombs(levels[0])
    } else {
        alert('Seleziona un livello')
    }   
};
// generazione bombe
let looserNumbers = []
function generatingBombs(level) {
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
    output.innerHTML = ''    
    replay.classList.add('d-none')
};
// box generati all'interno della griglia
function generazione (level, looserNumbers) {
    let dim = 100 / Math.sqrt(level)
    for (let i = 1; i <= level; i++) {
        let box = document.createElement('div')
        replay.classList.remove('d-none')
        box.className = "box d-flex p-1 justify-content-center align-items-center bg-light"
        box.classList.add(`box-${i}`)
        box.style.border = '1px solid black'
        box.style.width = dim + '%'
        // canalizzatore del click specifico 'box' collegato alla funzione changecolor
        box.addEventListener('click', changeColor, looserNumbers)
        box.innerHTML = i;
        campo.append(box)
    }
};

// CAMBIO SFONDO CASELLA + DECRETO VINCITORE E PERDENTE
function changeColor() {
    let successCell = document.querySelectorAll('.bg-secondary')
    let box = document.querySelectorAll('.box')
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
    }
    // gameover
    if ((bombCounter == 1) || (successCell.length == (box.length - 3))) {
        for (let i = 0; i < box.length; i++) {
            box[i].removeEventListener('click', changeColor)
        }
        output.innerHTML = `Il tuo punteggio è di ${successCell.length}`
    }
};





