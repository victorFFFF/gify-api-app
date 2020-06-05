import React, { Component } from "react";
import Search from "./Search";
import axios from "axios";
import './GifCard.css';

class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = { gifArray: [], searchInput: ""};
    this.intialState = {gifArray: []};
  }

  handleInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  componentDidMount(){
          const API_KEY = process.env.REACT_APP_GIF_KEY;
          const url = `http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`;
          axios
            .get(url)
            .then((response) => {
              const data = response.data;
              const gifInfo = data
              let temp;

              for(let i = 0; i < gifInfo.data.length; i++)
              { 
                temp = [gifInfo.data[i].images.downsized_large.url];
                this.setState({
                  gifArray: [...this.state.gifArray, temp], searchInput: this.state.searchInput}) 
              }
            })
            .catch((err) => {
              console.log(err);
              alert(err);
              this.setState({ gifArray: [] });
            });
  };

  randomize = () =>{
          this.setState(this.intialState);
          const searchInput = this.state.searchInput;
          const API_KEY = process.env.REACT_APP_GIF_KEY;
          const url = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
          axios
            .get(url)
            .then((response) => {
              const data = response.data;
              const gifInfo = data
              let temp;
              console.log("213")
              console.log(gifInfo.data.url)
          
                temp = [gifInfo.data.images.downsized_large.url];
                this.setState({
                  gifArray: [...this.state.gifArray, temp], searchInput: this.state.searchInput}) 

            })
            .catch((err) => {
              console.log(err);
              alert(err);
              this.setState({ gifArray: [] });
            });
  }

  handleSearch = () => {
        this.setState(this.intialState);
        const searchInput = this.state.searchInput;
        const API_KEY = process.env.REACT_APP_GIF_KEY;
        const url = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${API_KEY}`;
        axios
          .get(url)
          .then((response) => {
            const data = response.data;
            const gifInfo = data

            let temp;
            for(let i = 0; i < gifInfo.data.length; i++)
            { 
              temp = [gifInfo.data[i].images.downsized_large.url];
              this.setState({
                gifArray: [...this.state.gifArray, temp], searchInput: this.state.searchInput}) 
            }
          })
          .catch((err) => {
            console.log(err);
            alert(err);
            this.setState({ gifArray: [] });
          });
  };

  render() {
            let display;
            let displayTrend 

            if(this.state.searchInput === "")
            displayTrend= (<h3>Currently Trending</h3>)
            else{
              displayTrend =""
            }
              display = (
                <div  style={{border: '2px solid black' }}> 
                <ul  >
                    {this.state.gifArray.map((info) => (
                    <img src ={info} className = "photo"></img>
                  ))}
              </ul>
              </div>
              );
            return (
              <div >
                    <h1>Gif Finder</h1>
                    <Search
                    value={this.state.searchInput}
                    onChange={this.handleInput}
                    onSearch={this.handleSearch}
                    onRandom={this.randomize}/>
                    {displayTrend}
                    <br></br>
                    {display}
              </div>
            );
  }
}

export default GifCard;
