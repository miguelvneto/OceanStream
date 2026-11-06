const pagLogin = '../Login/';

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

// Função para remover um cookie pelo nome
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// Função para verificar a existência e validade do JWT no localStorage e cookies
function checkToken() {
    let localStorageToken = localStorage.getItem('accessToken');

    // Verifica se existe pelo menos um token válido
    if (isTokenValid(localStorageToken)) {
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

function obterAcessosJWT() {
    const token = obterAccessToken();
    if (!token) return null;

    try {
        const partes = token.split('.');
        if (partes.length !== 3) return null;

        const base64 = partes[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const bytes = Uint8Array.from(atob(base64), c =>
            c.charCodeAt(0)
        );

        const payload = JSON.parse(
            new TextDecoder().decode(bytes)
        );

        return typeof payload.acessos === 'string'
            ? payload.acessos
            : null;

    } catch {
        return null;
    }
}

// Verificar o token antes de carregar a página
document.addEventListener('DOMContentLoaded', checkToken);
// FIM CHECA JWT
/**********************************************************/