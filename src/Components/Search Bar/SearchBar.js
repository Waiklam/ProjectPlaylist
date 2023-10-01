import React, { useCallback, useState } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { onSearch } = props;

    const handleInput = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        onSearch(searchTerm);
    }, [onSearch, searchTerm]);

    return (
        <div>
            <input
                onChange={handleInput}
                placeholder="What are you looking for?"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchBar;