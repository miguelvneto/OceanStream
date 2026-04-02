const pth_res = "../res"
const pth_bom = pth_res + "/status_bom.png" + '?v=' + new Date().getTime();
const pth_neutro = pth_res + "/status_neutro.png" + '?v=' + new Date().getTime();
const pth_ruim = pth_res + "/status_alerta.png" + '?v=' + new Date().getTime();
const pth_manutencao = pth_res + "/status_manutencao.png" + '?v=' + new Date().getTime(); // Imagem para status de manutenção

// ============================================
// CONFIGURAÇÃO DE MANUTENÇÃO
// ============================================
// Para colocar um equipamento em manutenção, adicione a referência exata (ref) 
// no array abaixo no formato: "ref_do_equipamento"
// 
// IMPORTANTE: Use a mesma referência que está no array 'dados' (campo 'ref')
// ============================================
const EQUIPAMENTOS_EM_MANUTENCAO = [
    // "Boia04_PNORI",  // Boia 4
    // "Boia08_PNORI",  // Boia 8
    "Boia10_PNORI"  // Boia 10
    // "PII",           // Ondógrafo Píer II
    // "TGL",           // Ondógrafo TGL
    // "TPD",           // Ondógrafo TPD
    // "TPM",           // Ondógrafo TPM
    // "Maregrafo",     // Marégrafo
    // "Estacao"        // Estação Meteorológica
];

// Observação opcional para cada equipamento em manutenção
// Será exibida junto com a informação de manutenção
const OBSERVACAO_MANUTENCAO = {
    "Boia10_PNORI": "Rodízio na Boia",
    // "Boia08_PNORI": "Calibração programada",
    // "Maregrafo": "Problema na transmissão de dados - Equipe técnica acionada",
};

// ============================================

function calcularTempoDesdeUltimoDado(dataString) {
    const dataUltimoDado = new Date(dataString);
    const agora = new Date();
    const diferencaMs = agora - dataUltimoDado;
    const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
    return diferencaMinutos;
}

// Função para verificar se um equipamento está em manutenção
function estaEmManutencao(ref) {
    return EQUIPAMENTOS_EM_MANUTENCAO.includes(ref);
}

// Função para obter o texto de tempo para equipamento em manutenção
function getTextoManutencao(ref, intervalo_mins) {
    const observacao = OBSERVACAO_MANUTENCAO[ref];
    
    // Primeiro formata o tempo normal (igual aos outros equipamentos)
    let tempoTexto = "";
    if (intervalo_mins < 60) {
        tempoTexto = `${intervalo_mins} minutos`;
    } else if (intervalo_mins < 1440) {
        const horas = Math.floor(intervalo_mins / 60);
        const minutos = intervalo_mins % 60;
        tempoTexto = `${horas}h e ${minutos}min`;
    } else {
        const dias = Math.floor(intervalo_mins / 1440);
        const horas = Math.floor((intervalo_mins % 1440) / 60);
        const minutos = intervalo_mins % 60;
        tempoTexto = `${dias}d, ${horas}h e ${minutos}min`;
    }
    
    // Monta a string de manutenção
    let manutencaoTexto = `${tempoTexto} 🔧 (Em Manutenção`;
    
    // Adiciona a observação se disponível
    if (observacao) {
        manutencaoTexto += ` - ${observacao}`;
    }
    
    manutencaoTexto += `)`;
    
    return manutencaoTexto;
}

function preencherTabela(dados) {
    const tabela = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    // Limpa a tabela antes de preencher
    tabela.innerHTML = '';
    
    dados.forEach(dado => {
        const novaLinha = tabela.insertRow();

        const celulaSituacao = novaLinha.insertCell(0);
        const celulaNome = novaLinha.insertCell(1);
        const celulaUltimoDado = novaLinha.insertCell(2);
        const celulaTempoDesdeUltimoDado = novaLinha.insertCell(3);

        celulaNome.textContent = dado.nome;
        
        // Verifica se o equipamento está em manutenção
        const emManutencao = estaEmManutencao(dado.ref);
        
        // SEMPRE mostra o último dado, independente da manutenção
        celulaUltimoDado.textContent = dado.ultimoDado ? dado.ultimoDado.slice(0, -3) : "Sem dados";
        
        if (!dado.ultimoDado) {
            // Sem dados
            celulaTempoDesdeUltimoDado.textContent = "Sem dados";
            const img = document.createElement("img");
            img.className = "img_status";
            img.src = pth_ruim;
            celulaSituacao.appendChild(img);
        } else {
            const intervalo_mins = calcularTempoDesdeUltimoDado(dado.ultimoDado);
            
            if (emManutencao) {
                // Equipamento em manutenção: mostra o tempo normal + indicador de manutenção + observação
                celulaTempoDesdeUltimoDado.textContent = getTextoManutencao(dado.ref, intervalo_mins);
                
                // Adiciona tooltip para mostrar a observação completa (útil para textos longos)
                const observacao = OBSERVACAO_MANUTENCAO[dado.ref];
                if (observacao) {
                    celulaTempoDesdeUltimoDado.title = observacao;
                    celulaTempoDesdeUltimoDado.style.cursor = "help";
                }
                
                // Imagem de manutenção
                const img = document.createElement("img");
                img.className = "img_status";
                img.src = pth_manutencao;
                img.alt = "Em Manutenção";
                if (observacao) {
                    img.title = observacao;
                }
                celulaSituacao.appendChild(img);
            } else {
                // Comportamento normal para equipamentos não em manutenção
                if (intervalo_mins < 60) {
                    celulaTempoDesdeUltimoDado.textContent = `${intervalo_mins} minutos`;
                } else if (intervalo_mins < 1440) {
                    const horas = Math.floor(intervalo_mins / 60);
                    const minutos = intervalo_mins % 60;
                    celulaTempoDesdeUltimoDado.textContent = `${horas}h e ${minutos}min`;
                } else {
                    const dias = Math.floor(intervalo_mins / 1440);
                    const horas = Math.floor((intervalo_mins % 1440) / 60);
                    const minutos = intervalo_mins % 60;
                    celulaTempoDesdeUltimoDado.textContent = `${dias}d, ${horas}h e ${minutos}min`;
                }

                if (intervalo_mins < 60) {
                    dado.situacao = "1";
                } else if (intervalo_mins < 240) {
                    dado.situacao = "2";
                } else {
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
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", async function() {
    // Seleciona o elemento <link> que carrega o CSS
    const linkElement = document.querySelector('link[rel="stylesheet"]');
    if (linkElement) {
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
        const match = ultimoTs.find(function(element) {
            return element[0].includes(item.ref);
        });

        if (match) {
            item.ultimoDado = match[1];
        }
    });

    preencherTabela(dados);
});