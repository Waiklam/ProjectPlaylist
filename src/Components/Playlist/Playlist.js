import React, { useCallback } from "react";
import TrackList from "../TrackList/TrackList";
import SpotifyIcon from '../SpotifyIcon.png';
import "../QOLcode/input.css"
import "./Playlist.css"

const Playlist = (props) => {
    const { onNameChange, userPlaylistName, userPlaylistImage, userPlaylistUri } = props;
    const handleNameChange = useCallback((e) => {
        onNameChange(e.target.value);
    }, [onNameChange]);

    const playlistState = useCallback(() => {
        if (userPlaylistName !== '') {
            return (
                <div className="Editing">
                    <div className="Individual_Playlist">
                        <a className="Link" href={userPlaylistUri}>
                            <img className="Album_Image Spacer" src={userPlaylistImage} alt="Album Cover" />
                            <h1 className="Spacer">{userPlaylistName}</h1>
                            <img className="Spotify_Icon Spacer" src={SpotifyIcon} alt="Spotify Icon"/>
                        </a>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <h2>Creating Playlist</h2>
                <label className="input">
                    <input className="input__field" onChange={handleNameChange} placeholder={'New Playlist'} value={props.playlistName} />
                    <span className="input__label">Playlist Name</span>
                </label>
            </div>
        )
    }, [userPlaylistName, handleNameChange, props.playlistName, userPlaylistImage, userPlaylistUri])

    return (
        <div className="Playlist">
            <div className="Card Overview">
                <div className="Save">
                    {playlistState()}
                    <div className="button-group">
                        <button onClick={props.onSave}>Save</button>
                    </div>
                </div>
                <TrackList 
                    className="Playlist_Tracks"
                    tracks={props.playlistTracks} 
                    isRemoval={true}
                    onRemove={props.onRemove}
                    volume={props.volume}
                />
            </div>
        </div>
    );
};

export default Playlist;