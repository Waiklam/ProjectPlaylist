import React, { useCallback, useEffect, useState } from "react";
import "./Track.css"
import playButton from "./TrackImages/PlayButton.png";
import pauseButton from "./TrackImages/PauseButton.png";


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

    
    const [audio] = useState(new Audio(track.preview));
    const [playing, setPlaying] = useState(false);
    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing, audio])

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);
    
    return (
        <div className="Track">
            <div className="Album">
                <img className="Preview" onClick={toggle} src={!playing ? playButton : pauseButton} alt="Play Button" />
                <img className="Album_Image" src={props.track.image} alt="Album Cover" />
            </div>
            
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