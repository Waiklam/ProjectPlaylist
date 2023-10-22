
const Spotify = {
    search(searchTerm) {
        const accessToken = localStorage.getItem('accessToken');
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
                image: track.album.images[0].url,
                preview: track.preview_url
            }));
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
          return;
        }
    
        const accessToken = localStorage.getItem('accessToken');
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