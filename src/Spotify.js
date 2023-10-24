const Spotify = {
    addToPlaylist(addUri, playlistId) {
        const accessToken = localStorage.getItem('accessToken');
        const headerVar = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        return fetch('https://api.spotify.com/v1/me', {
            headers: headerVar
        }).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: headerVar,
                method: 'POST',
                body: JSON.stringify({uris: addUri})
            });
        });   
    },

    removeFromPlaylist(removeUri, playlistId) {
        const accessToken = localStorage.getItem('accessToken');
        const headerVar = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        return fetch('https://api.spotify.com/v1/me', {
            headers: headerVar
        }).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: headerVar,
                method: 'DELETE',
                body: JSON.stringify({uris: removeUri})
            });
        });   
    },

    getPlaylistItems(playlist_Id) {
        const accessToken = localStorage.getItem('accessToken');
        const playlistId = playlist_Id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.items) {
                return [];
            }
            return jsonResponse.items.map(track => ({
                id: track.track.id,
                name: track.track.name,
                artist: track.track.artists[0].name,
                album: track.track.album.name,
                uri: track.track.uri,
                image: track.track.album.images[0].url,
                preview: track.track.preview_url
            }));
        });
    },

    getPlaylists() {
        const accessToken = localStorage.getItem('accessToken');
        const headerVar = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        return fetch('https://api.spotify.com/v1/me', {
            headers: headerVar
        }).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headerVar
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.items) {
                    return [];
                }
                return jsonResponse.items.map(playlist => ({
                    id: playlist.id,
                    name: playlist.name,
                    uri: playlist.uri,
                    image: playlist.images[0].url,
                    tracks: playlist.tracks
                }));
            });
        });
    },

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