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
            <img className="Playlist_Image" src={props.playlist.image} alt="Album Cover" />
            <div className="Info_Group">
                <h1 title={playlist.name}><a href={playlist.uri}>{playlist.name}</a></h1>
            </div>
            <input className="Add_Remove" type="image" src={ArrowRight} alt="select" onClick={selectPlaylist} />
        </div>
    )
};

export default IndividualPlaylist;
