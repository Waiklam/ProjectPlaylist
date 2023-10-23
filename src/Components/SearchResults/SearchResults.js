import React from "react";

import "./SearchResults.css";

import TrackList from "../TrackList/TrackList";

const SearchResults = (props) => {
    return (
        <div className="SearchResults">
            <div className="Card Overview">
                <div>
                    <h2>Results</h2>
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