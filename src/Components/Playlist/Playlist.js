import React, { useCallback } from "react";
import TrackList from "../TrackList/TrackList";
import "../QOLcode/input.css"
import "./Playlist.css"

const Playlist = (props) => {
    const { onNameChange, userPlaylistName } = props;
    const handleNameChange = useCallback((e) => {
        onNameChange(e.target.value);
    }, [onNameChange]);

    const playlistState = useCallback(() => {
        if (userPlaylistName !== '') {
            return (
                <div>
                    <h2>Editing Playlist</h2>
                    <h3>{userPlaylistName}</h3>
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
    })

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
                />
            </div>
        </div>
    );
};

export default Playlist;