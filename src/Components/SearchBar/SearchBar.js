import React, { useCallback, useState } from "react";
import "./SearchBar.css";
import "../QOLcode/input.css"

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { onSearch, onPlaylist, playlistId, newPlaylist } = props;

    const playlistIdReset = useCallback((e) => {
        newPlaylist();
    }, [newPlaylist])

    const handleInput = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        onSearch(searchTerm);
    }, [onSearch, searchTerm]);

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
    };

    const handlePlaylists = useCallback(() => {
        onPlaylist();
    }, [onPlaylist]);

    const handleButton = useCallback(() => {
        if (playlistId !== '') {
            return (
                <button className="button-group" onClick={playlistIdReset}>New Playlist</button>
            )
        }
        return (
            <button className="button-group" onClick={handlePlaylists}>Edit Playlists</button>
        )
    }, [playlistId, handlePlaylists, playlistIdReset])

    return (
        <div className="SearchBar">
            <div className="Card Overview Search">
                <h1>Search For a Song!</h1>
                <input
                onChange={handleInput}
                placeholder="What are you looking for?"
                onKeyDown={handleKeyDown}
                className="input__field"
                />
                <button className="button-group" onClick={handleSearch}>Search</button>
                {handleButton()}
            </div>
            
        </div>
    )
}

export default SearchBar;