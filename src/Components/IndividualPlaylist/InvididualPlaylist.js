import React, { useCallback } from "react";
import "./IndividualPlaylist.css"
import ArrowRight from "./images/ArrowRight.png";

const IndividualPlaylist = (props) => {
    const { playlist, onSelect, number } = props;

    const selectPlaylist = useCallback((e) => {
        onSelect(number);
    }, [onSelect, number])

    return (
        <div className="Individual_Playlist">
            <div className="Album">
                <img className="Album_Image" src={props.playlist.image} alt="Album Cover" />
            </div>
            
            <div className="Info_Group">
                <h1>{playlist.name}</h1>
            </div>
            <input className="Add_Remove" type="image" src={ArrowRight} alt="select" onClick={selectPlaylist} />
        </div>
    )
};

export default IndividualPlaylist;
