import React from "react";

import "./UserPlaylists.css";
import IndividualPlaylist from "../IndividualPlaylist/InvididualPlaylist";

const UserPlaylists = (props) => {
    return (
        <div className="SearchedPlaylists">
            <div className="Card Overview">
                <div>
                    <h2>Your Playlists</h2>
                </div>
                <div className="UserPlaylist">
                    {props.userPlaylists?.map((playlist) => {
                        return (
                            <IndividualPlaylist 
                                playlist={playlist}
                                key={playlist.id}
                                onAdd={props.onAdd}
                            /> 
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserPlaylists;