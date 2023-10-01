import React, { useCallback } from "react";

const Track = (props) => {
    const addTrack = useCallback((e) => {
        props.onAdd(props.track);
    }, [props.onAdd, props.track]);

    const removeTrack = useCallback((e) => {
        props.onRemove(props.track);
    }, [props.onRemove, props.track]);

    const renderAction = useCallback((e) => {
        if (props.isRemoval) {
            return (
                <button onClick={removeTrack}>-</button>
            )
        } 
        return (
            <button onClick={addTrack}>+</button>
        )
    });

    return (
        <div>
            <div>
                <h1>{props.track.name}</h1>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {renderAction()}
        </div>
    )
}

export default Track;