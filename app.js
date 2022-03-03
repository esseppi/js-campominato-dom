// STRUTTURA
// CREAZIONE STRUTTURA
let side = '500px'
let levelInp = document.querySelector('#level')
let campo = document.querySelector('.campo')
campo.style.maxWidth = '500px'
let play = document.querySelector('.play')
let replay = document.querySelector('.replay')
// levels
let levels = [49, 81, 100]
play.addEventListener('click', selectLev)
replay.addEventListener('click', cancel)
// selezione livello e generazione
function selectLev() {
    cancel();
    if (levelInp.value == 'firstLevel') {
        generazione(levels[0]);
    } else if (levelInp.value == 'secondLevel') {
        generazione(levels[1]);
    } else  if (levelInp.value == 'thirdLevel') {
        generazione(levels[2]);
    } else {
        alert('Seleziona un livello')
    }
}
// reset
function cancel () {
    campo.innerHTML = ''
    replay.classList.add('d-none')
}
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
        box.innerHTML = i;
        campo.append(box)
    }
};