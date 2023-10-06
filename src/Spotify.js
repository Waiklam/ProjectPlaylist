const client_id = 'aa80439ca21b4058a83934f31dfc0a6e';
const redirect_uri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        
    }
}   

