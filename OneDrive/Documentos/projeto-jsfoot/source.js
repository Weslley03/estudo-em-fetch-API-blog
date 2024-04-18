class time {
    constructor(nome, defesa, ataque, jogador) {
        this.nome = nome
        this.defesa = defesa
        this.ataque = ataque
        this.jogador = jogador
    } 
}

class jogador {
    constructor(nome, posição, time, defesa, ataque){
        this.nome = nome
        this.posição = posição
        this.time = time
        this.defesa = defesa
        this.ataque = ataque
    }
}

let time0001 = new time('Corinthians', 0 , 0, jogador0000001)
let time0002 = new time('Flamengo', 0 , 0, jogador0000002)

let jogador0000001 = new jogador('Beto', 'Zagueiro',time0001, 30, 15)
let jogador0000002 = new jogador('Leo Pereira', 'Zagueiro', time0002, 60, 20)

//console.log(time0001.jogador)
//console.log(jogador0000001.time)

let time9390120 = ['Flamengo', 0, 0 ] //nome, defesa, ataque
let time8133728 = ['Corinthians', 0, 0 ]

let id661906 = ['Leo Pereira', 'Zagueiro', time9390120, 60, 20] //nome, posição, time, defesa, ataque, 
let id420852 = ['Beto', 'Zagueiro',time9390120, 30, 15]
let id626241 = ['Arrascaeta', 'Meia',time9390120, 20, 40] //nome, posição, defesa, ataque, 
let id304542 = ['Gabriel Barbosa', 'Atacante', time9390120, 12, 60]

let id502879 = ['Caca', 'Zagueiro', time8133728, 40, 15] //nome, posição, defesa, ataque, 
let id429610 = ['Caetano', 'Zagueiro', time8133728, 36, 15]
let id784680 = ['Garro', 'Meia', time8133728, 30, 43] //nome, posição, defesa, ataque, 
let id389630 = ['Yuri Alberto', 'Atacante', time8133728, 12, 50]

function separarJogadores (atleta){
    let timeDoCabra = atleta[2] //descobre o time do jogador em parametro
    timeDoCabra.push(atleta) //add o jogador a ultima posição do time
    console.log(timeDoCabra);
}

//separarJogadores(id661906), separarJogadores(id420852), separarJogadores(id626241), separarJogadores(id304542)
//separarJogadores(id502879), separarJogadores(id429610), separarJogadores(id784680), separarJogadores(id389630)

function somarDefesa(time) {
    tamanho = time.length - 1 //pega as pocisões dos jogadores do time. para fazer a consulta do atributo defesas
    let defesaAtleta = 0 
    for (c = tamanho; 2 != tamanho; tamanho--) {
        atleta = time[tamanho]
        defesaAtleta += atleta[3]
    }

    time[1] = defesaAtleta
    
    return time[1]
}

function somarAtaque(time) {
    tamanho = time.length - 1 //pega as pocisões dos jogadores do time. para fazer a consulta do atributo ataque
    let AtaqueAtleta = 0 
    for (c = tamanho; 2 != tamanho; tamanho--) {
        atleta = time[tamanho]
        AtaqueAtleta += atleta[4]
    }

    time[2] = AtaqueAtleta
    
    return time[2]
}
/*
DefesaFlamengo = somarDefesa(time9390120)
AtaqueFlamengo = somarAtaque(time9390120)

DefesaCorinthians = somarDefesa(time8133728)
AtaqueCorinthians = somarAtaque(time8133728)
*/

function jogar() {
    console.log(`time do ${time9390120[0]} D-${DefesaFlamengo}, A-${AtaqueFlamengo}`)
    console.log(`time do ${time8133728[0]} D-${DefesaCorinthians}, A-${AtaqueCorinthians}`)
    let d1 = DefesaFlamengo 
    let a1 = AtaqueFlamengo
    let d2 = DefesaCorinthians 
    let a2 = AtaqueCorinthians

    if (a1 + d1 > a2 + d2) {
        console.log(`o ${time9390120[0]} tem mais chances de vitoria`);
        if (a1 > d2) {
            console.log(`o ataque do ${time9390120[0]} segue pressionando`)
        }
    } else {
        console.log(`o ${time8133728[0]} tem mais chances de vitoria`);
        
        if (a2 > d1) {
            console.log(`o ataque do ${time8133728[0]} segue pressionando`)
        }
    } 
}
