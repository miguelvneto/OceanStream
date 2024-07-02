document.addEventListener('DOMContentLoaded', async function() {
    // #######################################################################
    // GERA DATA PLACEHOLDER
    const today = new Date();
    const amanha = new Date(today);
    const ontem = new Date(today)
    amanha.setDate(today.getDate() + 1);
    ontem.setDate(today.getDate() - 1);

    // Função para formatar a data no formato YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    document.getElementById('start-date').value = formatDate(ontem);
    document.getElementById('end-date').value = formatDate(amanha);
    document.getElementById('wave-start-date').value = formatDate(ontem);
    document.getElementById('wave-end-date').value = formatDate(amanha);
    // document.getElementById('wave-start-date').value = '2024-06-15';
    // document.getElementById('wave-end-date').value = '2024-06-17';

    document.getElementById('current-cell-select').value = '11';

    // #######################################################################
    // CRIA GRÁFICOS
    const ctxCurrent = document.getElementById('currentGraph').getContext('2d');
    const currentGraph = new Chart(ctxCurrent, {
        type: 'line',
        data: {
            labels: [], // Eixos X - timestamps
            datasets: [{
                label: 'Velocidade (Kt)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
                hidden: false,
            }, {
                label: 'Direção (°)',
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
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
                        displayFormats: {hour: 'D/MM HH'}
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
                        // display: true,
                        // labelString: 'Valor'
                    },
                    ticks: {beginAtZero: true}
                }]
            }
        }
    });

    const ctxWave = document.getElementById('waveGraph').getContext('2d');
    const waveGraph = new Chart(ctxWave, {
        type: 'line',
        data: {
            labels: [], // Eixos X - timestamps
            datasets: [{
                label: 'Altura (m)',
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: [],
                fill: false,
                hidden: false,
            }, {
                label: 'Período (s)',
                fill: false,
                backgroundColor: 'rgb(153, 102, 255)',
                borderColor: 'rgb(153, 102, 255)',
                data: [],
                hidden: true,
            }, {
                label: 'Direção (°)',
                fill: false,
                backgroundColor: 'rgb(255, 159, 64)',
                borderColor: 'rgb(255, 159, 64)',
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
                        displayFormats: {hour: 'D/MM HH'}
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
                        // display: true,
                        // labelString: 'Valor'
                    },
                    ticks: {beginAtZero: true}
                }]
            }
        }
    });

    document.getElementById('update-graph').addEventListener('click', async (event) => {
        const nome_tabela = event.target.name;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        const dados = await organizaDadosParaGrafico_awacCorr(nome_tabela, startDate, endDate);
        fetchData(currentGraph, 'current', dados);
    });

    document.getElementById('update-wave-graph').addEventListener('click', async (event) => {
        const nome_tabela = event.target.name;
        const startDate = document.getElementById('wave-start-date').value;
        const endDate = document.getElementById('wave-end-date').value;

        const dados = await organizaDadosParaGrafico_awacOnda(nome_tabela, startDate, endDate);
        fetchData(waveGraph, 'wave', dados);
    });

    document.getElementById('velocity-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[0].hidden = !this.checked;
        currentGraph.update();
    });

    document.getElementById('direction-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[1].hidden = !this.checked;
        currentGraph.update();
    });

    document.getElementById('height-checkbox').addEventListener('change', function() {
        waveGraph.data.datasets[0].hidden = !this.checked;
        waveGraph.update();
    });

    document.getElementById('period-checkbox').addEventListener('change', function() {
        waveGraph.data.datasets[1].hidden = !this.checked;
        waveGraph.update();
    });

    document.getElementById('wave-direction-checkbox').addEventListener('change', function() {
        waveGraph.data.datasets[2].hidden = !this.checked;
        waveGraph.update();
    });

    function fetchData(graph, type, data) {
        graph.data.labels = converterVetorParaFormatoISO(data[0]);

        if (type === 'current') {
            const celula_selecionada = document.getElementById('current-cell-select').value
            const indice_dir = celula_selecionada*2;
            const indice_vel = indice_dir-1;
            graph.data.datasets[0].data = data[indice_vel];
            graph.data.datasets[1].data = data[indice_dir];
        } else if (type === 'wave') {
            graph.data.datasets[0].data = data[1];
            graph.data.datasets[1].data = data[2];
            graph.data.datasets[2].data = data[3];
        }

        graph.update();
    }

    // // CARREGAR GRÁFICO JUNTO COM A PÁGINA
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    // let nome_tabela;
    let nome_tabela_corrente;
    let nome_tabela_onda;
    
    switch (window.location.pathname) {
        case '/Oceanstream/Boia04/index.html':
            nome_tabela_corrente = 'ADCP-Boia04_corrente';
            nome_tabela_onda = 'ADCP-Boia04_onda';
            break;
        case '/Oceanstream/Boia08/index.html':
            nome_tabela_corrente = 'ADCP-Boia08_corrente';
            nome_tabela_onda = 'ADCP-Boia08_onda';
            break;
        case '/Oceanstream/Boia10/index.html':
            nome_tabela_corrente = 'ADCP-Boia10_corrente';
            nome_tabela_onda = 'ADCP-Boia10_onda';
            break;
        default:
            nome_tabela_corrente = '';
            nome_tabela_onda = '';
    }

    const dadosC = await organizaDadosParaGrafico_awacCorr(nome_tabela_corrente, startDate, endDate);
    const dadosO = await organizaDadosParaGrafico_awacOnda(nome_tabela_onda, startDate, endDate);
    fetchData(currentGraph, 'current', dadosC);
    fetchData(waveGraph, 'wave', dadosO);
});
