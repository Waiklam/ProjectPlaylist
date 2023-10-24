import "./UserPlaylists.css";
import IndividualPlaylist from "../IndividualPlaylist/InvididualPlaylist";

const UserPlaylists = (props) => {
        
    return (
        <div className="SearchedPlaylists">
            <div className="Card Overview">
                <div className="Playlist_Heading">
                    <h2>Your Playlists</h2>
                </div>
                <div className="UserPlaylist">
                    {props.userPlaylists?.map((playlist, index) => {
                        return (
                            <IndividualPlaylist 
                                playlist={playlist}
                                key={playlist.id}
                                onSelect={props.onSelect}
                                number={index}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserPlaylists;