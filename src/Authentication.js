const client_id = 'aa80439ca21b4058a83934f31dfc0a6e';
const redirect_uri = 'https://waiklam.github.io/ProjectSpotify/';
//const redirect_uri = 'http://localhost:3000/';
let accessToken;

function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getAccessToken() {
    const accessTokenValue = window.location.href.match(/access_token=([^&]*)/);
    const expiresInValue = window.location.href.match(/expires_in=([^]*)/);

    if (accessTokenValue && expiresInValue) {
        accessToken = accessTokenValue[1];
        const expiresIn = Number(expiresInValue[1].match(/[0-9]+/));
        console.log(expiresIn)
        window.setTimeout(() => {
            accessToken = ''
            localStorage.removeItem('accessToken');
            getAccessToken();
        }, expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    } else {
        var state = generateRandomString(16);
        const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        
        window.location.href = url;
    }
}

export default getAccessToken;