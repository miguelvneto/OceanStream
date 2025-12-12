document.addEventListener('DOMContentLoaded', async function() {
    // Configuração para múltiplos gráficos
    const graphsConfig = [
        {
            id: 'graph1',
            tableName: 'Maregrafo-Recife_tab_elevacao',
            startDateId: 'start-date-1',
            endDateId: 'end-date-1',
            updateBtnClass: '.update-graph[data-tabela="Maregrafo-Recife_tab_elevacao"]',
            downloadBtnClass: '.download-dados[data-tabela="Maregrafo-Recife_tab_elevacao"]',
            chart: null
        },
        {
            id: 'graph2',
            tableName: 'SUAPE2_tab_elevacao',
            startDateId: 'start-date-2',
            endDateId: 'end-date-2',
            updateBtnClass: '.update-graph[data-tabela="SUAPE2_tab_elevacao"]',
            downloadBtnClass: '.download-dados[data-tabela="SUAPE2_tab_elevacao"]',
            chart: null
        }
    ];

    // Função para converter JSON para CSV
    function convertJSONToCSV(jsonData) {
        if (!jsonData || jsonData.length === 0) return '';
        
        const headers = Object.keys(jsonData[0]);
        let csv = headers.join(';') + '\n';
        
        jsonData.forEach(row => {
            const values = headers.map(header => {
                return row[header] !== null ? row[header] : '';
            });
            csv += values.join(';') + '\n';
        });
        
        return csv;
    }

    // Função para formatar data
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Função para atualizar dados do gráfico
    function updateGraphData(graph, data) {
        if (!data || !data[0] || !data[1]) {
            console.error('Dados inválidos para o gráfico');
            return;
        }

        graph.data.labels = converterVetorParaFormatoISO(data[0]);
        graph.data.datasets[0].data = data[1];
        graph.update();
    }

    // Configurar datas padrão
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    // Inicializar todos os gráficos
    graphsConfig.forEach(config => {
        // Configurar datas padrão
        document.getElementById(config.startDateId).value = formatDate(ontem);
        document.getElementById(config.endDateId).value = formatDate(hoje);

        // Criar gráfico
        const ctx = document.getElementById(config.id).getContext('2d');
        config.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: `Nível do mar (m) - ${config.tableName.includes('Suape2') ? 'Suape 2' : 'Maregrafo Recife'}`,
                    backgroundColor: config.tableName.includes('Suape2') ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)',
                    borderColor: config.tableName.includes('Suape2') ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)',
                    data: [],
                    fill: false,
                    hidden: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        title: function(tooltipItems) {
                            const date = new Date(tooltipItems[0].xLabel);
                            date.setHours(date.getHours() + 3);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');

                            return `${day}/${month}/${year} - ${hours}:${minutes}`;
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
                            displayFormats: { hour: 'D/MM - HH\\h' },
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
                            display: false
                        }
                    }]
                }
            }
        });

        // Configurar botão de download
        document.querySelector(config.downloadBtnClass).addEventListener('click', async () => {
            const nome_tabela = config.tableName;
            const startDate = document.getElementById(config.startDateId).value;
            const endDate = document.getElementById(config.endDateId).value;
            
            const tabelaJSON = sessionStorage.getItem(nome_tabela);
            if (!tabelaJSON) {
                alert('Nenhum dado disponível para download. Atualize o gráfico primeiro.');
                return;
            }

            const csv = convertJSONToCSV(JSON.parse(tabelaJSON));
            
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `${nome_tabela}_${startDate}_${endDate}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Configurar botão de atualização
        document.querySelector(config.updateBtnClass).addEventListener('click', async () => {
            const startDate = document.getElementById(config.startDateId).value;
            const endDate = document.getElementById(config.endDateId).value;

            try {
                const dados = await organizaDadosParaGrafico_maregrafo_suape(config.tableName, startDate, endDate);
                updateGraphData(config.chart, dados);
            } catch (error) {
                console.error(`Erro ao atualizar gráfico ${config.id}:`, error);
                alert('Erro ao carregar dados. Verifique as datas e tente novamente.');
            }
        });

        // Carregar dados iniciais
        loadInitialData(config);
    });

    // Função para carregar dados iniciais
    async function loadInitialData(config) {
        const startDate = document.getElementById(config.startDateId).value;
        const endDate = document.getElementById(config.endDateId).value;

        try {
            const dados = await organizaDadosParaGrafico_maregrafo_suape(config.tableName, startDate, endDate);
            updateGraphData(config.chart, dados);
        } catch (error) {
            console.error(`Erro ao carregar dados iniciais para ${config.tableName}:`, error);
        }
    }
});