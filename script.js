const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPause = document.querySelector('#start-pause')
const musicaInput = document.querySelector("#alternar-musica")
const iniciarOuPausarbt = document.querySelector('#start-pause span')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const fimBt = new Audio('./sons/beep.mp3')
const tempoTela = document.querySelector('#timer')


let tempoEmSegundos = 1500
let intervalo = null
musica.loop = true

//quando clica quer musica, logo cai no if else
musicaInput.addEventListener('change', () => {
    //se a musica estiver pausada, toca, se ja estiver tocando, pausa a música
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})



focoBt.addEventListener('click', () => {
    tempoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        //remove a classe de acordo com o contexto
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    //switch troca a cada contexto.
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoEmSegundos <= 0 ){
        fimBt.play()
        zerar()
        alert('Tempo esgotado!')
        return
    }
    tempoEmSegundos -= 1
    mostrarTempo()
}

startPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    //interromper
    if(intervalo){
        zerar()
        return
    }
    intervalo = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarbt.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervalo)

    iniciarOuPausarbt.textContent = "Começar"
    intervalo = null
}

function mostrarTempo() {
    const tempo = new Date(tempoEmSegundos * 1000)
    const tempoFormatado =  tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()