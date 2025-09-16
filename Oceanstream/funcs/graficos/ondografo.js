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
                label: 'Altura Significativa de Onda (Hm0) - metros (m)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [],
                fill: false,
                hidden: false,
            }, {
                label: 'Altura Máxima (Hmax) - metros (m)',
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                data: [],
                hidden: true,
            }, {
                label: 'Período no Domínio do Tempo (Tz) - segundos (s)',
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
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

        const dados = await organizaDadosParaGrafico_ondografo(nome_tabela, startDate, endDate);
        
        fetchData(currentGraph, 'ondografo', dados);
    });

    document.getElementById('hm0_alisado-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[0].hidden = !this.checked;
        currentGraph.update();
    });

    document.getElementById('hmax-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[1].hidden = !this.checked;
        currentGraph.update();
    });

    document.getElementById('tz-checkbox').addEventListener('change', function() {
        currentGraph.data.datasets[2].hidden = !this.checked;
        currentGraph.update();
    });

    // document.getElementById('tp_alisado-checkbox').addEventListener('change', function() {
    //     currentGraph.data.datasets[3].hidden = !this.checked;
    //     currentGraph.update();
    // });

    function fetchData(graph, type, data) {
        graph.data.labels = converterVetorParaFormatoISO(data[0]);

        if (type === 'ondografo') {
            graph.data.datasets[0].data = data[1];
            graph.data.datasets[1].data = data[2];
            graph.data.datasets[2].data = data[3];
        }

        graph.update();
    }

    // // CARREGAR GRÁFICO JUNTO COM A PÁGINA
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    let nome_tabela;

    switch (true) {
        case window.location.pathname.includes('Pier_II'):
            nome_tabela = 'Ondografo-PII_tab_parametros';
            break;
        case window.location.pathname.includes('TGL'):
            nome_tabela = 'Ondografo-TGL_tab_parametros';
            break;
        case window.location.pathname.includes('TPD'):
                nome_tabela = 'Ondografo-TPD_tab_parametros';
                break;
        case window.location.pathname.includes('TPM'):
            nome_tabela = 'Ondografo-TPM_tab_parametros';
            break;
        default:
            nome_tabela_corrente = '';
            nome_tabela_onda = '';
    }

    // switch (window.location.pathname) {
    //     case '/Oceanstream/Ondografo-Pier_II/index.html':
    //         nome_tabela = 'Ondografo-PII_tab_parametros';
    //         break;
    //     case '/Oceanstream/Ondografo-TGL/index.html':
    //         nome_tabela = 'Ondografo-TGL_tab_parametros';
    //         break;
    //     case '/Oceanstream/Ondografo-TPD/index.html':
    //         nome_tabela = 'Ondografo-TPD_tab_parametros';
    //         break;
    //     case '/Oceanstream/Ondografo-TPM/index.html':
    //         nome_tabela = 'Ondografo-TPM_tab_parametros';
    //         break;
    //     default:
    //         nome_tabela = '';
    // }

    const dados = await organizaDadosParaGrafico_ondografo(nome_tabela, startDate, endDate);
    fetchData(currentGraph, 'ondografo', dados);
});
