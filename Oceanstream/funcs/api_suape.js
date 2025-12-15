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

// Adicione esta função para verificar o formato da data com hora
function verificaFormatoDataComHora(str) {
    // Expressão regular para verificar o formato YYYY-MM-DD HH:mm:ss
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(str);
}

async function reqAPI(nome_tabela, startDate, endDate) {
    // Se as datas não tiverem hora, adiciona automaticamente
    if (verificaFormatoData(startDate)) {
        startDate = startDate + ' 00:00:00';
    }
    
    if (verificaFormatoData(endDate)) {
        endDate = endDate + ' 23:59:59';
    }
    
    // Verifica se agora tem o formato correto com hora
    if (!(verificaFormatoDataComHora(startDate) && verificaFormatoDataComHora(endDate))){
        console.log('Favor selecionar datas e horários válidos.')
        console.log(startDate)
        console.log(endDate)
        return;
    }
    
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
        
        return data;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
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
    const tabela = await JSON.parse(tabelaJSON);

    const tmStamp = [];
    const mare = [];

    tabela.forEach(row => {
        tmStamp.push(row.TmStamp);
        mare.push(row.Cur_SE);
    });

    return [tmStamp, mare];
}