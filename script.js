console.log('ciao')


const mic = document.getElementById('mic')
const screen = document.getElementById('screen')
const panelData = document.getElementById('panel-data')

// console.log(mic,screen,panelData)


const commands = ['mangia', 'balla', 'dormi']

const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition

console.log(SpeechRecognition)

const recog = new SpeechRecognition()


function onStart() {
    recog.lang = 'it-IT';
    console.log(recog)
    console.log('start listening...');
    panelData.classList.add('listening');
    recog.start()
}

function onResult(e) {
    const testo = e.results[0][0].transcript
    console.log(testo)


    //controllare comandi nella trascrizione
    const action = commands.find(function (cmd) {
        return testo.toLowerCase().includes(cmd)
    })

    console.log('action', action)

    //mostrare la gif
    const actionClassName = 'codigotchi-screen_' + action
    screen.classList.add(actionClassName)


    //torna all inizio

    panelData.classList.remove('listening');

setTimeout(function(){

    screen.classList.remove(actionClassName);
    
},2000)


}

mic.addEventListener('click', onStart);
recog.addEventListener('result', onResult)