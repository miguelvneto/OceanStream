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
    // const isChecked_velonda = document.getElementById('checkbox_velonda');
    // const isChecked_velvento = document.getElementById('checkbox_velvento');
    // const isChecked3 = document.getElementById('checkbox_3');
    // const isChecked4 = document.getElementById('checkbox_4');

    // const graphsContainer = document.getElementById('graphs-container');

    // const createGraph = (id, title, unit, data) => {
    //     const graphDiv = document.createElement('div');
    //     var graus = 27;
    //     graphDiv.className = 'parametro';
    //     graphDiv.innerHTML = `
    //         <div class="image-container">
    //             <img src="bussula/fundo.png" class="background-image" />
    //             <img src="bussula/seta.png" class="seta" style="transform: rotate(${graus}deg);" />
    //             <img src="bussula/bussula.png" class="circulo" />
    //             <div class="direcao">27°</div>
    //             <div class="velocidade">5 kn</div>
    //         </div>
    //         <div>
    //             <h3>${title}</h3>
    //             <p>Data: ${data}</p>
    //             <p>Unidade: ${unit}</p>
    //         </div>
    //     `;
    //     graphsContainer.appendChild(graphDiv);
    // };

    // isChecked_velonda.addEventListener('change', (event) => {
    //     if (event.target.checked) {
    //         createGraph('velonda', 'Velocidade de Onda', 'Metros por segundo (m/s)', 'Example data for Velocidade de Onda');
    //     } else {
    //         document.getElementById('velonda').remove();
    //     }
    // });

    // isChecked_velvento.addEventListener('change', (event) => {
    //     if (event.target.checked) {
    //         createGraph('velvento', 'Velocidade de Vento', 'Nós (kn)', 'Example data for Velocidade de Vento');
    //     } else {
    //         document.getElementById('velvento').remove();
    //     }
    // });

    // isChecked3.addEventListener('change', (event) => {
    //     if (event.target.checked) {
    //         createGraph('grafico3', 'Gráfico 3', 'Terceira unidade', 'Example data for Gráfico 3');
    //     } else {
    //         document.getElementById('grafico3').remove();
    //     }
    // });

    // isChecked4.addEventListener('change', (event) => {
    //     if (event.target.checked) {
    //         createGraph('grafico4', 'Gráfico 4', 'Quarta unidade', 'Example data for Gráfico 4');
    //     } else {
    //         document.getElementById('grafico4').remove();
    //     }
    // });

    const metadataDiv = document.getElementById('metadata');
    const altura = window.innerHeight;
    const largura = window.innerWidth;
    const cAlturaGrafico = 0.3;
    const cLarguraGrafico = 0.5;
    const grafico_altura = Math.max(altura * cAlturaGrafico, 190);
    const grafico_largura = Math.max(largura * cLarguraGrafico, 450);

    metadataDiv.innerHTML = `
        <p>Altura: ${altura} | Largura: ${largura}</p>
        <p>${cLarguraGrafico * 100}% da largura total da tela é: ${grafico_largura}px</p>
        <p>Largura total: ${grafico_largura}</p>
        <p>${cAlturaGrafico * 100}% da altura total da tela é: ${grafico_altura}px</p>
        <p>Altura total: ${grafico_altura}</p>
    `;
});


// CHECKBOXES
let isChecked_c1 = false;

const handleCheckbox = (event) => {
    isChecked_c1 = event.target.checked;
    // console.log(`Checkbox is now ${isChecked_c1 ? 'checked' : 'unchecked'}`);
};

document.addEventListener('DOMContentLoaded', () => {
    const c1 = document.getElementById('c1');
    c1.addEventListener('change', handleCheckbox);
});

function toggleOptions(id) {
    const options = document.getElementById(id);
    options.classList.toggle('show');
}

function criarGrafico(id_graf, dt_list, valores, label) {
    var ctx = document.getElementById(id_graf).getContext("2d");
    var data = [];

    for (var i = 0; i < dt_list.length; i++) {
        data.push({ t: dt_list[i], y: valores[i] });
    }

    var myChart = new Chart(ctx, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                        tooltipFormat: 'll HH:mm'
                    },
                    title: {
                        display: true,
                        text: 'Data e Hora'
                    }
                }],
                yAxes: [{
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor'
                    }
                }]
            }
        },
        data: {
            labels: dt_list,
            datasets: [{
                label: label,
                data: data,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        }
    });
}
