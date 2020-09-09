import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../css/searchBar.css';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  function handleSearchInput(event) {
    const { target: { value } } = event;
    setSearchInput(value);
  }

  return (
    <div className="searchbar">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        value={searchInput}
        onChange={(event) => handleSearchInput(event)}
      />
      <div className="search-btn">
        <Link
          className="material-icons search-icon"
          to={`/results/${searchInput}`}
        >
          search
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
