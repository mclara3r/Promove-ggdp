
let mes_t = 1
let desempenho = 1.5
let nivel
let dataInicio
let pontuRema

function iniciar() {
   nivel = document.getElementById('nivel')
   dataInicio = document.getElementById('dataInicio')
   pontuRema = document.getElementById('pontuRema')
   console.log(nivel)
   console.log(dataInicio)
   console.log(pontuRema)
}


function iniciarCarreira() {
    for (let i = 0; i < 720; i++ ) {
        carreira[i] = []
        for (let j = 0; j <= 8; j++ ) {
            carreira[i][0] = mes_t
            carreira[i][1] = 0.2
            carreira[i][2] = desempenho/6
            carreira[i][3] = aperf/24
            carreira[i][4] = mes_t
            carreira[i][5] = mes_t
            carreira[i][6] = mes_t
            carreira[i][7] = mes_t
            carreira[i][8] = mes_t
            

        }
    }
}

