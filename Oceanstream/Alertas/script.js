const pth_res = "../res"
const pth_bom = pth_res + "/status_bom.png" + '?v=' + new Date().getTime();
const pth_neutro = pth_res + "/status_neutro.png" + '?v=' + new Date().getTime();
const pth_ruim = pth_res + "/status_alerta.png" + '?v=' + new Date().getTime();

function calcularTempoDesdeUltimoDado(dataString) {
    const dataUltimoDado = new Date(dataString);
    const agora = new Date();
    const diferencaMs = agora - dataUltimoDado;
    const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
    return diferencaMinutos; // retorna os minutos desde o último dado
}

function preencherTabela(dados) {
    const tabela = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    dados.forEach(dado => {
        const novaLinha = tabela.insertRow();

        const celulaSituacao = novaLinha.insertCell(0);
        const celulaNome = novaLinha.insertCell(1);
        const celulaUltimoDado = novaLinha.insertCell(2);
        const celulaTempoDesdeUltimoDado = novaLinha.insertCell(3);

        celulaNome.textContent = dado.nome;
        celulaUltimoDado.textContent = dado.ultimoDado.slice(0, -3);
        const intervalo_mins = calcularTempoDesdeUltimoDado(dado.ultimoDado);
        
        if (intervalo_mins < 60){ // 1 hora
            celulaTempoDesdeUltimoDado.textContent = `${intervalo_mins} minutos`;
        } else if (intervalo_mins < 1440) { // 1 dia
            // Converte o total de minutos em horas e minutos
            const horas = Math.floor(intervalo_mins / 60);  // Calcula o número de horas
            const minutos = intervalo_mins % 60;           // Calcula o número de minutos restantes

            // Exibe o tempo no formato "X horas e Y minutos"
            celulaTempoDesdeUltimoDado.textContent = `${horas}h e ${minutos}min`;
        } else {
            const dias = Math.floor(intervalo_mins / 1440); // Calcula o número de dias
            const horas = Math.floor((intervalo_mins % 1440) / 60); // Calcula o número de horas restantes
            const minutos = intervalo_mins % 60; // Calcula o número de minutos restantes

            // Exibe o tempo no formato "X dias, Y horas e Z minutos"
            celulaTempoDesdeUltimoDado.textContent = `${dias}d, ${horas}h e ${minutos}min`;
        }

        if (intervalo_mins < 60){ // intervalo menor que 1 hora
            dado.situacao = "1";
        } else if (intervalo_mins < 240) { // intervalo menor que 4 horas
            dado.situacao = "2";
        } else { // intervalo MAIOR que 4 horas
            dado.situacao = "3";
        }
        const img = document.createElement("img");
        img.className = "img_status";
        if (dado.situacao === "1") {
            img.src = pth_bom;
        } else if (dado.situacao === "2") {
            img.src = pth_neutro;
        } else if (dado.situacao === "3") {
            img.src = pth_ruim;
        }
        celulaSituacao.appendChild(img);
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    // Seleciona o elemento <link> que carrega o CSS
    const linkElement = document.querySelector('link[rel="stylesheet"]');
    if (linkElement) {
        // Adiciona um parâmetro dinâmico à URL (timestamp atual)
        linkElement.href = linkElement.href + '?v=' + new Date().getTime();
    }

    const ultimoTs = JSON.parse(await reqLastTS());

    var dados = [
        { situacao: "", ultimoDado: "", nome: "ADCP - Boia 4",          ref: "Boia04_PNORI" },
        { situacao: "", ultimoDado: "", nome: "ADCP - Boia 8",          ref: "Boia08_PNORI" },
        { situacao: "", ultimoDado: "", nome: "ADCP - Boia 10",         ref: "Boia10_PNORI" },
        { situacao: "", ultimoDado: "", nome: "Ondógrafo - Píer II",    ref: "PII" },
        { situacao: "", ultimoDado: "", nome: "Ondógrafo - TGL",        ref: "TGL" },
        { situacao: "", ultimoDado: "", nome: "Ondógrafo - TPD",        ref: "TPD" },
        { situacao: "", ultimoDado: "", nome: "Ondógrafo - TPM",        ref: "TPM" },
        { situacao: "", ultimoDado: "", nome: "Marégrafo",              ref: "Maregrafo" },
        { situacao: "", ultimoDado: "", nome: "Estação Meteorológica",  ref: "Estacao" }
    ];

    // Itera sobre cada elemento em 'dados'
    dados.forEach(function(item) {
        // Procura um elemento correspondente na matriz 'ultimoTs'
        const match = ultimoTs.find(function(element) {
            return element[0].includes(item.ref);
        });

        // Se uma correspondência for encontrada, atualiza o campo 'ultimoDado'
        if (match) {
            item.ultimoDado = match[1];
        }
    });

    preencherTabela(dados);
});
