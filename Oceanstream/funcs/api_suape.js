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

async function reqLastTS(){
    head = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obterAccessToken()}`
    },
    url = prefix_api + '/ultimosTs';

    const requestOptions = {
        method: 'GET',
        headers: head
    };

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        // sessionStorage.setItem("ultimoTs", JSON.stringify(data));
        return JSON.stringify(data);
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function separaCelulas(tabelaJSON){
    // Converta a string JSON em um objeto JavaScript
    const tabela = await JSON.parse(tabelaJSON);

    // TmStamp,vel1,dir1,vel2,dir2,vel3,dir3,vel4,dir4,vel5,dir5,vel6,dir6,vel7,dir7,vel8,dir8,vel9,dir9,vel10,dir10,vel11,dir11,vel12,dir12,vel13,dir13,vel14,dir14,vel15,dir15,vel16,dir16,vel17,dir17,vel18,dir18,vel19,dir19,vel20,dir20,vel21,dir21,vel22,dir22,vel23,dir23,vel24,dir24,vel25,dir25,vel26,dir26,vel27,dir27,vel28,dir28,vel29,dir29
    const tmStamp = [];
    const vel1 = [];
    const dir1 = [];
    const vel2 = [];
    const dir2 = [];
    const vel3 = [];
    const dir3 = [];
    const vel4 = [];
    const dir4 = [];
    const vel5 = [];
    const dir5 = [];
    const vel6 = [];
    const dir6 = [];
    const vel7 = [];
    const dir7 = [];
    const vel8 = [];
    const dir8 = [];
    const vel9 = [];
    const dir9 = [];
    const vel10 = [];
    const dir10 = [];
    const vel11 = [];
    const dir11 = [];
    const vel12 = [];
    const dir12 = [];
    const vel13 = [];
    const dir13 = [];
    const vel14 = [];
    const dir14 = [];
    const vel15 = [];
    const dir15 = [];
    const vel16 = [];
    const dir16 = [];
    const vel17 = [];
    const dir17 = [];
    const vel18 = [];
    const dir18 = [];
    const vel19 = [];
    const dir19 = [];
    const vel20 = [];
    const dir20 = [];
    const vel21 = [];
    const dir21 = [];
    const vel22 = [];
    const dir22 = [];
    const vel23 = [];
    const dir23 = [];
    const vel24 = [];
    const dir24 = [];
    const vel25 = [];
    const dir25 = [];
    const vel26 = [];
    const dir26 = [];
    const vel27 = [];
    const dir27 = [];
    const vel28 = [];
    const dir28 = [];
    const vel29 = [];
    const dir29 = [];
    
    // Supondo que a tabela é um array de objetos onde cada objeto representa uma linha
    tabela.forEach(row => {
        tmStamp.push(row.TmStamp);
        vel1.push(row.vel1 );
        dir1.push(row.dir1 );
        vel2.push(row.vel2 );
        dir2.push(row.dir2 );
        vel3.push(row.vel3 );
        dir3.push(row.dir3 );
        vel4.push(row.vel4 );
        dir4.push(row.dir4 );
        vel5.push(row.vel5 );
        dir5.push(row.dir5 );
        vel6.push(row.vel6 );
        dir6.push(row.dir6 );
        vel7.push(row.vel7 );
        dir7.push(row.dir7 );
        vel8.push(row.vel8 );
        dir8.push(row.dir8 );
        vel9.push(row.vel9 );
        dir9.push(row.dir9 );
        vel10.push(row.vel10 );
        dir10.push(row.dir10 );
        vel11.push(row.vel11 );
        dir11.push(row.dir11 );
        vel12.push(row.vel12 );
        dir12.push(row.dir12 );
        vel13.push(row.vel13 );
        dir13.push(row.dir13 );
        vel14.push(row.vel14 );
        dir14.push(row.dir14 );
        vel15.push(row.vel15 );
        dir15.push(row.dir15 );
        vel16.push(row.vel16 );
        dir16.push(row.dir16 );
        vel17.push(row.vel17 );
        dir17.push(row.dir17 );
        vel18.push(row.vel18 );
        dir18.push(row.dir18 );
        vel19.push(row.vel19 );
        dir19.push(row.dir19 );
        vel20.push(row.vel20 );
        dir20.push(row.dir20 );
        vel21.push(row.vel21 );
        dir21.push(row.dir21 );
        vel22.push(row.vel22 );
        dir22.push(row.dir22 );
        vel23.push(row.vel23 );
        dir23.push(row.dir23 );
        vel24.push(row.vel24 );
        dir24.push(row.dir24 );
        vel25.push(row.vel25 );
        dir25.push(row.dir25 );
        vel26.push(row.vel26 );
        dir26.push(row.dir26 );
        vel27.push(row.vel27 );
        dir27.push(row.dir27 );
        vel28.push(row.vel28 );
        dir28.push(row.dir28 );
        vel29.push(row.vel29 );
        dir29.push(row.dir29 );
    });

    return [
        tmStamp,vel1,dir1,vel2,dir2,vel3,dir3,vel4,dir4,vel5,dir5,vel6,dir6,vel7,dir7,vel8,dir8,vel9,dir9,vel10,dir10,
        vel11,dir11,vel12,dir12,vel13,dir13,vel14,dir14,vel15,dir15,vel16,dir16,vel17,dir17,vel18,dir18,vel19,dir19,vel20,dir20,
        vel21,dir21,vel22,dir22,vel23,dir23,vel24,dir24,vel25,dir25,vel26,dir26,vel27,dir27,vel28,dir28,vel29,dir29
    ];
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