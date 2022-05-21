import React from "react";
import "./search.css";

const Search = ({ searchQuery, handleChange }) => {
  return (
    <div>
      <input
        className="searchInput"
        type="text"
        placeholder="Search..."
        name="search"
        //value={searchQuery}
        onChange={handleChange}
      ></input>
    </div>
  );
};

export default Search;
