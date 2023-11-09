import "./UserPlaylists.css";
import IndividualPlaylist from "../IndividualPlaylist/InvididualPlaylist";
import SpotifyIcon from '../SpotifyIcon.png';

const UserPlaylists = (props) => {
        
    return (
        <div className="SearchedPlaylists">
            <div className="Card Overview">
                <div className="Playlist_Heading">
                    <img className="Spotify_Icon Spacer" src={SpotifyIcon} alt="Spotify Icon"/>
                    <h2 className="Spacer">Your Playlists</h2>
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