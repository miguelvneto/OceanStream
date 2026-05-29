document.addEventListener('DOMContentLoaded', async function() {
    // Variável global para armazenar os dados brutos e estado da ordenação
    let dadosTabelaRaw = null;
    let ordemAtual = 'desc'; // 'desc' para mais recente primeiro, 'asc' para mais antigo primeiro
    
    // GERA DATA PLACEHOLDER
    const hoje = new Date();
    const ontem = new Date(hoje)
    ontem.setDate(hoje.getDate() - 1);

    // Função para formatar a data no formato YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Função para converter m/s para nós (kn)
    function msToKnots(valor) {
        if (valor === null || valor === undefined || valor === '' || isNaN(Number(valor))) {
            return null;
        }
        // 1 m/s = 1.94384 nós
        return Number(valor) * 1.94384;
    }

    // Função para formatar valores numéricos (sem unidade)
    function formatarValor(valor) {
        // Se for null, undefined, string vazia ou não for um número válido
        if (valor === null || valor === undefined || valor === '' || isNaN(Number(valor))) {
            return '-';
        }
        
        // Converte para número e formata com 2 casas decimais
        const numero = Number(valor);
        return numero.toFixed(2);
    }

    // Função para atualizar o ícone da seta
    function atualizarSetaOrdenacao() {
        const setaElement = document.getElementById('ordenar-seta');
        if (setaElement) {
            if (ordemAtual === 'desc') {
                setaElement.innerHTML = '▼'; // Seta para baixo (decrescente)
                setaElement.style.transform = 'scale(1)';
            } else {
                setaElement.innerHTML = '▲'; // Seta para cima (crescente)
                setaElement.style.transform = 'scale(1)';
            }
        }
    }

    // Função para alternar a ordenação
    function alternarOrdenacao() {
        // Alterna entre 'desc' e 'asc'
        ordemAtual = ordemAtual === 'desc' ? 'asc' : 'desc';
        
        // Atualiza o ícone da seta
        atualizarSetaOrdenacao();
        
        // Re-renderiza a tabela com a nova ordenação
        if (dadosTabelaRaw) {
            renderizarTabelaComOrdenacao(dadosTabelaRaw, ordemAtual);
        }
    }

    document.getElementById('start-date').value = formatDate(ontem);
    document.getElementById('end-date').value = formatDate(hoje);

    const ctxCurrent = document.getElementById('currentGraph').getContext('2d');
    const currentGraph = new Chart(ctxCurrent, {
        type: 'line',
        data: {
            labels: [], // Eixos X - timestamps
            datasets: [{
                label: 'Velocidade de vento (kn)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
                hidden: false,
            }, {
                label: 'Direção de vento (°)',
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                data: [],
                hidden: true,
            }, {
                label: 'Rajada (kn)',
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: [],
                hidden: true,
            }, {
                label: 'Precipitação (mm)',
                fill: false,
                backgroundColor: 'rgb(153, 102, 255)',
                borderColor: 'rgb(153, 102, 255)',
                data: [],
                hidden: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: function(tooltipItems, data) {
                        const date = new Date(tooltipItems[0].xLabel);
                        date.setHours(date.getHours() + 3);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');

                        return `${day}/${month}/${year} - ${hours}:${minutes}`; // dd/mm/yyyy hh:mm
                    },
                    label: function(tooltipItem, data) {
                        let label = data.datasets[tooltipItem.datasetIndex].label || '';
                        let value = tooltipItem.yLabel;
                        
                        if (label.includes('Velocidade') || label.includes('Rajada')) {
                            if (value !== null && !isNaN(value)) {
                                return label + ': ' + Number(value).toFixed(2);
                            }
                        } else if (label.includes('Direção')) {
                            if (value !== null && !isNaN(value)) {
                                return label + ': ' + Number(value).toFixed(0);
                            }
                        } else if (label.includes('Precipitação')) {
                            if (value !== null && !isNaN(value)) {
                                return label + ': ' + Number(value).toFixed(2);
                            }
                        }
                        return label + ': ' + value;
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'hour',
                        stepSize: 8,
                        displayFormats: {hour: 'D/MM - HH\\h'},
                        parser: function(label) {
                            const date = new Date(label);
                            date.setHours(date.getHours() + 3);
                            return date;
                        }
                    },
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Data e Hora'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Valores'
                    }
                }]
            }
        }
    });

    document.getElementById('update-graph').addEventListener('click', async (event) => {
        const nome_tabela = event.target.name;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        const dados = await organizaDadosParaGrafico_estacao(nome_tabela, startDate, endDate);
        
        fetchData(currentGraph, 'estacao', dados);
        atualizarTabela(dados);
    });

    // Adicionar evento de clique na coluna Data/Hora
    const ordenarDataHeader = document.getElementById('ordenar-data');
    if (ordenarDataHeader) {
        ordenarDataHeader.addEventListener('click', alternarOrdenacao);
    }

    document.getElementById('vel-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[0].hidden = !this.checked;
        currentGraph.update();
    });

    document.getElementById('dir-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[1].hidden = !this.checked;
        currentGraph.update();
    });

    document.getElementById('gust-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[2].hidden = !this.checked;
        currentGraph.update();
    });

    document.getElementById('rain-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[3].hidden = !this.checked;
        currentGraph.update();
    });

    function fetchData(graph, type, data) {
        graph.data.labels = converterVetorParaFormatoISO(data[0]);

        if (type === 'estacao') {
            // Converter velocidade de m/s para kn
            const velocidadeConvertida = data[1].map(v => msToKnots(v));
            // Direção permanece igual
            // Converter rajada de m/s para kn
            const rajadaConvertida = data[3].map(r => msToKnots(r));
            // Precipitação permanece em mm
            
            graph.data.datasets[0].data = velocidadeConvertida;
            graph.data.datasets[1].data = data[2];
            graph.data.datasets[2].data = rajadaConvertida;
            graph.data.datasets[3].data = data[4];
        }

        graph.update();
    }

    // Função para renderizar a tabela com ordenação específica
    function renderizarTabelaComOrdenacao(linhas, ordem) {
        const tabelaBody = document.querySelector('#dadosTabela tbody');
        tabelaBody.innerHTML = '';

        if (linhas.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5" style="text-align: center;">Nenhum dado disponível para o período selecionado</td>';
            tabelaBody.appendChild(row);
            return;
        }

        // Criar uma cópia do array para ordenar
        const linhasOrdenadas = [...linhas];
        
        // Ordenar baseado na ordem selecionada
        if (ordem === 'asc') {
            // Crescente (mais antigo primeiro)
            linhasOrdenadas.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        } else {
            // Decrescente (mais recente primeiro)
            linhasOrdenadas.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }

        // Renderiza a tabela
        linhasOrdenadas.forEach(item => {
            let dataFormatada = '-';

            try {
                const dataHora = new Date(item.timestamp);
                if (!isNaN(dataHora.getTime())) {
                    dataFormatada = dataHora.toLocaleString('pt-BR');
                }
            } catch (e) {
                console.warn('Erro ao formatar data:', item.timestamp);
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${dataFormatada}</td>
                <td>${formatarValor(item.velocidade)}</td>
                <td>${formatarValor(item.direcao)}</td>
                <td>${formatarValor(item.rajada)}</td>
                <td>${formatarValor(item.precipitacao)}</td>
            `;

            tabelaBody.appendChild(row);
        });
    }

    // Função para atualizar a tabela com os dados (convertidos para nós, sem unidades no valor)
    function atualizarTabela(dados) {
        const [timestamps, velocidades, direcoes, rajadas, precipitacoes] = dados;

        if (timestamps.length === 0) {
            dadosTabelaRaw = [];
            renderizarTabelaComOrdenacao([], ordemAtual);
            return;
        }

        // Monta estrutura unificada com conversão para nós
        const linhas = timestamps.map((ts, i) => ({
            timestamp: ts,
            velocidade: msToKnots(velocidades[i]),
            direcao: direcoes[i],
            rajada: msToKnots(rajadas[i]),
            precipitacao: precipitacoes[i]
        }));

        // Armazenar os dados brutos para reordenação
        dadosTabelaRaw = linhas;
        
        // Renderizar com a ordem atual
        renderizarTabelaComOrdenacao(linhas, ordemAtual);
    }

    // CARREGAR GRÁFICO E TABELA JUNTO COM A PÁGINA
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const nome_tabela = 'TU_Estacao_Meteorologica';

    const dados = await organizaDadosParaGrafico_estacao(nome_tabela, startDate, endDate);
    fetchData(currentGraph, 'estacao', dados);
    atualizarTabela(dados);
    
    // Inicializar a seta com o estado padrão (decrescente)
    atualizarSetaOrdenacao();
});
