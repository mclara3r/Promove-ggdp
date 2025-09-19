

let desempenho = 1.5
let nivel
let dataInicio
let pontuRema
let listaAfastamentos = []

function criarDataLocal(dataStr) {
    const [ano, mes, dia] = dataStr.split("-").map(Number);
    return new Date(ano, mes - 1, dia, 12);
}

function formatarDataBR(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`
}

function enviar_1() {
   nivel = document.getElementById('nivel').value
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

function adicionarAfastamento() {
    const data = document.getElementById('dataAfastamento').value;
    const quantidade = parseInt(document.getElementById('qtdAfastamento').value);

    if (!data || isNaN(quantidade)) {
        alert("Preencha os campos corretamente.");
        return;
    }

    listaAfastamentos.push({data, quantidade});
    atualizarResumoAfastamento();
}

function atualizarResumoAfastamento() {
    const resumoDiv = document.getElementById("resumoAfastamento");
    resumoDiv.innerHTML = '<h4>Afastamento:</h4>';
    resumoDiv.style.display = "block"

    listaAfastamentos.forEach((item, index) => {
        const dataFormatada = formatarDataBR(criarDataLocal(item.data))
        resumoDiv.innerHTML += `
        <p>
            Data: ${dataFormatada} | Quantidade: ${item.quantidade}
            <button onclick="removerAfastamento(${index})">Remover</button>
        </p>
        `;
    }) 
   
}

function removerAfastamento(index) {
    listaAfastamentos.splice(index, 1);
    atualizarResumoAfastamento();
}

function limpar_2() {
    document.getElementById('dataAfastamento').value = "";
    document.getElementById('qtdAfastamento').value = "";
}


function gerarCarreira() {

    const dataInicioStr = document.getElementById('dataInicio').value;
    const partes = dataInicioStr.split('-');
    const dataInicio = new Date(partes[0], partes[1]-1, partes[2]) 
    let somaAcumulada = 0;
    let dataAtual = new Date(dataInicio);
    let linhasTabelaHTML = "";

    //agrupar afastamentos por mês
    const afastamentosPorMes = {};
    listaAfastamentos.forEach(({ data, quantidade}) => {
        const [ano, mes] = data.split("-");
        const chave = `${ano}-${mes}`;
        afastamentosPorMes[chave] = (afastamentosPorMes[chave] || 0) + quantidade;
    });

    for (let i = 0; i< 4000; i++) {

        //restrições no 1º mês
        const mesAtual = dataAtual.getMonth();
        const anoAtual = dataAtual.getFullYear();
        const mesInicio = dataInicio.getMonth();
        const anoInicio = dataInicio.getFullYear();

        const mesmaData = mesAtual === mesInicio && anoAtual === anoInicio;
        const diaInicio = dataInicio.getDate();

        let computarEfetivoEDesempenho = true;

        if (mesmaData && (diaInicio === 1 || diaInicio > 15)) {
            computarEfetivoEDesempenho = false
        }

        //soma afastamentos 

        const afastamentoAtual = listaAfastamentos.find(a => {
            const dataAfast = criarDataLocal(a.data);
            return dataAfast.toDateString() === dataAtual.toDateString();
        });

        const afastamento = afastamentoAtual ? afastamentoAtual.quantidade : 0;
        const dataFormatada = formatarDataBR(dataAtual)
        const dia = dataAtual.getDate();

        //Inicializa os valores
        let efetivo = 0
        let desempenhoValor = 0

        if (dia === 1 && computarEfetivoEDesempenho) {
            efetivo = 0.2
            desempenhoValor = 1.5

            //mês anterior
            const mesAnterior = dataAtual.getMonth() === 0 ? 11 : dataAtual.getMonth() -1;
            const anoAnterior = dataAtual.getMonth() === 0 ? dataAtual.getFullYear() - 1 : dataAtual.getFullYear();
            const chaveMesAnterior = `${anoAnterior}-${String(mesAnterior + 1).padStart(2, '0')}`;

            const diasAfastatados = afastamentosPorMes[chaveMesAnterior] || 0;

            //aplicar descontos
            const descontoEfetivo = (0.2/30) * diasAfastatados;
            const descontoDesempenho = (1.5/30) * diasAfastatados;


            efetivo -= descontoEfetivo;
            desempenhoValor -= descontoDesempenho;

            //Garante que não fique negativo
            efetivo = Math.max(0, efetivo);
            desempenhoValor = Math.max(0,desempenhoValor);
        }


        const aperfeicoamento = 0
        const soma345 = efetivo + desempenhoValor + aperfeicoamento
        const titulacao = 0
        const assuncaoMensal = 0
        const assuncaoUnica = 0
        const soma6789 = soma345 + titulacao + assuncaoMensal + assuncaoUnica;

        somaAcumulada += soma6789;

        
        

        linhasTabelaHTML += `
            <tr>
                <td>${dataFormatada}</td>
                <td>${afastamento}</td>
                <td>${efetivo.toFixed(4)}</td>
                <td>${desempenhoValor.toFixed(4)}</td>
                <td>${aperfeicoamento.toFixed(4)}</td>
                <td>${soma345.toFixed(4)}</td>
                <td>${titulacao.toFixed(1)}</td>
                <td>${assuncaoMensal.toFixed(4)}</td>
                <td>${assuncaoUnica.toFixed(4)}</td>
                <td>${soma6789.toFixed(4)}</td>
                <td>${somaAcumulada.toFixed(4)}</td>
            </tr>
`;



        //Avança um dia
        dataAtual.setDate(dataAtual.getDate() + 1);


    }

    const tabelaCompleta = `
        <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ccc; margin-top: 20px;">
            <table class="table table-bordered text-center" style="width: 100%;">
                <thead class="cabecalho-verde">
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