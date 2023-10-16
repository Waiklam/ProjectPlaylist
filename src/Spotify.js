const client_id = 'aa80439ca21b4058a83934f31dfc0a6e';
const redirect_uri = 'http://localhost:3000/';
let accessToken;

const accessTokenVar =  getAccessToken()

function getAccessToken() {
    if (accessToken) {
        return accessToken;
    }

    const accessTokenValue = window.location.href.match(/access_token=([^&]*)/);
    const expiresInValue = window.location.href.match(/expires_in=([^]*)/);

    if (accessTokenValue && expiresInValue) {
        accessToken = accessTokenValue[1];
        const expiresIn = Number(expiresInValue[1]);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
    } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        window.location = accessUrl;
    }
}

const Spotify = {
    search(searchTerm) {
        const accessToken = accessTokenVar;
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                image: track.album.images[0].url
            }));
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
          return;
        }
    
        const accessToken = accessTokenVar;
        const headerVar = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        return fetch('https://api.spotify.com/v1/me', {
            headers: headerVar
        }).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headerVar,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headerVar,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            });
        });
    }
}   

export default Spotify;