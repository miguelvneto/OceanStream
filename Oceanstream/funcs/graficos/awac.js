document.addEventListener('DOMContentLoaded', function() {
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
                hidden: false,
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
                        unit: 'minute',
                        stepSize: 10 // Define o intervalo de 10 minutos
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
                        labelString: 'Valor'
                    }
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
                hidden: false,
            }, {
                label: 'Direção (°)',
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
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'minute',
                        stepSize: 10 // Define o intervalo de 10 minutos
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
                        labelString: 'Valor'
                    }
                }]
            }
        }
    });

    document.getElementById('update-graph').addEventListener('click', () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        fetchData(startDate, endDate, currentGraph, 'current');
    });

    document.getElementById('update-wave-graph').addEventListener('click', () => {
        const startDate = document.getElementById('wave-start-date').value;
        const endDate = document.getElementById('wave-end-date').value;
        fetchData(startDate, endDate, waveGraph, 'wave');
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

    function fetchData(startDate, endDate, graph, type) {
        // Simulate fetching data from the database
        const labels = generateLabels(startDate, endDate);
        const data1 = generateRandomData(labels.length);
        const data2 = generateRandomData(labels.length);
        const data3 = generateRandomData(labels.length);

        if (type === 'current') {
            graph.data.labels = labels;
            graph.data.datasets[0].data = data1;
            graph.data.datasets[1].data = data2;
        } else if (type === 'wave') {
            graph.data.labels = labels;
            graph.data.datasets[0].data = data1;
            graph.data.datasets[1].data = data2;
            graph.data.datasets[2].data = data3;
        }

        graph.update();
    }

    function generateLabels(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const labels = [];
        while (start <= end) {
            labels.push(new Date(start).toISOString());
            start.setMinutes(start.getMinutes() + 10);
        }
        return labels;
    }

    function generateRandomData(length) {
        return Array.from({ length }, () => Math.floor(Math.random() * 100));
    }

    // Initial fetch to populate the graphs with some data
    // fetchData('2021-01-01T00:00:00', '2021-01-01T01:00:00', currentGraph, 'current');
    // fetchData('2021-01-01T00:00:00', '2021-01-01T01:00:00', waveGraph, 'wave');
});
