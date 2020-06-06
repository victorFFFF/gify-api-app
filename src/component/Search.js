import React, {Component} from "react";
import axios from "axios";


class Search extends Component {
    constructor (props){
        super(props);
        this.state ={
            search:[],
            input: " ",
        };
    }
    handlesearchchange = () => {
        const search = this.state.input;
        const API_KEY = process.env.REACT_APP_SEARCH_API_KEY;
        const url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}`;
        axios.get(url,{params: {key:API_KEY}})
                .then((response) => {
                const data = response.data;
                console.log(response.data);
                this.setState({
                    search: [[data.data[0].images.downsized_large.url ]],input : this.state.input
                });
                
            })
            .catch((err) => {console.log(err)
            this.setState({search: [ ]})
            });
    }

    handleInput= (event)=> {
        this.setState({input: event.target.value})
    }

    render(){
        let  display = (
            <ul >
                {this.state.search.map((x,y) => (
                <img key={y} src ={x} alt = "GIF"></img>
              ))}
          </ul>
          );
    
        return (
            <center>
            <div>
            <h3>A world of Gif</h3>
             <input type = "text" value={this.state.input} onChange={this.handleInput}/>
             <button onClick= {this.handlesearchchange}>search</button> 
            {display}
​
            </div> 
            </center>
        );
    }
}

export default Search;
