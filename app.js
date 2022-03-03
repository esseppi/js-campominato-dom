// STRUTTURA
// CREAZIONE STRUTTURA
let side = '500px'
let levelInp = document.querySelector('#level')
let campo = document.querySelector('.campo')
campo.style.maxWidth = '500px'
let play = document.querySelector('.play')
let replay = document.querySelector('.replay')
// levels
let levels = [100, 81, 49]
play.addEventListener('click', selectLev)
replay.addEventListener('click', cancel)
// selezione livello e generazione
function selectLev() {
    cancel();
    if (levelInp.value == 'firstLevel') {
        generazione(levels[0]);
        return 1
    } else if (levelInp.value == 'secondLevel') {
        generazione(levels[1]);
        return 2
    } else  if (levelInp.value == 'thirdLevel') {
        generazione(levels[2]);
    } else {
        alert('Seleziona un livello')
        return 3
    }
};
// reset
function cancel () {
    campo.innerHTML = ''
    replay.classList.add('d-none')
};
// contenuto generato
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
        box.addEventListener('click',changeColor)
        box.innerHTML = i;
        campo.append(box)
    }
};
let looserNumbers = []
console.log(looserNumbers)
// creazione numeri perdenti random
while (looserNumbers.length < 16) { 
    let random = Math.floor(Math.random() * 100) + 1;
    if (!(looserNumbers.includes(random))) {
        looserNumbers.push(random);
    }
};
// effetto che ha il click sulla casella
let bombCounter = 0
function changeColor() {
    for (let i = 0; i < looserNumbers.length; i++) {
        const element = looserNumbers[i];
        if ((this.innerHTML + '' == element + '')) {
            bombCounter =+ 1;
            this.classList.add('bg-danger');
            this.classList.remove('bg-light');
        } else {
            this.classList.add('bg-secondary');
            this.classList.remove('bg-light');
        }           
    }
    if (bombCounter == 16) {
        campo.innerHTML = 'Hai perso'  
    }
};




