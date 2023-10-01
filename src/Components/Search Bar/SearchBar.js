import React, { useCallback, useState } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
    const [search, setSearch] = useState('');

    const handleInput = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        props.onSearch(search);
    }, [props.onSearch, search]);

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