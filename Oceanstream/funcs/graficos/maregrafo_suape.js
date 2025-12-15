document.addEventListener('DOMContentLoaded', async function() {
    // Configuração para múltiplos gráficos
    const graphsConfig = [
        {
            id: 'graph1',
            tableName: 'Maregrafo-Recife_tab_elevacao',
            startDateId: 'start-date-1',
            startTimeId: 'start-time-1',
            endDateId: 'end-date-1',
            endTimeId: 'end-time-1',
            updateBtnClass: '.update-graph[data-tabela="Maregrafo-Recife_tab_elevacao"]',
            downloadBtnClass: '.download-dados[data-tabela="Maregrafo-Recife_tab_elevacao"]',
            chart: null
        },
        {
            id: 'graph2',
            tableName: 'SUAPE2_tab_elevacao',
            startDateId: 'start-date-2',
            startTimeId: 'start-time-2',
            endDateId: 'end-date-2',
            endTimeId: 'end-time-2',
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

    // Função para formatar data e hora
    function formatDateTime(date, time = '00:00') {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const [hours, minutes] = time.split(':');
        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    }

    // Função para combinar data e hora em uma string
    function combineDateTime(dateStr, timeStr) {
        if (!timeStr) {
            timeStr = '00:00';
        }
        // Garante que o tempo tenha segundos
        if (timeStr.length === 5) { // HH:mm
            timeStr = timeStr + ':00';
        }
        return `${dateStr} ${timeStr}`;
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

    // Função para validar intervalo de datas
    function validateDateTime(config) {
        const startDate = document.getElementById(config.startDateId).value;
        const startTime = document.getElementById(config.startTimeId).value || '00:00';
        const endDate = document.getElementById(config.endDateId).value;
        const endTime = document.getElementById(config.endTimeId).value || '23:59';
        
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        
        if (startDateTime > endDateTime) {
            alert('A data/hora inicial não pode ser posterior à data/hora final');
            return false;
        }
        
        const minDate = new Date('2025-02-15T00:00:00');
        if (startDateTime < minDate) {
            alert('A data inicial não pode ser antes do dia 15/02/2025');
            document.getElementById(config.startDateId).value = '2025-02-15';
            document.getElementById(config.startTimeId).value = '00:00';
            return false;
        }
        
        return true;
    }

    // Configurar datas e horários padrão
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    // Inicializar todos os gráficos
    graphsConfig.forEach(config => {
        // Configurar datas e horários padrão
        document.getElementById(config.startDateId).value = formatDateTime(ontem).split(' ')[0];
        document.getElementById(config.startTimeId).value = '00:00';
        document.getElementById(config.endDateId).value = formatDateTime(hoje).split(' ')[0];
        document.getElementById(config.endTimeId).value = '23:59';

        // Criar gráfico
        const ctx = document.getElementById(config.id).getContext('2d');
        config.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: `Nível do mar (m) - ${config.tableName.includes('SUAPE2') ? 'Suape 2' : 'Maregrafo Recife'}`,
                    backgroundColor: config.tableName.includes('SUAPE2') ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)',
                    borderColor: config.tableName.includes('SUAPE2') ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)',
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
                            const seconds = String(date.getSeconds()).padStart(2, '0');

                            return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
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
                            displayFormats: { 
                                hour: 'D/MM - HH\\h',
                                minute: 'HH:mm'
                            },
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
                            display: true,
                            labelString: 'Nível do mar (m)'
                        }
                    }]
                }
            }
        });

        // Configurar botão de download
        document.querySelector(config.downloadBtnClass).addEventListener('click', async () => {
            if (!validateDateTime(config)) return;
            
            const nome_tabela = config.tableName;
            const startDate = document.getElementById(config.startDateId).value;
            const startTime = document.getElementById(config.startTimeId).value || '00:00';
            const endDate = document.getElementById(config.endDateId).value;
            const endTime = document.getElementById(config.endTimeId).value || '23:59';
            
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
            link.setAttribute('download', `${nome_tabela}_${startDate}_${startTime}_${endDate}_${endTime}.csv`.replace(/:/g, '-'));
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Configurar botão de atualização
        document.querySelector(config.updateBtnClass).addEventListener('click', async () => {
            if (!validateDateTime(config)) return;
            
            const startDate = document.getElementById(config.startDateId).value;
            const startTime = document.getElementById(config.startTimeId).value || '00:00';
            const endDate = document.getElementById(config.endDateId).value;
            const endTime = document.getElementById(config.endTimeId).value || '23:59';
            
            const startDateTime = combineDateTime(startDate, startTime);
            const endDateTime = combineDateTime(endDate, endTime);

            try {
                const dados = await organizaDadosParaGrafico_maregrafo_suape(config.tableName, startDateTime, endDateTime);
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
        const startTime = document.getElementById(config.startTimeId).value || '00:00';
        const endDate = document.getElementById(config.endDateId).value;
        const endTime = document.getElementById(config.endTimeId).value || '23:59';
        
        const startDateTime = combineDateTime(startDate, startTime);
        const endDateTime = combineDateTime(endDate, endTime);

        try {
            const dados = await organizaDadosParaGrafico_maregrafo_suape(config.tableName, startDateTime, endDateTime);
            updateGraphData(config.chart, dados);
        } catch (error) {
            console.error(`Erro ao carregar dados iniciais para ${config.tableName}:`, error);
        }
    }
});