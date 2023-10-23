import React from "react";
import "./IndividualPlaylist.css"

const IndividualPlaylist = (props) => {
    return (
        <div className="Individual_Playlist">
            <div className="Album">
                <img className="Album_Image" src={props.playlist.image} alt="Album Cover" />
            </div>
            
            <div className="Info_Group">
                <h1>{props.playlist.name}</h1>
            </div>
        </div>
    )
};

export default IndividualPlaylist;
