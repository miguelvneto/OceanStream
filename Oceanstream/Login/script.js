const logprefix_api = 'http://environlink.ddns.net:1848';
// const logprefix_api = 'http://localhost:1848';

const pagOverview='../Overview/index.html';

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
    event.preventDefault(); // Evita o envio do formulário

    // Obtém os valores dos campos email e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Prepara o objeto de dados a ser enviado
    const data = {
        email: email,
        senha: senha
    };

    const corpo = JSON.stringify(data);

    try {
        // Faz a requisição POST
        const uri = logprefix_api+'/login';
        console.log(uri)
        const response = await fetch(logprefix_api+'/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: corpo
        });

        console.log('debug')
        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        // Converte a resposta em JSON
        const result = await response.json();

        // Salva o accessToken no localStorage e como cookie
        localStorage.setItem('accessToken', result.accessToken);
        document.cookie = `accessToken=${result.accessToken}; path=/`;

        window.location.href = pagOverview;
    } catch (error) {
        console.error('Erro:', error);
        // alert('Erro ao realizar login. Por favor, tente novamente.');
    }
});
