import React, { useCallback, useEffect, useState } from "react";
import "./Track.css"
import playButton from "./TrackImages/PlayButton.png";
import pauseButton from "./TrackImages/PauseButton.png";


const Track = (props) => {
    const { onAdd, track, onRemove, isRemoval, artistUri, uri } = props;
    
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
            <img className="Preview" onClick={toggle} src={!playing ? playButton : pauseButton} alt="Play Button" />
            <img className="Album_Image" src={props.track.image} alt="Album Cover" />
            <div className="Info_Group">
                <h1 title={props.track.name}><a href={uri}>{props.track.name}</a></h1>
                <p title={props.track.artist}><a href={artistUri}>{props.track.artist}</a></p>
            </div>
            <div className="Add_Remove">
                {renderAction()}
            </div>
        </div>
    )
}

export default Track;