document.addEventListener('DOMContentLoaded', async function() {
    // Configuração para os dois equipamentos
    const equipmentsConfig = [
        {
            id: 'maregrafo',
            tableName: 'Maregrafo-Recife_tab_elevacao',
            label: 'Marégrafo 1',  // Alterado aqui
            downloadLabel: 'Maregrafo Recife',  // Mantém o nome original para download
            color: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)'
        },
        {
            id: 'suape',
            tableName: 'SUAPE2_tab_elevacao',
            label: 'Marégrafo 2',  // Alterado aqui
            downloadLabel: 'Suape 2',  // Mantém o nome original para download
            color: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)'
        }
    ];

    // Elementos dos controles
    const startDateInput = document.getElementById('start-date');
    const startTimeInput = document.getElementById('start-time');
    const endDateInput = document.getElementById('end-date');
    const endTimeInput = document.getElementById('end-time');

    // Variável global para o gráfico combinado
    let combinedChart = null;

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

    // Função para validar intervalo de datas
    function validateDateTime() {
        const startDate = startDateInput.value;
        const startTime = startTimeInput.value || '00:00';
        const endDate = endDateInput.value;
        const endTime = endTimeInput.value || '23:59';
        
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        
        if (startDateTime > endDateTime) {
            alert('A data/hora inicial não pode ser posterior à data/hora final');
            return false;
        }
        
        const minDate = new Date('2025-02-15T00:00:00');
        if (startDateTime < minDate) {
            alert('A data inicial não pode ser antes do dia 15/02/2025');
            startDateInput.value = '2025-02-15';
            startTimeInput.value = '00:00';
            return false;
        }
        
        return true;
    }

    // Configurar datas e horários padrão
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    // Formatador de data para o eixo X
    function formatDateForXAxis(dateStr) {
        const date = new Date(dateStr);
        date.setHours(date.getHours() + 3);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month} ${hours}:${minutes}`;
    }

    // Criar gráfico combinado
    function createCombinedChart() {
        const ctx = document.getElementById('combinedGraph').getContext('2d');
        
        combinedChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        title: function(tooltipItems) {
                            if (tooltipItems.length > 0) {
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
                            return '';
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
                        },
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        fontColor: '#333',
                        fontSize: 14,
                        boxWidth: 20,
                        padding: 15,
                        usePointStyle: true
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    },
                    point: {
                        radius: 2,
                        hoverRadius: 6
                    }
                }
            }
        });
    }

    // Função para buscar dados de um equipamento específico
    async function fetchEquipmentData(tableName, label) {
        const startDate = startDateInput.value;
        const startTime = startTimeInput.value || '00:00';
        const endDate = endDateInput.value;
        const endTime = endTimeInput.value || '23:59';
        
        const startDateTime = combineDateTime(startDate, startTime);
        const endDateTime = combineDateTime(endDate, endTime);

        try {
            const dados = await organizaDadosParaGrafico_maregrafo_suape(tableName, startDateTime, endDateTime);
            
            if (!dados || !dados[0] || !dados[1]) {
                throw new Error(`Nenhum dado retornado para ${label}`);
            }
            
            return {
                labels: converterVetorParaFormatoISO(dados[0]),
                values: dados[1]
            };
        } catch (error) {
            console.error(`Erro ao buscar dados do ${label}:`, error);
            throw error;
        }
    }

    // Função para atualizar dados no gráfico combinado
    async function updateCombinedChart() {
        if (!validateDateTime()) {
            return;
        }

        // Mostrar indicador de carregamento
        const updateButton = document.getElementById('update-combined');
        const originalText = updateButton.textContent;
        updateButton.textContent = 'Carregando...';
        updateButton.disabled = true;

        try {
            // Limpar datasets existentes
            combinedChart.data.datasets = [];
            
            let allLabels = [];
            
            // Para cada equipamento, buscar dados e adicionar ao gráfico
            for (const config of equipmentsConfig) {
                try {
                    const equipmentData = await fetchEquipmentData(config.tableName, config.label);
                    
                    // Adicionar dataset para este equipamento
                    combinedChart.data.datasets.push({
                        label: config.label,
                        data: equipmentData.values.map((value, index) => ({
                            x: equipmentData.labels[index],
                            y: value
                        })),
                        backgroundColor: config.color,
                        borderColor: config.borderColor,
                        fill: false,
                        pointRadius: 2,
                        pointHoverRadius: 5,
                        borderWidth: 2
                    });
                    
                    // Coletar todos os labels para o eixo X
                    allLabels = [...new Set([...allLabels, ...equipmentData.labels])].sort();
                    
                } catch (error) {
                    console.error(`Erro no equipamento ${config.label}:`, error);
                    // Continua com o próximo equipamento
                }
            }
            
            // Verificar se temos dados
            if (combinedChart.data.datasets.length === 0) {
                alert('Nenhum dado encontrado para o período selecionado.');
                return;
            }
            
            // Definir labels do eixo X (usando todos os timestamps únicos)
            combinedChart.data.labels = allLabels;
            
            // Atualizar gráfico
            combinedChart.update();
            
        } catch (error) {
            console.error('Erro ao atualizar gráfico:', error);
            alert('Erro ao carregar dados. Verifique as datas e tente novamente.');
        } finally {
            // Restaurar botão
            updateButton.textContent = originalText;
            updateButton.disabled = false;
        }
    }

    // Função para download de dados específicos
    async function downloadData(tableName, downloadLabel, displayLabel) {
        if (!validateDateTime()) return;
        
        const startDate = startDateInput.value;
        const startTime = startTimeInput.value || '00:00';
        const endDate = endDateInput.value;
        const endTime = endTimeInput.value || '23:59';
        
        const tabelaJSON = sessionStorage.getItem(tableName);
        if (!tabelaJSON) {
            alert(`Nenhum dado disponível para ${displayLabel}. Atualize o gráfico primeiro.`);
            return;
        }

        const csv = convertJSONToCSV(JSON.parse(tabelaJSON));
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${tableName}_${startDate}_${startTime}_${endDate}_${endTime}.csv`.replace(/:/g, '-'));
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Inicializar
    function init() {
        // Configurar datas e horários padrão
        startDateInput.value = ontem.toISOString().split('T')[0];
        startTimeInput.value = '00:00';
        endDateInput.value = hoje.toISOString().split('T')[0];
        endTimeInput.value = '23:59';

        // Criar gráfico combinado
        createCombinedChart();

        // Configurar botão de atualização
        document.getElementById('update-combined').addEventListener('click', updateCombinedChart);

        // Configurar botões de download
        document.getElementById('download-maregrafo').addEventListener('click', () => {
            downloadData(
                'Maregrafo-Recife_tab_elevacao', 
                equipmentsConfig[0].downloadLabel,
                equipmentsConfig[0].label
            );
        });

        document.getElementById('download-suape').addEventListener('click', () => {
            downloadData(
                'SUAPE2_tab_elevacao', 
                equipmentsConfig[1].downloadLabel,
                equipmentsConfig[1].label
            );
        });

        // Carregar dados iniciais automaticamente
        setTimeout(() => {
            updateCombinedChart();
        }, 500);
    }

    // Inicializar a aplicação
    init();
});