import React, { useCallback } from "react";
import TrackList from "../TrackList/TrackList";
import "../QOLcode/input.css"
import "./Playlist.css"

const Playlist = (props) => {
    const { onNameChange } = props;
    const handleNameChange = useCallback((e) => {
        onNameChange(e.target.value);
    }, [onNameChange]);

    return (
        <div className="Playlist">
            <div className="Card Overview">
                <h2>Save to Spotify</h2>
                <label className="input">
                    <input className="input__field" onChange={handleNameChange} placeholder={'New Playlist'} value={props.playlistName} />
                    <span className="input__label">Playlist Name</span>
                </label>
                <div className="button-group">
                    <button onClick={props.onSave}>Save</button>
                    <button type="reset">Clear</button>
                </div>
                <TrackList 
                tracks={props.playlistTracks} 
                isRemoval={true}
                onRemove={props.onRemove}
                />
            </div>
        </div>
    );
};

export default Playlist;