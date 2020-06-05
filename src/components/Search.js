import React from "react";

const Search = ({ value, onChange, onSearch, onRandom }) => {
  return (
    <div className="search">
      <input value={value} onChange={onChange} />
      <button onClick={onSearch}>Search</button>
      <br></br>
      <br></br>
      <button onClick={onRandom}>Random</button>
    </div>
  );
};

export default Search;
