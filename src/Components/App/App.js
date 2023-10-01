import './App.css';

import SearchBar from '../Search Bar/SearchBar';

import React, { useCallback, useState } from 'react';

import SearchResults from '../Search Results/SearchResults';

import Playlist from '../Playlist/Playlist';


function App() {

  const [playlistName, setPlaylistName] = useState('');
  const [searchResults, setSearchResults] = useState('');


  const search = useCallback((search) => {
    // search on spotify
    alert(`searching for ${search}!`)
  }, []);

  const addTrack = useCallback((track) => {
    alert(`${track} added!`)
  })

  const removeTrack = useCallback((track) => {
    alert(`${track} removed!`)
  })

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  });

  return (
    <div className="App">
      <SearchBar onSearch={search} />
      <SearchResults SearchResults={searchResults} onAdd={addTrack} />
      <Playlist 
        playlistName={playlistName}
        onNameChange={updatePlaylistName}
        onRemove={removeTrack}
        onAdd={addTrack}
      />
      
    </div>
  );
}

export default App;
