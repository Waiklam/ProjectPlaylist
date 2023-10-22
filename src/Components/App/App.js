import './App.css';
import SearchBar from '../Search Bar/SearchBar';
import React, { useCallback, useState } from 'react';
import SearchResults from '../Search Results/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Spotify';
import getAccessToken from '../../Authentication';


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
    if (playlistName && playlistTracks.length > 0) {
      const trackUris = playlistTracks.map((track) => track.uri);
      Spotify.savePlaylist(playlistName, trackUris).then(() => {
        setPlaylistName('');
        setPlaylistTracks([]);
      });
    } else if (playlistName && !playlistTracks.length > 0) {
      alert('Add songs to playlist!')
    } else if (!playlistName && playlistTracks.length > 0) {
      alert('Enter a Playlist Name!')
    } else if (!playlistName && !playlistTracks.length > 0) {
      alert('Enter a Playlist Name and Add Songs to Playlist!')
    }
  }, [playlistName, playlistTracks])

  const login = useCallback(() => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken === null) {
      return (
        <div className='Login'>
          <h1>Please Login</h1>
          <button className='Login_Button' onClick={getAccessToken}>Login</button>
        </div>
      )
    }
    return (
      <>
        <SearchBar className='Search_Section' onSearch={search} /> 
      </>      
    )
  }, [search])

  let hash = window.location.hash;
  if (hash) {
    getAccessToken();
  }
  
  return (
    <div className='Main'>
      <h1 id="Title">Spotify Playlist Maker!</h1>
      <div className="App">
        {login()}
        <div className='AfterSearch'>
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
      <div className='Area'>
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      
    </div>
  );
}

export default App;
