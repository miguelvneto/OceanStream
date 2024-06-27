document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body'),
          sidebar = body.querySelector('nav'),
          toggle = body.querySelector(".toggle"),
          searchBtn = body.querySelector(".search-box"),
          modeSwitch = body.querySelector(".toggle-switch"),
          modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });

    searchBtn.addEventListener("click", () => {
        sidebar.classList.remove("close");
    });

    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
        } else {
            modeText.innerText = "Dark mode";
        }
    });

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
                hidden: false,
            }, {
                label: 'Rajada (Kn)',
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: [],
                hidden: false,
            }, {
                label: 'Precipitação (mm)',
                fill: false,
                backgroundColor: 'rgb(153, 102, 255)',
                borderColor: 'rgb(153, 102, 255)',
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
                label: 'Altura Significativa de Onda (Hm0) - metros (m)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
                hidden: false,
            }, {
                label: 'Altura Máxima - metros (m)',
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                data: [],
                hidden: false,
            }, {
                label: 'Período de Pico - segundos (s)',
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                data: [],
                hidden: false,
            }, {
                label: 'Período Médio - segundos (s)',
                fill: false,
                backgroundColor: 'rgb(153, 102, 255)',
                borderColor: 'rgb(153, 102, 255)',
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

    const ctxBar = document.getElementById('seaLevelBarChart').getContext('2d');
    const seaLevelBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Nível do Mar'],
            datasets: [{
                label: 'Nível do mar (m)',
                backgroundColor: 'rgb(0, 99, 132)',
                borderColor: 'rgb(0, 99, 132)',
                data: [0], // Valor inicial
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Nível do Mar (m)'
                    }
                }]
            }
        }
    });

    document.getElementById('update-graph').addEventListener('click', () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        fetchData(startDate, endDate, currentGraph, seaLevelBarChart, 'current');
    });

    function fetchData(startDate, endDate, lineGraph, barGraph, type) {
        // Simulate fetching data from the database
        const labels = generateLabels(startDate, endDate);
        const data1 = generateRandomData(labels.length);
        const data2 = generateRandomData(labels.length);
        const data3 = generateRandomData(labels.length);
        const data4 = generateRandomData(labels.length);

        if (type === 'current') {
            lineGraph.data.labels = labels;
            lineGraph.data.datasets[0].data = data1;

            // Atualizando o gráfico de barra
            const lastDataPoint = data1[data1.length - 1];
            barGraph.data.datasets[0].data = [lastDataPoint];
            barGraph.update();
        } else if (type === 'wave') {
            lineGraph.data.labels = labels;
            lineGraph.data.datasets[0].data = data1;
            lineGraph.data.datasets[1].data = data2;
            lineGraph.data.datasets[2].data = data3;
            lineGraph.data.datasets[3].data = data4;
        }

        lineGraph.update();
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
    fetchData('2021-01-01T00:00:00', '2021-01-01T01:00:00', currentGraph, seaLevelBarChart, 'current');
    fetchData('2021-01-01T00:00:00', '2021-01-01T01:00:00', waveGraph, null, 'wave');
});
