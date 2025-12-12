// const prefix_api = 'http://localhost:1848'; // localhost
// const prefix_api = 'http://environlink.ddns.net:1848'; // ddns
const prefix_api = 'https://oceanstream-8b3329b99e40.herokuapp.com'; // heroku
const bearer_token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5LGdpdWxpYW5vLmRlbW9uZXJAZ21haWwuY29tIiwiaXNzIjoiRW52aXJvbmxpbmtfRGF0YWJhc2UiLCJpYXQiOjE3MTk1MjA0NDUsImV4cCI6MTc4MjUyOTIwMH0.QWrh9xnsteUqUx0TojT4Pp2ciUCNKKs7cJx0dhsYQ6pjawl4y5DK0YVThhTxGYR6V7KSUnBtA2vMVmTzhitymQ'

function converterVetorParaFormatoISO(vetorOriginal) {
    const vetorFormatado = vetorOriginal.map(originalDateTime => {
        // Dividir a string original em data e hora
        const parts = originalDateTime.split(' ');

        // Se a string original não tiver data e hora, retorna null ou lança um erro
        if (parts.length !== 2) {
            return null;
        }

        const data = parts[0]; // Parte da data (YYYY-MM-DD)
        const hora = parts[1]; // Parte da hora (HH:mm:ss)

        // Construir a string no formato ISO "YYYY-MM-DDTHH:mm:ss.000Z"
        const formatoISO = `${data}T${hora}.000Z`;

        return formatoISO;
    });

    return vetorFormatado;
}

function verificaFormatoData(str) {
    // Expressão regular para verificar o formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Testa se a string corresponde ao padrão YYYY-MM-DD
    return regex.test(str);
}

async function reqAPI(nome_tabela, startDate, endDate) {
    if (!(verificaFormatoData(startDate) && verificaFormatoData(endDate))){
        console.log('Favor selecionar datas válidas.')
        console.log(startDate)
        console.log(endDate)
        return;
    }
    endDate = endDate+' 23:59:59'
    const corpo = JSON.stringify({
        tabela: nome_tabela,
        dt_inicial: startDate,
        dt_final: endDate
    }),
    head = {
        'Content-Type': 'application/json',
        'Authorization': bearer_token
    },
    url = prefix_api + '/dados_suape';

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
        
        // Armazenar os dados brutos e também os dados formatados para o gráfico
        sessionStorage.setItem(nome_tabela, JSON.stringify(data));
        sessionStorage.setItem(`${nome_tabela}_raw`, JSON.stringify(data));
        
        return data; // Retorna os dados para possível uso imediato
    } catch (error) {
        console.error('Erro:', error);
        throw error; // Propaga o erro para ser tratado por quem chama a função
    }
}

async function organizaDadosParaGrafico_maregrafo_suape(nome_tabela, startDate, endDate){
    // extrai dados da api
    await reqAPI(nome_tabela, startDate, endDate);
    const tabelaJSON = sessionStorage.getItem(nome_tabela);
    if (!tabelaJSON) {
        console.error(`Nenhuma tabela encontrada na sessionStorage com a chave "${nome_tabela}"`);
        return false;
    }
    // Converta a string JSON em um objeto JavaScript
    const tabela = await JSON.parse(tabelaJSON);

    const tmStamp = [];
    const mare = [];

    // Supondo que a tabela é um array de objetos onde cada objeto representa uma linha
    tabela.forEach(row => {
        tmStamp.push(row.TmStamp);
        mare.push(row.Cur_SE);
    });

    return [tmStamp, mare];
}