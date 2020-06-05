import React from "react";

const Search = ({ value, onChange, onSearch }) => {
  return (
    <div className="search">
      <input value={value} onChange={onChange} />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default Search;
