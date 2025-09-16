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

    const ctxCurrent = document.getElementById('currentGraph').getContext('2d');
    const currentGraph = new Chart(ctxCurrent, {
        type: 'line',
        data: {
            labels: [], // Eixos X - timestamps
            datasets: [{
                label: 'Velocidade de vento (Kn)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
                hidden: false,
            }, {
                label: 'Direção de vento (º)',
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                data: [],
                hidden: true,
            }, {
                label: 'Rajada (Kn)',
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
    });

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
    const nome_tabela = 'TU_Estacao_Meteorologica';

    const dados = await organizaDadosParaGrafico_estacao(nome_tabela, startDate, endDate);
    fetchData(currentGraph, 'estacao', dados);
});
