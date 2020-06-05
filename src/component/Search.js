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
        const url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}/`;
        axios.get(url,{params: {key:API_KEY}})
                .then((response) => {
                const data = response.data;
                console.log(response.data);
                this.setState({
                    search: data, input: data.title,
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
        return (
            <center>
            <div>
                A world of gif'search
                <br/>
                <input type = "text" value={this.state.input} onChange={this.handleInput}/>
                {" "}
                <button onClick= {this.handlesearchchange}>search</button> 
                {
                    this.state.search.map((item,index) => (
                        <div key={index}>
                        <h3>here's your gif {item.title} {item.type} {item.url} </h3>
                        </div>
                        )                        
                    )
                }
            </div>
            </center>
        )
    }
}

export default Search;
