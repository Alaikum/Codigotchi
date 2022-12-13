console.log('ciao')


const mic = document.getElementById('mic')
const screen = document.getElementById('screen')
const panelData = document.getElementById('panel-data')
let valLin = document.getElementById('lingua')
let textMangia = document.getElementById('mangia')
let textBalla = document.getElementById('balla')
let textDormi = document.getElementById('dormi')
let textMicro = document.getElementById('microfono')
let textInse = document.getElementById('inserisci')
let textCmd = document.getElementById('comandi')



// console.log(mic,screen,panelData)


const commands = ['mangia', 'balla', 'dormi']
const commandsFr = ['mange', 'danse', 'dors']
// const commandsEn = ['mangia', 'balla', 'dormi']

const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition

console.log(SpeechRecognition)

const recog = new SpeechRecognition()


//cambia testo se cambia lingua

valLin.addEventListener('change', (event) => {
    if (valLin.value == 'fr-FR') {
        textMangia.textContent = 'Mange'
        textBalla.textContent = 'Danse'
        textDormi.textContent = 'Dors'
        textMicro.textContent = 'Activer le Micro'
        textInse.textContent = 'Interagissez avec les commandes vocales'
        textCmd.textContent = 'Commandes prises en charge'
    } else {
        textMangia.textContent = 'Mangia'
        textBalla.textContent = 'Balla'
        textDormi.textContent = 'Dormi'
        textMicro.textContent = 'Attiva il Microfono'
        textInse.textContent = 'Interagisci coi comandi vocali'
        textCmd.textContent = 'Comandi supportati'
    }
});




function onStart() {
    let lingua = valLin.value
    recog.lang = lingua;
    console.log(recog)
    console.log('valore', lingua)
    console.log('start listening...');
    panelData.classList.add('listening');

    recog.start()
    document.getElementById('debug').innerHTML = ""

}

function onResult(e) {
    const testo = e.results[0][0].transcript
    console.log(testo)
    let controllo = commands
    let cambioLingua = false
    if (valLin.value == 'fr-FR') {
        controllo = commandsFr
        console.log(controllo)
        cambioLingua = true
    }

    document.getElementById('debug').innerHTML = testo

    //controllare comandi nella trascrizione
    let action = controllo.find(function (cmd) {
        return testo.toLowerCase().includes(cmd)
    })

    if (cambioLingua && action) {
        if (action == 'mange') {
            action = 'mangia'
        }
        if (action == 'danse') {
            action = 'balla'
        }
        if (action == 'dors') {
            action = 'dormi'
        }

    }

    console.log('action', action)

    //mostrare la gif
    const actionClassName = 'codigotchi-screen_' + action
    screen.classList.add(actionClassName)


    //torna all inizio

    panelData.classList.remove('listening');

    setTimeout(function () {

        screen.classList.remove(actionClassName);

    }, 2000)


}

mic.addEventListener('click', onStart);
recog.addEventListener('result', onResult)
