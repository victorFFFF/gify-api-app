import React, { Component } from "react";
import Search from "./Search";
import axios from "axios";

class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = { gifArray: "", searchInput: "" };
  }

  handleInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleSearch = () => {
    const searchInput = this.state.searchInput;
    const API_KEY = process.env.REACT_APP_GIF_KEY;
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        const gifInfo = data
        console.log("GifINFO" + gifInfo)
        // console.log("HERE" + gifInfo.data[0].images.downsized_large.url);
        this.setState({ gifArray: gifInfo.data[0].images.downsized_large.url, searchInput: "" });
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        this.setState({ gifArray: [] });
      });
  };

  render() {

    let display = (
      <img
      src={this.state.gifArray}
    />
    );

    return (
      <div >
            <h4>Gif Finder</h4>
            
            <Search
            value={this.state.searchInput}
            onChange={this.handleInput}
            onSearch={this.handleSearch}/>
            {display}
            
      </div>
    );
  }
}

export default GifCard;
