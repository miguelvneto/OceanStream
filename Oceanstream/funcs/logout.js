const pagLogin = '../index.html';

function obterAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
}

// FUNÇÃO LOGOUT
function deleteTokenAndRedirect() {
    // Remover o accessToken do localStorage
    localStorage.removeItem('accessToken');
    
    // Função para remover um cookie pelo nome
    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }

    // Remover o accessToken dos cookies
    deleteCookie('accessToken');

    // Redirecionar para a página de login
    window.location.href = pagLogin;
}

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
    let localStorageToken = localStorage.getItem('accessToken');
    let cookieToken = getCookie('accessToken');

    // Verifica se existe pelo menos um token válido
    if (isTokenValid(localStorageToken) || isTokenValid(cookieToken)) {
        return; // Se algum token válido foi encontrado, não faz nada
    } else {
        // Caso nenhum token válido seja encontrado, remove e redireciona para a página de lsogin
        if (localStorageToken) {
            localStorage.removeItem('accessToken');
        }
        if (cookieToken) {
            deleteCookie('accessToken');
        }
        window.location.href = pagLogin;
    }
}

// Verificar o token antes de carregar a página
document.addEventListener('DOMContentLoaded', checkToken);
// FIM CHECA JWT
/**********************************************************/