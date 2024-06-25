document.addEventListener('DOMContentLoaded', function() {
// document.addEventListener('DOMContentLoaded', (event) => {
    const updateButton = document.getElementById('update-graph');
        
    updateButton.addEventListener('click', () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
    
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
    });
    // });
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

    const ctx = document.getElementById('currentGraph').getContext('2d');
    const currentGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Eixos X - timestamps
            datasets: [{
                label: 'Velocidade (Kt)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
            }, {
                label: 'Direção (°)',
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                data: [],
            }]
        },
        options: {
            responsive: true,
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
        fetchData(startDate, endDate);
    });

    function fetchData(startDate, endDate) {
        // Substitua esta parte pelo seu código para buscar dados do banco de dados
        // Simulação de dados
        const labels = ['2021-01-01T00:00:00', '2021-01-01T00:10:00', '2021-01-01T00:20:00']; // Deve conter timestamps
        const dataSpeed = [5, 10, 15]; // Deve conter dados de velocidade
        const dataDirection = [90, 180, 270]; // Deve conter dados de direção

        // Atualiza gráfico
        currentGraph.data.labels = labels;
        currentGraph.data.datasets[0].data = dataSpeed;
        currentGraph.data.datasets[1].data = dataDirection;
        currentGraph.update();
    }

    fetchData(); // Chama fetchData no início
});
