import './App.css';
import SearchBar from '../Search Bar/SearchBar';
import React, { useCallback, useState } from 'react';
import SearchResults from '../Search Results/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Spotify';


function App() {
  const [playlistName, setPlaylistName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);


  const search = useCallback((searchTerm) => {
    // search on spotify
    Spotify.search(searchTerm).then(setSearchResults);
  }, []);

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;
    // alert(`${track} added!`)
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    // alert(`${track} removed!`)
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('');
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks])

  return (
    <div className="App">
      <SearchBar onSearch={search} />
      <div>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist 
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onNameChange={updatePlaylistName}
          onRemove={removeTrack}
          onSave={savePlaylist}
        />
      </div>      
    </div>
  );
}

export default App;
