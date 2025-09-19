
let desempenho = 1.5;
let nivel;
let dataInicio;
let pontuRema;

function enviar_1() {
   nivel = document.getElementById('nivel').value;
   dataInicio = document.getElementById('dataInicio').value;
   pontuRema = document.getElementById('pontuRema').value;

   const partesData = dataInicio.split("-");
   const dataFormatada = partesData[2] + "/" + partesData[1] + "/" + partesData[0];

   document.getElementById("mostrarNivel").textContent = "Nivel Atual: " + nivel;
   document.getElementById("mostrarDataInicio").textContent = "Data de Início: " + dataFormatada;
   document.getElementById("mostrarpontuRema").textContent = "Pontuação Remasnescente: "+ pontuRema;
   document.getElementById('quadroDados').style.display = "block";
   console.log("Nível: Atual:", nivel);
   console.log("Data de início: ", dataInicio);
   console.log("Pontuação Resmascente: ", pontuRema);
}

function limpar_1() {
    document.getElementById('nivel').value = "";
    document.getElementById('dataInicio').value = "";
    document.getElementById('pontuRema').value = "";
    document.getElementById("quadroDados").style.display = "none";
}

function gerarCarreira() {
    const dataInicioStr = document.getElementById('dataInicio').value;
    const partes = dataInicioStr.split('-');
    const dataInicio = new Date(partes[0], partes[1]-1, partes[2]);

    let somaAcumulada = 0;
    let dataAtual = new Date(dataInicio);
    let linhasTabelaHTML = "";

    for (let i = 0; i < 4000; i++) {
        const dataFormatada = dataAtual.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        const dia = dataAtual.getDate();
        const efetivo = dia === 1 ? 0.2 : 0;
        const desempenho = dia === 1 ? 1.5 : 0;
        const aperfeicoamento = 0;
        const soma345 = efetivo + desempenho + aperfeicoamento;

        const titulacao = 0;
        const assuncaoMensal = 0;
        const assuncaoUnica = 0;
        const soma6789 = soma345 + titulacao + assuncaoMensal + assuncaoUnica;

        somaAcumulada += soma6789;

        linhasTabelaHTML += `
            <tr>
                <td>${dataFormatada}</td>
                <td></td>
                <td>${efetivo.toFixed(1)}</td>
                <td>${desempenho.toFixed(1)}</td>
                <td>${aperfeicoamento.toFixed(1)}</td>
                <td>${soma345.toFixed(1)}</td>
                <td>${titulacao.toFixed(1)}</td>
                <td>${assuncaoMensal.toFixed(1)}</td>
                <td>${assuncaoUnica.toFixed(1)}</td>
                <td>${soma6789.toFixed(1)}</td>
                <td>${somaAcumulada.toFixed(1)}</td>
            </tr>
        `;

        dataAtual.setDate(dataAtual.getDate() + 1);
    }

    const tabelaCompleta = `
        <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ccc; margin-top: 20px;">
            <table class="table table-bordered text-center" style="width: 100%;">
                <thead style="background-color: #003b19; color: #edebe7;">
                    <tr>
                        <th>Data</th>
                        <th>Afastamentos</th>
                        <th>Efetivo Exercício</th>
                        <th>Desempenho</th>
                        <th>Aperfeiçoamento</th>
                        <th>Soma Critérios Obrigatórios</th>
                        <th>Titulação Acadêmica</th>
                        <th>Assunção de Responsabilidade - Mensal</th>
                        <th>Assunção de Responsabilidade - Única</th>
                        <th>Soma Total</th>
                        <th>Soma Acumulada</th>
                    </tr>    
                </thead>
                <tbody> 
                    ${linhasTabelaHTML}
                </tbody>
            </table>
        </div>
    `;

    document.getElementById("tabelaCarreira").innerHTML = tabelaCompleta;
}
