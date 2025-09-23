

let desempenho = 1.5
let nivel
let dataInicio
let pontuRema
let listaAfastamentos = []
let listarAperfeicoamentos = []

//-------------------Funções de Data -------------------

function criarDataLocal(dataStr) {
    // aceitar o formato yyyy-mm-dd ou dd/mm/yyyy
    if(dataStr.includes("-")) {
        const [ano, mes, dia] = dataStr.split("-").map(Number)
        return new Date(ano, mes-1, dia, 12)
    } else if (dataStr.includes("/")) {
        const [ano, mes, dia] = dataStr.split("/").map(Number)
        return new Date(ano, mes-1, dia, 12)
    }
    return null
}

function formatarDataBR(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`
}

// ---------------------------Dados iniciais do servidor ---------------------------------------------------

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

}

function limpar_1() {
    document.getElementById('nivel').value = "";
    document.getElementById('dataInicio').value = "";
    document.getElementById('pontuRema').value = "";
    document.getElementById("quadroDados").style.display = "none"
}

//------------------------Função Afastamentos -----------------------------------------------------------------------------

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

function limpar_afast() {
    document.getElementById('dataAfastamento').value = "";
    document.getElementById('qtdAfastamento').value = "";
    listarAperfeicoamentos = []
    document.getElementById("resumoAfastamento").style.display = "none"
}

//----------------------Função para Aperfeiçoamentos------------------------------------

function adicionarAperfeicoamento() {
    const data = document.getElementById('dataAperf').value;
    const carga = parseFloat(document.getElementById('carga').value);

    if (!data || isNaN(carga)) {
        alert("Preencha os campos corretamente.");
        return
    }

    if(carga < 4) {
        alert("A carga horária deve ser maior ou igual a 4 horas.");
        return
    }


    const pontuacao = 0.09 * carga;

    listarAperfeicoamentos.push({ data, carga, pontuacao});
    atualizarResumoAperfeicoamento();

}

function atualizarResumoAperfeicoamento() {
    const resumoDiv = document.getElementById('resumoAperfeicoamento');
    resumoDiv.innerHTML = '<h4>Aperfeiçoamentos:</h4>';
    resumoDiv.style.display = 'block'

    listarAperfeicoamentos.forEach((item, index) => {
        const dataFormatada = formatarDataBR(criarDataLocal(item.data));
        resumoDiv.innerHTML += `
        <p>
            Data: ${dataFormatada} | Carga Horária: ${item.carga}h | Pontuação: ${item.pontuacao.toFixed(4)}
            <button onclick="removerAperfeicoamento(${index})">Remover</button>
        </p>
        `; 
    })
}

function removerAperfeicoamento(index) {
    listarAperfeicoamentos.splice(index, 1);
    atualizarResumoAperfeicoamento();
}

function limpar_aperf() {
    document.getElementById('dataAperf').value = "";
    document.getElementById('carga').value = "";
    listaAfastamentos = []
    document.getElementById("resumoAperfeicoamento").style.display = "none"
}

// -------------------------Funções para Gerar Carreira ----------------------------------

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

    let dadosCarreira = [];
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


            efetivo = Math.max(0, efetivo - descontoEfetivo)
            desempenhoValor = Math.max(0, desempenhoValor - descontoDesempenho);

        }


        const aperfeicoamentoAtual = listarAperfeicoamentos.find(a => {
            const dataAperf = criarDataLocal(a.data);
            return dataAperf.toDateString() === dataAtual.toDateString();
        })
        const aperfeicoamento = aperfeicoamentoAtual ? parseFloat(aperfeicoamentoAtual.pontuacao) : 0;
        const soma345 = efetivo + desempenhoValor + aperfeicoamento
        const titulacao = 0
        const assuncaoMensal = 0
        const assuncaoUnica = 0
        const soma6789 = soma345 + titulacao + assuncaoMensal + assuncaoUnica;

        const somaDia = soma6789
        somaAcumulada += somaDia

        dadosCarreira.push({
            data: dataAtual.toISOString().split("T")[0], //Guardar ISO
            aperfeicoamento,
            somaDia,
            somaAcumulada
        })
        

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

    calcularEvolucao(dataInicio, dadosCarreira);

    const tabelaCompleta = `
        <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ccc; margin-top: 20px;">
            <table class="table table-bordered text-center" style="width: 100%;">
                <thead class="table-success">
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


    function limparTabelaCarreira() {
        document.getElementById('tabelaCarreira').innerHTML = "";
    }

    //--------------------------Função Evolução--------------------------------------------------------------------------------------

    function calcularEvolucao (dataInicio, dadosCarreira) {
        let pontuacaoAcumulada = 0;
        let aperfeicoamentoAcumulado = 0;
        let evolucaoEncontrada = false;
        let resultadoHTML = "";

        for (let i = 0; i < dadosCarreira.length; i++) {
            const linha = dadosCarreira[i];
            const data = criarDataLocal(linha.data);

            pontuacaoAcumulada += (linha.somaDia || 0)
            aperfeicoamentoAcumulado += (linha.aperfeicoamento || 0)


            const mesesDecorridos = (data.getFullYear() - dataInicio.getFullYear()) *12 + (data.getMonth() - dataInicio.getMonth());

            let tipoEvolucao = null;
            if(mesesDecorridos >= 12 && pontuacaoAcumulada >= 96) {
                tipoEvolucao = '96';
            } else if (mesesDecorridos >= 18 && pontuacaoAcumulada >= 48) {
                tipoEvolucao = "48"
            }

            if (tipoEvolucao && !evolucaoEncontrada) {
                evolucaoEncontrada = true;

                const dataPontuacao = formatarDataBR(data);
                const dia = data.getDate();
                //data de implementação
                const dataImplementacao = new Date(data);
                dataImplementacao.setMonth(data.getMonth() + 1)
                dataImplementacao.setDate(1)

                const dataImplementacaoFormatada = formatarDataBR(dataImplementacao);

                const intersticio = `${mesesDecorridos} meses`;
                const pontuacaoRemanescente = (pontuacaoAcumulada -48).toFixed(4)
                // Recalcular aperfeiçoamento acumulado até o ponto de evolução
                let aperfTotalIntersticio = 0;
                for (let j = 0; j<=i; j++) {
                    aperfTotalIntersticio += (dadosCarreira[j].aperfeicoamento || 0)
                }
                const arredondado = Math.round(aperfTotalIntersticio*100) / 100
                console.log("Aperfeiçoamento acumulado até evolução:", aperfTotalIntersticio)
                const status = arredondado >= 5.4 ? "Apto" : "Não apto";
                const observacao = arredondado >= 5.4 ? "–" : "Não atingiu a pontuação mínima do requisito Aperfeiçoamento";

                resultadoHTML = `
                <table class = "table table-bordered text-center">
                    <thead class="table-success">
                        <tr>
                            <th>Pontuação Atingida</th>
                            <th>Data que atingiu a Pontuação</th>
                            <th>Data de Implementação</th>
                            <th>Interstício de Evolução</th>
                            <th>Pontuação Remanescente</th>
                            <th>Status</th>
                            <th>Observação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${pontuacaoAcumulada.toFixed(4)}</td>
                            <td>${dataPontuacao}</td>
                            <td>${dataImplementacaoFormatada}</td>
                            <td>${intersticio}</td>
                            <td>${pontuacaoRemanescente}</td>
                            <td>${status}</td>
                            <td>${observacao}</td>
                        </tr>
                    </tbody>
                </table>
                `;
            }
        }
        document.getElementById("tabelaEvolucao").innerHTML = resultadoHTML;

    }
