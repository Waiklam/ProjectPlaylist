import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import React, { useCallback, useState } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Spotify';
import getAccessToken from '../../Authentication';
import UserPlaylists from '../UserPlaylist/UserPlaylists';



function App() {
  const [playlistName, setPlaylistName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [addUri, setAddUri] = useState([]);
  const [removeUri, setRemoveUri] = useState([]);
  const [playlistId, setPlaylistId] = useState('');

  const getPlaylists = useCallback(() => {
    setIsPlaylist(true);
    Spotify.getPlaylists().then(setUserPlaylists);
  }, []);

  const selectPlaylist = useCallback((number) => {
    const playlistId = userPlaylists[number].id;
    setPlaylistId(playlistId);
    setAddUri([]);
    setRemoveUri([]);
    Spotify.getPlaylistItems(playlistId).then(setPlaylistTracks);
  }, [userPlaylists]);

  const search = useCallback((searchTerm) => {
    // search on spotify
    setIsPlaylist(false);
    Spotify.search(searchTerm).then(setSearchResults);
  }, []);

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;
    // alert(`${track} added!`)
    setPlaylistTracks((prevTracks) => [track, ...prevTracks]);
    if (addUri.some((savedTrack) => savedTrack.id === track.id))
        return;
    setAddUri((prevTracks) => [...prevTracks, track.uri]);
  }, [playlistTracks, addUri]);

  const removeTrack = useCallback((track) => {
    // alert(`${track} removed!`)
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
    if (removeUri.some((savedTrack) => savedTrack.id === track.id))
        return;
    setRemoveUri((prevTracks) => [...prevTracks, track.uri]);
  }, [removeUri]);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    if (playlistId) {
      Spotify.addToPlaylist(addUri, playlistId);
      Spotify.removeFromPlaylist(removeUri, playlistId);
      setAddUri([]);
      setRemoveUri([]);
      return;
    }

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
        <SearchBar onSearch={search} onPlaylist={getPlaylists} /> 
      </>      
    )
  }, [search, getPlaylists])

  let hash = window.location.hash;
  if (hash) {
    getAccessToken();
  }

  const checkUri = useCallback(() => {
    console.log(playlistId);
    console.log(removeUri);
    console.log(addUri);
  })
  
  return (
    <div className='Main'>
      <h1 id="Title">Spotify Playlist Maker!</h1>
      <button className='checkButton' onClick={checkUri}>Test</button>
      <div className="App">
        {login()}
        <div className='AfterSearch'>
          <div className='ResultsArea'>
            { !isPlaylist ? <SearchResults searchResults={searchResults} onAdd={addTrack} /> : null }
            { isPlaylist ? <UserPlaylists userPlaylists={userPlaylists} onSelect={selectPlaylist} /> : null }
          </div>
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
        <ul className="circles">
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
