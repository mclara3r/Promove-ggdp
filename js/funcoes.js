

let desempenho = 1.5
let nivel
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
   pontuRema = parseFloat(document.getElementById('pontuRema').value) || 0

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
    const mesAno = document.getElementById('mesAfastamento').value;
    const quantidade = parseInt(document.getElementById('qtdAfastamento').value);

    if (!mesAno || isNaN(quantidade)) {
        alert("Preencha os campos corretamente.");
        return;
    }

    //Verifica se já existe afastamento nesse mês
    const existe = listaAfastamentos.some(a => a.mesAno ===mesAno);
    if(existe) {
        alert("Já existe afastamento lançado para este mês. Remova ntes de adicionar novamente.")
        return
    }

    listaAfastamentos.push({mesAno, quantidade});
    atualizarResumoAfastamento();
    limpar_afast()
}

function atualizarResumoAfastamento() {
    const resumoDiv = document.getElementById("resumoAfastamento");
    resumoDiv.innerHTML = '<h4>Afastamento:</h4>';
    resumoDiv.style.display = "block"

    listaAfastamentos.forEach((item, index) => {
        const [ano, mes] = item.mesAno.split("-");
        resumoDiv.innerHTML += `
        <p>
            Mês/Ano: ${mes}/${ano} | Quantidade: ${item.quantidade}
            <button onclick="removerAfastamento(${index})">Remover</button>
        </p>
        `;
    }) 
   
}

function removerAfastamento(index) {
    listaAfastamentos.splice(index, 1);
    if(listaAfastamentos.length === 0) {
        document.getElementById("resumoAfastamento").style.display = "none";
    } else{
    atualizarResumoAfastamento();
}
}


function limpar_afast() {
    document.getElementById('mesAfastamento').value = "";
    document.getElementById('qtdAfastamento').value = "";
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
    listarAperfeicoamentos = []
    document.getElementById("resumoAperfeicoamento").style.display = "none"
}

// -------------------------Funções para Gerar Carreira ----------------------------------

