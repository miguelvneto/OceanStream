// ============================================================
// CONTROLE DE MANUTENÇÃO - ALTERE ESTA VARIÁVEL CONFORME NECESSÁRIO
// ============================================================
// false = Mostra o gráfico com os dados
// true  = Mostra a mensagem "Em Manutenção"
const EM_MANUTENCAO = false;
// ============================================================

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
    
    // ============================================================
    // SE EM_MANUTENCAO FOR TRUE, MOSTRA MENSAGEM "EM MANUTENÇÃO"
    // ============================================================
    if (EM_MANUTENCAO) {
        // Oculta o gráfico e mostra a mensagem de manutenção
        const chartContainer = document.querySelector('.chart-container');
        chartContainer.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                background: var(--body-color);
                border-radius: 8px;
                border: 2px dashed var(--primary-color);
            ">
                <div style="
                    text-align: center;
                    padding: 40px;
                ">
                    <i class='bx bx-wrench' style="
                        font-size: 60px;
                        color: var(--primary-color);
                        display: block;
                        margin-bottom: 20px;
                    "></i>
                    <h2 style="
                        color: var(--text-color);
                        font-size: 28px;
                        font-weight: 600;
                        margin-bottom: 10px;
                    ">Em Manutenção</h2>
                    <p style="
                        color: var(--text-color);
                        font-size: 16px;
                        opacity: 0.7;
                    ">O equipamento está passando por manutenção.<br>Em breve estará disponível novamente.</p>
                </div>
            </div>
        `;
        
        // Desabilita o botão de atualização e os campos de data
        document.getElementById('update-graph').disabled = true;
        document.getElementById('update-graph').style.opacity = '0.5';
        document.getElementById('update-graph').style.cursor = 'not-allowed';
        document.getElementById('start-date').disabled = true;
        document.getElementById('end-date').disabled = true;
        
        return; // Sai da execução
    }

    // ============================================================
    // CÓDIGO NORMAL DO GRÁFICO (EXECUTADO APENAS SE EM_MANUTENCAO = false)
    // ============================================================
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

        const dados = await organizaDadosParaGrafico_maregrafo(nome_tabela, startDate, endDate);
        
        fetchData(currentGraph, 'maregrafo', dados);
    });

    function fetchData(graph, type, data) {
        graph.data.labels = converterVetorParaFormatoISO(data[0]);

        if (type === 'maregrafo') {
            graph.data.datasets[0].data = data[1];
        }

        graph.update();
    }

    // CARREGAR GRÁFICO JUNTO COM A PÁGINA
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const nome_tabela = 'Maregrafo-TU_Maregrafo_Troll';

    const dados = await organizaDadosParaGrafico_maregrafo(nome_tabela, startDate, endDate);
    fetchData(currentGraph, 'maregrafo', dados);
});
