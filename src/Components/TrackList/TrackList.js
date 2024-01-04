import React from "react";

import './TrackList.css';

import Track from "../Track/Track";


const TrackList = (props) => {
    return (
        <div className="TrackList">
            {props.tracks?.filter((track) => track.preview).map((track) => {
                return (
                    <Track 
                        track={track}
                        key={track.id}
                        artistUri={track.artistUri}
                        uri={track.uri}
                        onAdd={props.onAdd}
                        isRemoval={props.isRemoval}
                        onRemove={props.onRemove}
                        volume={props.volume}
                    /> 
                )
            })}
        </div>
    )
}

export default TrackList;