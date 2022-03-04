// CREAZIONE STRUTTURA
let levelInp = document.querySelector('#level')
let output = document.querySelector('.output')
let campo = document.querySelector('.campo')
campo.style.maxWidth = '500px'
let play = document.querySelector('.play')
let replay = document.querySelector('.replay')
// levels, play and restart
let levels = [100, 81, 49]
play.addEventListener('click', selectLev)
replay.addEventListener('click', cancel)
// selezione livello e generazione griglia + caselle bomba
let cellNum = 0
let looserNumbers = []
function selectLev() {
    cancel();
    
    if (levelInp.value == 'firstLevel') {
        cellNum = 100;
        generazione(levels[0]);
    } else if (levelInp.value == 'secondLevel') {
        cellNum = 81;
        generazione(levels[1]);
    } else  if (levelInp.value == 'thirdLevel') {
        cellNum = 49;
        generazione(levels[2]);
    } else {
        alert('Seleziona un livello')
    }
    function generateBomb() {
        while (looserNumbers.length < 16) {
            let random = Math.floor(Math.random() * cellNum) + 1;
            if (!(looserNumbers.includes(random))) {
                looserNumbers.push(random);
            }
        };
    }
};
// reset
function cancel () {
    campo.innerHTML = ''
    replay.classList.add('d-none')
    output.innerHTML = ''
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
    let box = document.querySelectorAll('.box')
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
        if (bombCounter == 1 || (successCell.length == (totalCell.length - 3))) {
            // rendo le caselle bomba rosse
            for (let j = 0; j < box.length; j++) {
                if (parseInt(box[j].innerHTML) == looserNumbers[i]) {
                    console.log(box[j])
                    box[j].classList.add('bg-danger')
                    box[j].classList.remove('bg-light')
                }
            }
            for (let i = 0; i < box.length; i++) {
            // blocco schermata
                box[i].removeEventListener('click', changeColor)
            }
            // schermata winner
        }
        if (successCell.length == (totalCell.length - 3)) {
            output.innerHTML = `Hai vinto e hai totalizzato ${successCell.length} punti!`;
        } else if (bombCounter == 1) {
            output.innerHTML = `Hai perso e hai totalizzato ${successCell.length} punti!`;
        }
       
    }
    // Decreto looser/winner

};





