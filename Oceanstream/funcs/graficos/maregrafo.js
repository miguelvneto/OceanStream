document.addEventListener('DOMContentLoaded', function() {
    const ctxCurrent = document.getElementById('currentGraph').getContext('2d');
    const currentGraph = new Chart(ctxCurrent, {
        type: 'line',
        data: {
            labels: [], // Eixos X - timestamps
            datasets: [{
                label: 'Nível do mar (m)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(0, 99, 132)',
                data: [],
                fill: false,
                hidden: false,
            },]
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

    function fetchData(startDate, endDate, graph, type) {
        // Simulate fetching data from the database
        const labels = generateLabels(startDate, endDate);
        const data1 = generateRandomData(labels.length);

        if (type === 'current') {
            graph.data.labels = labels;
            graph.data.datasets[0].data = data1;
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
    fetchData('2021-01-01T00:00:00', '2021-01-01T01:00:00', currentGraph, 'current');
});