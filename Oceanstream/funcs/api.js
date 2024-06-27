function verificaFormatoData(str) {
    // Expressão regular para verificar o formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Testa se a string corresponde ao padrão YYYY-MM-DD
    return regex.test(str);
}

async function reqAPI(nome_tabela) {
    const startDate = document.getElementById('start-date').value,
    endDate = document.getElementById('end-date').value;
    
    if (!(verificaFormatoData(startDate) && verificaFormatoData(endDate))){
        console.log('Favor selecionar datas válidas.')
        return;
    }
    const corpo = JSON.stringify({
        tabela: nome_tabela,
        dt_inicial: startDate,
        dt_final: endDate
    }),
    head = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obterAccessToken()}`
    },
    url = 'http://localhost:1848/dados';

    const requestOptions = {
        method: 'POST',
        headers: head,
        body: corpo
    };

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        localStorage.setItem(nome_tabela, JSON.stringify(data));
        console.log('Dados salvos na localStorage com sucesso');
    } catch (error) {
        console.error('Erro:', error);
    }
}