// const logprefix_api = 'http://localhost:1848'; // localhost
// const logprefix_api = 'http://environlink.ddns.net:1848'; // ddns
const logprefix_api = 'https://oceanstream-8b3329b99e40.herokuapp.com'; // heroku

const pagOverview='./Overview/index.html';

/**********************************************************/
// INÍCIO CHECA JWT
// Função para verificar se um token JWT é válido
function isTokenValid(token) {
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp && payload.exp > currentTime;
}

// Função para obter um cookie pelo nome
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Função para remover um cookie pelo nome
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// Função para verificar a existência e validade do JWT no localStorage e cookies
function checkToken() {
    let accessToken = localStorage.getItem('accessToken');

    if (isTokenValid(accessToken)) {
        window.location.href = pagOverview;
        return;
    } else if (accessToken) {
        localStorage.removeItem('accessToken');
    }

    accessToken = getCookie('accessToken');

    if (isTokenValid(accessToken)) {
        window.location.href = pagOverview;
        return;
    } else if (accessToken) {
        deleteCookie('accessToken');
    }
}

// Verificar o token antes de carregar a página
document.addEventListener('DOMContentLoaded', checkToken);
// FIM CHECA JWT
/**********************************************************/

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
        document.cookie = `accessToken=${result.accessToken}; path=/`;

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