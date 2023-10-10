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
      id: 123,
      uri: 135
    }, 
    {
      name: 'what2',
      artist: 'singer2',
      album: 'album2',
      id: 456,
      uri: 246
    }, {
      name: 'what3',
      artist: 'singer3',
      album: 'album3',
      id: 789,
      uri: 357
    }
  ]

  const placeholderSearchTracks = [
    {
      name: 'what4',
      artist: 'singer4',
      album: 'album4',
      id: 321,
      uri: 753
    }, 
    {
      name: 'what5',
      artist: 'singer5',
      album: 'album5',
      id: 654,
      uri: 864
    }, 
    {
      name: 'what6',
      artist: 'singer6',
      album: 'album6',
      id: 987,
      uri: 975
    }
  ]


  const [playlistName, setPlaylistName] = useState('');
  const [searchResults, setSearchResults] = useState(placeholderSearchTracks);
  const [playlistTracks, setPlaylistTracks] = useState([]);


  const search = useCallback((searchTerm) => {
    // search on spotify
    alert(`searching for ${searchTerm}!`)
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
    setPlaylistTracks([]);
    setPlaylistName('');
    console.log(trackUris)
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