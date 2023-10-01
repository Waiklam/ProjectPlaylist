import React, { useCallback } from "react";
import TrackList from "../TrackList/TrackList";

const Playlist = (props) => {
    const handleNameChange = useCallback((e) => {
        props.onNameChange(e.target.value);
    }, [props.onNameChange]);

    return (
        <div className="Playlist">
            <input onChange={handleNameChange} placeholder={'New Playlist'} />
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