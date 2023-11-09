import React from "react";
import SpotifyIcon from '../SpotifyIcon.png';
import "./SearchResults.css";

import TrackList from "../TrackList/TrackList";

const SearchResults = (props) => {
    return (
        <div className="SearchResults">
            <div className="Card Overview">
                <div className="Playlist_Heading">
                    <img className="Spotify_Icon Spacer" src={SpotifyIcon} alt="Spotify Icon"/>
                    <h2 className="Spacer">Results</h2>
                </div>
                <TrackList 
                    tracks={props.searchResults}
                    onAdd={props.onAdd} 
                />
            </div>
        </div>
    );
};

export default SearchResults;