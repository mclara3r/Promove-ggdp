
let mes_t = 1
let desempenho = 1.5
let nivel
let dataInicio
let pontuRema

function enviar_1() {
   nfivel = document.getElementById('nivel').value
   dataInicio = document.getElementById('dataInicio').value
   pontuRema = document.getElementById('pontuRema').value

   const partesData = dataInicio.split("-");
   const dataFormatada = partesData[2] + "/" + partesData[1] + "/" + partesData[0]

   document.getElementById("mostrarNivel").textContent = "Nivel Atual: " + nivel;
   document.getElementById("mostrarDataInicio").textContent = "Data de Início: " + dataFormatada;
   document.getElementById("mostrarpontuRema").textContent = "Pontuação Remasnescente: "+ pontuRema;
   document.getElementById('quadroDados').style.display = "block";
   console.log("Nível: Atual:", nivel)
   console.log("Data de início: ", dataInicio)
   console.log("Pontuação Resmascente: ", pontuRema)
}

function limpar_1() {
    document.getElementById('nivel').value = "";
    document.getElementById('dataInicio').value = "";
    document.getElementById('pontuRema').value = "";
    document.getElementById("quadroDados").style.display = "none"
}



function iniciarCarreira() {
    for (let i = 0; i < 720; i++ ) {
        carreira[i] = []
        for (let j = 0; j <= 8; j++ ) {
            carreira[i][0] = 
         
            

        }
    }
}

