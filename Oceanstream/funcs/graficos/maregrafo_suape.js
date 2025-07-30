document.addEventListener('DOMContentLoaded', async function() {
    document.getElementById('download-dados').addEventListener('click', async () => {
        const nome_tabela = document.getElementById('update-graph').name;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        
        // Obter os dados da sessionStorage
        const tabelaJSON = sessionStorage.getItem(nome_tabela);
        if (!tabelaJSON) {
            alert('Nenhum dado disponível para download. Atualize o gráfico primeiro.');
            return;
        }

        // Converter JSON para CSV
        const csv = convertJSONToCSV(JSON.parse(tabelaJSON));
        
        // Criar link de download
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `maregrafo_suape_${startDate}_${endDate}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

function convertJSONToCSV(jsonData) {
    if (!jsonData || jsonData.length === 0) return '';
    
    // Extrair cabeçalhos
    const headers = Object.keys(jsonData[0]);
    let csv = headers.join(';') + '\n';
    
    // Adicionar linhas de dados
    jsonData.forEach(row => {
        const values = headers.map(header => {
            return row[header] !== null ? row[header] : '';
        });
        csv += values.join(';') + '\n';
    });
    
    return csv;
}
    
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
                        unit: 'hour',
                        stepSize: 8,
                        displayFormats: {hour: 'D/MM HH'}
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

        const dados = await organizaDadosParaGrafico_maregrafo_suape(nome_tabela, startDate, endDate);
        
        fetchData(currentGraph, 'maregrafo', dados);
    });

    function fetchData(graph, type, data) {
        graph.data.labels = converterVetorParaFormatoISO(data[0]);

        if (type === 'maregrafo') {
            graph.data.datasets[0].data = data[1];
        }

        graph.update();
    }

    // // CARREGAR GRÁFICO JUNTO COM A PÁGINA
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const nome_tabela = 'Maregrafo-Recife_tab_elevacao';

    const dados = await organizaDadosParaGrafico_maregrafo_suape(nome_tabela, startDate, endDate);
    fetchData(currentGraph, 'maregrafo', dados);

});
