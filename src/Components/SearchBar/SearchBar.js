import React, { useCallback, useState } from "react";
import "./SearchBar.css";
import "../QOLcode/input.css"

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { onSearch, onPlaylist } = props;

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

    return (
        <div className="SearchBar">
            <div className="Card Overview Search">
                <input
                onChange={handleInput}
                placeholder="What are you looking for?"
                onKeyDown={handleKeyDown}
                className="input__field"
                />
                <button className="button-group" onClick={handleSearch}>Search</button>
                <button className="button-group" onClick={handlePlaylists}>Edit Playlists</button>
            </div>
            
        </div>
    )
}

export default SearchBar;