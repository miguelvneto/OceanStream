const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

const toggleSidebar = () => {
    sidebar.classList.toggle("close");
};

const toggleDarkMode = () => {
    body.classList.toggle("dark");
    modeText.innerText = body.classList.contains("dark") ? "Light mode" : "Dark mode";
};

document.addEventListener('DOMContentLoaded', () => {
    const isChecked_velonda = document.getElementById('checkbox_velonda');
    const isChecked_velvento = document.getElementById('checkbox_velvento');
    const isChecked3 = document.getElementById('checkbox_3');
    const isChecked4 = document.getElementById('checkbox_4');

    const graphsContainer = document.getElementById('graphs-container');

    const createGraph = (id, title, unit, data) => {
        const graphDiv = document.createElement('div');
        graphDiv.className = 'parametro';
        graphDiv.innerHTML = `
            <div class="image-container">
                <img src="bussula/fundo.png" class="background-image" />
                <img src="bussula/seta.png" class="seta" style="transform: rotate(27deg);" />
                <img src="bussula/bussula.png" class="circulo" />
                <div class="direcao">27°</div>
                <div class="velocidade">5 kn</div>
            </div>
            <canvas id="${id}"></canvas>
        `;
        graphsContainer.appendChild(graphDiv);

        const ctx = document.getElementById(id).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.datetime.map(date => new Date(date).toLocaleString()),
                datasets: [{
                    label: title,
                    data: data.values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: unit
                        }
                    }
                }
            }
        });
    };

    const tss = [
        new Date("2023-12-04T20:00:00"),
        new Date("2023-12-05T00:00:00"),
        new Date("2023-12-06T00:00:00"),
        new Date("2023-12-07T00:00:00"),
        new Date("2023-12-08T00:00:00"),
        new Date("2023-12-09T00:00:00"),
        new Date("2023-12-10T00:00:00")
    ];
    const seriesData = [
        [4.3, 3.8, 3.6, 3.0, 3.7, 4.3, 4.4],
        [3.1, 2.8, 2.7, 2.7, 3.3, 4.0, 3.5]
    ];

    isChecked_velonda.addEventListener('change', (event) => {
        if (event.target.checked) {
            createGraph('velonda', 'Velocidade de Onda', 'Metros por segundo (m/s)', { datetime: tss, values: seriesData[0] });
        } else {
            document.getElementById('velonda').parentElement.remove();
        }
    });

    isChecked_velvento.addEventListener('change', (event) => {
        if (event.target.checked) {
            createGraph('velvento', 'Velocidade de Vento', 'Nós (kn)', { datetime: tss, values: seriesData[1] });
        } else {
            document.getElementById('velvento').parentElement.remove();
        }
    });

    isChecked3.addEventListener('change', (event) => {
        if (event.target.checked) {
            createGraph('graph3', 'Grafico 3', 'Terceira unidade', { datetime: tss, values: seriesData[1] });
        } else {
            document.getElementById('graph3').parentElement.remove();
        }
    });

    isChecked4.addEventListener('change', (event) => {
        if (event.target.checked) {
            createGraph('graph4', 'Grafico 4', 'Quarta unidade', { datetime: tss, values: seriesData[1] });
        } else {
            document.getElementById('graph4').parentElement.remove();
        }
    });
});