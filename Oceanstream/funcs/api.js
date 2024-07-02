// const prefix_api = 'http://localhost:1848'; // localhost
// const prefix_api = 'http://environlink.ddns.net:1848'; // ddns
const prefix_api = 'https://oceanstream-8b3329b99e40.herokuapp.com'; // heroku

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
    const corpo = JSON.stringify({
        tabela: nome_tabela,
        dt_inicial: startDate,
        dt_final: endDate
    }),
    head = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obterAccessToken()}`
    },
    url = prefix_api + '/dados';

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
        sessionStorage.setItem(nome_tabela, JSON.stringify(data));
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function organizaDadosParaGrafico_awacCorr(nome_tabela, startDate, endDate){
    // extrai dados da api
    await reqAPI(nome_tabela, startDate, endDate);
    const tabelaJSON = sessionStorage.getItem(nome_tabela);
    if (!tabelaJSON) {
        console.error(`Nenhuma tabela encontrada na sessionStorage com a chave "${nome_tabela}"`);
        return false;
    }
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

    // fetchData(waveGraph, 'wave', );
    return [
        tmStamp,vel1,dir1,vel2,dir2,vel3,dir3,vel4,dir4,vel5,dir5,vel6,dir6,vel7,dir7,vel8,dir8,vel9,dir9,vel10,dir10,
        vel11,dir11,vel12,dir12,vel13,dir13,vel14,dir14,vel15,dir15,vel16,dir16,vel17,dir17,vel18,dir18,vel19,dir19,vel20,dir20,
        vel21,dir21,vel22,dir22,vel23,dir23,vel24,dir24,vel25,dir25,vel26,dir26,vel27,dir27,vel28,dir28,vel29,dir29
    ];
}

async function organizaDadosParaGrafico_awacOnda(nome_tabela, startDate, endDate){
    // extrai dados da api
    await reqAPI(nome_tabela, startDate, endDate);
    const tabelaJSON = sessionStorage.getItem(nome_tabela);
    if (!tabelaJSON) {
        console.error(`Nenhuma tabela encontrada na sessionStorage com a chave "${nome_tabela}"`);
        return false;
    }
    // Converta a string JSON em um objeto JavaScript
    const tabela = await JSON.parse(tabelaJSON);

    // Inicialize arrays para armazenar os valores das colunas
    const tmStamp = [];
    const hm0 = [];
    const tp = [];
    const dirTp = [];

    // Supondo que a tabela é um array de objetos onde cada objeto representa uma linha
    tabela.forEach(row => {
        tmStamp.push(row.TmStamp);
        hm0.push(row.PNORW_Hm0);
        tp.push(row.PNORW_Tp);
        dirTp.push(row.PNORW_DirTp);
    });

    // fetchData(waveGraph, 'wave', );
    return [tmStamp, hm0, tp, dirTp];
}

async function organizaDadosParaGrafico_estacao(nome_tabela, startDate, endDate){
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
    const vento_vel = [];
    const vento_dir = [];
    const vento_rajada = [];
    const chuva = [];

    // Supondo que a tabela é um array de objetos onde cada objeto representa uma linha
    tabela.forEach(row => {
        tmStamp.push(row.TmStamp);
        vento_vel.push(row.Velocidade_Vento);
        vento_dir.push(row.Direcao_Vento);
        vento_rajada.push(row.Rajada_Vento);
        chuva.push(row.Chuva);
    });

    // fetchData(waveGraph, 'wave', );
    return [tmStamp, vento_vel, vento_dir, vento_rajada, chuva];
}

async function organizaDadosParaGrafico_ondografo(nome_tabela, startDate, endDate){
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
    const hm0 = [];
    const hmax = [];
    const tz = [];
    const tp_alisado = [];

    // Supondo que a tabela é um array de objetos onde cada objeto representa uma linha
    tabela.forEach(row => {
        tmStamp.push(row.TmStamp);
        hm0.push(row.hm0);
        hmax.push(row.hmax);
        tz.push(row.tz);
        tp_alisado.push(row.tp_alisado);
    });

    return [tmStamp, hm0, hmax, tz, tp_alisado];
}

async function organizaDadosParaGrafico_maregrafo(nome_tabela, startDate, endDate){
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
        mare.push(row.Mare_Reduzida);
    });

    return [tmStamp, mare];
}