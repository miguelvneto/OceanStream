const logprefix_api = prefix_api;

const pagOverview='./Overview/index.html';
const pagLogin = './index.html';

document.getElementById('loginButton').addEventListener('click', async function(event) {
    const paragrafo = document.querySelector('.msg_pos p');
    paragrafo.textContent = '\n';
    paragrafo.className = ''; // Remove classes de estilo anteriores
    event.preventDefault(); // Evita o envio do formulário

    // Obtém os valores dos campos email e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Remove caracteres inválidos do email (espaços, quebras de linha, tabs)
    const emailLimpo = email.replace(/[\s\t\n\r]/g, '');

    // Prepara o objeto de dados a ser enviado
    const data = {
        email: emailLimpo,
        senha: senha
    };

    const corpo = JSON.stringify(data);

    try {
        // Faz a requisição POST
        const response = await fetch(logprefix_api+'/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: corpo
        });

        if (response.status == 401){
            paragrafo.textContent = 'Credenciais incorretas. Verifique seu email e senha.';
            paragrafo.className = 'error-message'; // Adiciona classe para estilização
            return;
        } else if (!response.ok) {
            paragrafo.textContent = 'Não foi possível conectar ao servidor no momento. Tente novamente em alguns instantes.';
            paragrafo.className = 'error-message'; // Adiciona classe para estilização
            return;
        }

        // Converte a resposta em JSON
        const result = await response.json();

        // Salva o accessToken no localStorage e como cookie
        localStorage.setItem('accessToken', result.accessToken);

        window.location.href = pagOverview;
    } catch (error) {
        paragrafo.textContent = 'Não foi possível conectar ao servidor no momento. Tente novamente em alguns instantes.';
        paragrafo.className = 'error-message'; // Adiciona classe para estilização
        console.error('Erro:', error);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const linkElement = document.querySelector('link[rel="stylesheet"]');
    if (linkElement) {
        // Adiciona um parâmetro dinâmico à URL (timestamp atual)
        linkElement.href = linkElement.href + '?v=' + new Date().getTime();
    }
});