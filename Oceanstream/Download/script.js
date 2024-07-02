// const dlprefix_api = 'http://localhost:1848'; // localhost
// const dlprefix_api = 'http://environlink.ddns.net:1848'; // ddns
const dlprefix_api = 'https://oceanstream-8b3329b99e40.herokuapp.com'; // heroku

const nome_arquivo = 'tabelas.zip';

async function reqAPIdl(nomes_tabelas, startDate, endDate) {
    if (!(verificaFormatoData(startDate) && verificaFormatoData(endDate))){
        console.log('Favor selecionar datas válidas.')
        console.log(startDate)
        console.log(endDate)
        return;
    }
    const corpo = JSON.stringify({
        tabelas: nomes_tabelas,
        dt_inicial: startDate,
        dt_final: endDate
    }),
    head = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${obterAccessToken()}`
    },
    url = dlprefix_api+'/dadosZip';

    const requestOptions = {
        method: 'POST',
        headers: head,
        body: corpo
    };

    console.log(requestOptions);
    console.log(corpo);
    // corpo
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const blob = await response.blob();
        downloadBlob(blob, nome_arquivo);
        return null;
    } catch (error) {
        console.error('Erro ao fazer a requisição ou baixar o JSON:', error);
    }
}

function downloadBlob(blob, fileName) {
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

document.addEventListener('DOMContentLoaded', function() {
    // #######################################################################
    // GERA DATA PLACEHOLDER
    const today = new Date();
    const amanha = new Date(today);
    const ontem = new Date(today)
    amanha.setDate(today.getDate() + 1);
    ontem.setDate(today.getDate() - 31);

    // Função para formatar a data no formato YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    document.getElementById('start-date').value = formatDate(ontem);
    document.getElementById('end-date').value = formatDate(amanha);

    document.getElementById('botao_csv').addEventListener('click', async (event) => {
        downloadData('csv');
    });

    // document.getElementById('botao_xlsx').addEventListener('click', async (event) => {
    //     downloadData('xlsx');
    // });
})

async function downloadData(format) {
    // const form = document.getElementById('download-form');
    var equips_marcados = [];
    // const formData = new FormData(form);
    // const data = {};

    if (document.getElementById('boia4-check').checked){
        equips_marcados.push('ADCP-Boia04_corrente');
        equips_marcados.push('ADCP-Boia04_onda');
        equips_marcados.push('ADCP-Boia04_PNORF');
        equips_marcados.push('ADCP-Boia04_PNORE');
    }
    if (document.getElementById('boia8-check').checked){
        equips_marcados.push('ADCP-Boia08_corrente');
        equips_marcados.push('ADCP-Boia08_onda');
        equips_marcados.push('ADCP-Boia08_PNORF');
        equips_marcados.push('ADCP-Boia08_PNORE');
    }
    if (document.getElementById('boia10-check').checked){
        equips_marcados.push('ADCP-Boia10_corrente');
        equips_marcados.push('ADCP-Boia10_onda');
        equips_marcados.push('ADCP-Boia10_PNORF');
        equips_marcados.push('ADCP-Boia10_PNORE');
    }
    if (document.getElementById('ondografo-pii-check').checked){
        equips_marcados.push('Ondografo-PII_tab_parametros');
    }
    if (document.getElementById('ondografo-tpm-check').checked){
        equips_marcados.push('Ondografo-TPM_tab_parametros');
    }
    if (document.getElementById('ondografo-tpd-check').checked){
        equips_marcados.push('Ondografo-TPD_tab_parametros');
    }
    if (document.getElementById('ondografo-tgl-check').checked){
        equips_marcados.push('Ondografo-TGL_tab_parametros');
    }
    if (document.getElementById('maregrafo-check').checked){
        equips_marcados.push('Maregrafo-TU_Maregrafo_Troll');
    }
    if (document.getElementById('estacao-meteorologica-check').checked){
        equips_marcados.push('TU_Estacao_Meteorologica');
    }

    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    console.log(equips_marcados);
    reqAPIdl(equips_marcados, startDate, endDate);
    // for (const nome_tabela of equips_marcados) {
    //     sessionStorage.removeItem(nome_tabela); // garante que não vai utilizar dados salvos anteriormente
    //     reqAPI(nome_tabela, startDate, endDate);
    // }

    // formData.forEach((value, key) => {
    //     if (!data[key]) {
    //         data[key] = value;
    //     } else {
    //         if (!Array.isArray(data[key])) {
    //             data[key] = [data[key]];
    //         }
    //         data[key].push(value);
    //     }
    // });

    // const equipments = data['equipments'];
    // const magnitudes = {};

    // form.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
    //     const nameParts = checkbox.name.split('-');
    //     const equipment = nameParts[0];
    //     const magnitude = checkbox.value;

    //     if (nameParts.length > 1) {
    //         if (!magnitudes[equipment]) {
    //             magnitudes[equipment] = [];
    //         }
    //         magnitudes[equipment].push(magnitude);
    //     }
    // });

    // const requestData = {
    //     startDate,
    //     endDate,
    //     equipments: equipments ? (Array.isArray(equipments) ? equipments : [equipments]) : [],
    //     magnitudes
    // };

    // console.log('Data to export:', requestData);
    // alert(`Exporting data as ${format.toUpperCase()}`);
    // Add AJAX request to your server here to generate and download the file
}

function toggleOptions(id) {
    const options = document.getElementById(id);
    options.classList.toggle('show');
}

function toggleAll(id, checkbox) {
    const options = document.getElementById(id);
    const checkboxes = options.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((cb) => {
        cb.checked = checkbox.checked;
    });
    toggleOptions(id)
}
