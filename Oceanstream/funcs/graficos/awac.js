document.addEventListener('DOMContentLoaded', async function() {
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

    document.getElementById('start-date').value = formatDate(ontem);
    document.getElementById('end-date').value = formatDate(hoje);
    document.getElementById('wave-start-date').value = formatDate(ontem);
    document.getElementById('wave-end-date').value = formatDate(hoje);
    document.getElementById('sensor-start-date').value = formatDate(ontem);
    document.getElementById('sensor-end-date').value = formatDate(hoje);

    document.getElementById('current-cell-select').value = '11';

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
                        // display: true,
                        // labelString: 'Valor'
                    },
                    ticks: {beginAtZero: true}
                }]
            }
        }
    });

    const ctxSensor = document.getElementById('sensorGraph').getContext('2d');
    const sensorGraph = new Chart(ctxSensor, {
        type: 'line',
        data: {
            labels: [], // Eixos X - timestamps
            datasets: [{
                label: 'Battery (V)',
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: [],
                fill: false,
                hidden: true,
            },{
                label: 'Heading (°)',
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: [],
                fill: false,
                hidden: true,
            }, {
                label: 'Pitch (°)',
                fill: false,
                backgroundColor: 'rgb(153, 102, 255)',
                borderColor: 'rgb(153, 102, 255)',
                data: [],
                hidden: false,
            }, {
                label: 'Roll (°)',
                fill: false,
                backgroundColor: 'rgb(255, 159, 64)',
                borderColor: 'rgb(255, 159, 64)',
                data: [],
                hidden: false,
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
        console.log(nome_tabela_corrente);
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

    document.getElementById('update-sensor-graph').addEventListener('click', async (event) => {
        const nome_tabela = event.target.name;
        const startDate = document.getElementById('sensor-start-date').value;
        const endDate = document.getElementById('sensor-end-date').value;

        const dados = await organizaDadosParaGrafico_awacSensor(nome_tabela, startDate, endDate);
        fetchData(sensorGraph, 'sensor', dados);
    });

    document.getElementById('current-cell-select').addEventListener('change', async function() {
        const tabelaJSON = sessionStorage.getItem(nome_tabela_corrente);
        if (!tabelaJSON) {
            console.error(`Nenhuma tabela encontrada na sessionStorage com a chave "${nome_tabela_corrente}"`);
            return false;
        }
        const dados = await separaCelulas(tabelaJSON);
        fetchData(currentGraph, 'current', dados);
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

    document.getElementById('battery-checkbox').addEventListener('change', function() {
        sensorGraph.data.datasets[0].hidden = !this.checked;
        sensorGraph.update();
    });

    document.getElementById('heading-checkbox').addEventListener('change', function() {
        sensorGraph.data.datasets[1].hidden = !this.checked;
        sensorGraph.update();
    });

    document.getElementById('pitch-checkbox').addEventListener('change', function() {
        sensorGraph.data.datasets[2].hidden = !this.checked;
        sensorGraph.update();
    });

    document.getElementById('roll-checkbox').addEventListener('change', function() {
        sensorGraph.data.datasets[3].hidden = !this.checked;
        sensorGraph.update();
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
        } else if (type === 'sensor'){
            graph.data.datasets[0].data = data[1];
            graph.data.datasets[1].data = data[2];
            graph.data.datasets[2].data = data[3];
            graph.data.datasets[3].data = data[4];
        }

        graph.update();
    }

    // // CARREGAR GRÁFICO JUNTO COM A PÁGINA
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    let nome_tabela_corrente;
    let nome_tabela_onda;
    let nome_tabela_sensor;
    
    switch (true) {
        case window.location.pathname.includes('Boia04'):
            nome_tabela_corrente = 'ADCP-Boia04_corrente';
            nome_tabela_onda = 'ADCP-Boia04_onda';
            nome_tabela_sensor = 'ADCP-Boia04_PNORS';
            break;
        case window.location.pathname.includes('Boia08'):
            nome_tabela_corrente = 'ADCP-Boia08_corrente';
            nome_tabela_onda = 'ADCP-Boia08_onda';
            nome_tabela_sensor = 'ADCP-Boia08_PNORS';
            break;
        case window.location.pathname.includes('Boia10'):
            nome_tabela_corrente = 'ADCP-Boia10_corrente';
            nome_tabela_onda = 'ADCP-Boia10_onda';
            nome_tabela_sensor = 'ADCP-Boia10_PNORS';
            break;
        default:
            nome_tabela_corrente = '';
            nome_tabela_onda = '';
            nome_tabela_sensor = '';
    }

    const dadosC = await organizaDadosParaGrafico_awacCorr(nome_tabela_corrente, startDate, endDate);
    const dadosS = await organizaDadosParaGrafico_awacSensor(nome_tabela_sensor, startDate, endDate)
    const dadosO = await organizaDadosParaGrafico_awacOnda(nome_tabela_onda, startDate, endDate);

    fetchData(currentGraph, 'current', dadosC);
    fetchData(sensorGraph, 'sensor', dadosS);
    fetchData(waveGraph, 'wave', dadosO);
});
