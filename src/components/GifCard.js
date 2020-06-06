import React, { Component } from "react";
import Search from "./Search";
import axios from "axios";
import './GifCard.css';

class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = { gifArray: [], searchInput: "", hide: false};
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
          const API_KEY = process.env.REACT_APP_GIF_KEY;
          const url = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
          axios
            .get(url)
            .then((response) => {
              const data = response.data;
              const gifInfo = data
              let temp;          
                temp = [gifInfo.data.images.downsized_large.url];
                this.setState({
                  gifArray: [...this.state.gifArray, temp], searchInput: this.state.searchInput, hide: true}) 

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
                gifArray: [...this.state.gifArray, temp], searchInput: this.state.searchInput, hide: false}) 
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

            if(this.state.searchInput === "" && !this.state.hide)
            displayTrend= (<p>Currently Trending</p>)
            else if(this.state.hide)
            {
              displayTrend = ("random");
            }
            else{
              displayTrend =this.state.searchInput;
            }
              display = (
                <div  style={{border: '2px solid black' }}> 
                <ul  >
                    <div><h3>{displayTrend}</h3></div>
                    {this.state.gifArray.map((info, index) => (
                    <img src ={info} alt="Not loaded" key ={index} className = "photo"></img>
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
                    <p>Please allow the gif to load.</p>
                    {display}
              </div>
            );
  }
}

export default GifCard;
