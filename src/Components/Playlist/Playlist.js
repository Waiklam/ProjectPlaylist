import React, { useCallback } from "react";
import TrackList from "../TrackList/TrackList";

const Playlist = (props) => {
    const { onNameChange } = props;
    const handleNameChange = useCallback((e) => {
        onNameChange(e.target.value);
    }, [onNameChange]);

    return (
        <div className="Playlist">
            <input onChange={handleNameChange} placeholder={'New Playlist'} value={props.playlistName} />
            <button onClick={props.onSave}>Save To Spotify</button>
            <TrackList 
                tracks={props.playlistTracks} 
                isRemoval={true}
                onRemove={props.onRemove}
            />
        </div>
    );
};

export default Playlist;