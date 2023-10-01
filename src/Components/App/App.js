import './App.css';
import SearchBar from '../Search Bar/SearchBar';
import React, { useCallback, useState } from 'react';
import SearchResults from '../Search Results/SearchResults';
import Playlist from '../Playlist/Playlist';


function App() {

  const placeholderTracks = [
    {
      name: 'what1',
      artist: 'singer1',
      album: 'album1',
      id: 123
    }, 
    {
      name: 'what2',
      artist: 'singer2',
      album: 'album2',
      id: 456
    }, {
      name: 'what3',
      artist: 'singer3',
      album: 'album3',
      id: 789
    }
  ]
  const [playlistName, setPlaylistName] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState(placeholderTracks);


  const search = useCallback((searchTerm) => {
    // search on spotify
    alert(`searching for ${playlistTracks}!`)
  }, []);

  const addTrack = useCallback((track) => {
    alert(`${track} added!`)
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    alert(`${track} removed!`)
  }, [playlistTracks]);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    alert('saved to Spotify!');
  }, [playlistName, playlistTracks])

  return (
    <div className="App">
      <SearchBar onSearch={search} />
      <div>
        <SearchResults SearchResults={searchResults} onAdd={addTrack} />
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
