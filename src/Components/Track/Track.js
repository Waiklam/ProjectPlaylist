import React, { useCallback } from "react";
import "./Track.css"

const Track = (props) => {
    const { onAdd, track, onRemove, isRemoval } = props;
    
    const addTrack = useCallback((e) => {
        onAdd(track);
    }, [onAdd, track]);

    const removeTrack = useCallback((e) => {
        onRemove(track);
    }, [onRemove, track]);

    const renderAction = useCallback((e) => {
        if (isRemoval) {
            return (
                <button onClick={removeTrack}>-</button>
            )
        } 
        return (
            <button onClick={addTrack}>+</button>
        )
    }, [isRemoval, addTrack, removeTrack]);

    return (
        <div className="Track">
            <div className="Info_Group">
                <h1>{props.track.name}</h1>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            <div className="Add_Remove">
                {renderAction()}
            </div>
            
        </div>
    )
}

export default Track;