function gerarCarreira() {

    const dataInicioStr = document.getElementById('dataInicio').value;
    const dataInicioObj = criarDataLocal(dataInicioStr);
    if(!dataInicioObj) {
        alert("A data de início é inválida.");
        return
    }
    let dataAtual = new Date(dataInicioObj.getFullYear(), dataInicioObj.getMonth(),1)

    let somaAcumulada = pontuRema;
    let linhasTabelaHTML = "";
    let dadosCarreira = [];

    //agrupar aperfeiçoamentos por mês/ano
    const aperfPorMes = {}
    listarAperfeicoamentos.forEach(({data, pontuacao}) => {
        const [ano, mes] = data.split("-"); 
        const chave = `${ano}-${mes}`;
        aperfPorMes[chave] = (aperfPorMes[chave] || 0) + pontuacao
    });

    //criar loop mensal (até 400 meses = 33 anos, arbitrário)
    
    for (let i = 0; i<400; i++) {
        const dia = dataAtual.getDate();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
        const ano = dataAtual.getFullYear();
        const chaveMes = `${ano}-${mes}`;

        //valores básicos

        let efetivo = 0;
        let desempenhoValor = 0;
        let aperfeicoamento = 0;

        if (dia === 1) {
            //soma padrão
            efetivo = 0.2;
            desempenhoValor = 1.5;

            //pega afastamentos do mês anterior
            const mesAnterior = dataAtual.getMonth() === 0 ? 12 : dataAtual.getMonth();
            const anoAnterior = dataAtual.getMonth() === 0 ? ano -1 : ano;
            const chaveAnterior = `${anoAnterior}-${String(mesAnterior).padStart(2,"0")}`
            const diasAfastados = listaAfastamentos.find(a => a.mesAno === chaveAnterior)?.quantidade || 0;

            //aplica desconto 
            const descontoEfetivo = (0.2/30) * diasAfastados;
            const descontoDesempenho = (1.5/30) * diasAfastados;
            efetivo = Math.max(0, efetivo - descontoEfetivo);
            desempenhoValor = Math.max(0, desempenhoValor - descontoDesempenho);

            //aperfeiçoamentos do mês anterior
            aperfeicoamento = aperfPorMes[chaveAnterior] || 0;

            //soma total
            const soma345 = efetivo + desempenhoValor + aperfeicoamento;
            const titulacao = 0;
            const assuncaoMensal = 0;
            const assuncaoUnica = 0;
            const soma6789 = soma345 + titulacao + assuncaoMensal + assuncaoUnica;

            somaAcumulada += soma6789

            // salvar linha

            dadosCarreira.push({
                data: dataAtual.toISOString().split("T")[0],
                aperfeicoamento,
                somaDia: soma6789,
                somaAcumulada
            });
            const dataFormatada = formatarDataBR(dataAtual);
            linhasTabelaHTML += `
            <tr>
                <td>${dataFormatada}</td>
                <td>${diasAfastados}</td>
                <td>${efetivo.toFixed(4)}</td>
                <td>${desempenhoValor.toFixed(4)}</td>
                <td>${aperfeicoamento.toFixed(4)}</td>
                <td>${soma345.toFixed(4)}</td>
                <td>${titulacao.toFixed(4)}</td>
                <td>${assuncaoMensal.toFixed(4)}</td>
                <td>${assuncaoUnica.toFixed(4)}</td>
                <td>${soma6789.toFixed(4)}</td>
                <td>${somaAcumulada.toFixed(4)}</td>
            </tr>`
        }

        //avança para próximo mês
        dataAtual.setMonth(dataAtual.getMonth() + 1);


    }
    
       

    calcularEvolucao(dataInicioObj, dadosCarreira);

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
                        <th>Assunção de Resp. - Mensal</th>
                        <th>Assunção de Resp. - Única</th>
                        <th>Soma Total</th>
                        <th>Pontuação remanescente e acumulada</th>
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
        document.getElementById('tabelaEvolucao').innerHTML = "";
    }

    //--------------------------Função Evolução--------------------------------------------------------------------------------------

    function calcularEvolucao (dataInicio, dadosCarreira) {
        let pontuacaoAcumulada = pontuRema;
        let aperfeicoamentoAcumulado = 0;
        let evolucaoEncontrada = false;
        let resultadoHTML = "";

        const niveis = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S"];
        const nivelAtualIndex = niveis.indexOf(nivel);
        const proximoNivel = nivelAtualIndex >= 0 && nivelAtualIndex < niveis.length-1 ? niveis[nivelAtualIndex+1] : "-"
        
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
                
                let linhasTabela = "";
                if(status === "Apto") {
                  linhasTabela = `
                  <tr>
                        <td>${status}</td>
                        <td>${proximoNivel}</td>
                        <td>${dataPontuacao}</td>
                        <td>${dataImplementacaoFormatada}</td>
                        <td>${intersticio}</td>
                        <td>${pontuacaoAcumulada.toFixed(4)}</td>
                        <td>${pontuacaoRemanescente}</td>
                        <td>-</td>
                    </tr>`  
                } else {
                    linhasTabela = `
                    <tr>
                        <td>${status}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>Não concluiu a carga horária mínima de 60 horas no interstício de evolução para o requisito Aperfeiçoamento.</td>
                    </tr>
                    `
                }

                resultadoHTML = `
                <table class = "table table-bordered text-center">
                    <thead class="table-success">
                        <tr>
                            <th>Status</th>
                            <th>Próximo Nível</th>
                            <th>Data que atingiu a Pontuação</th>
                            <th>Data de Implementação</th>
                            <th>Interstício de Evolução</th>
                            <th>Pontuação Atingida</th>
                            <th>Pontuação Remanescente</th>
                            <th>Observação</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${linhasTabela}
                    </tbody>
                </table>
                `;
            }
        }
        document.getElementById("tabelaEvolucao").innerHTML = resultadoHTML;

    }
