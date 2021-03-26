import React from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

class Query extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            curQuery: "",
            pictures: [],
            selected: <div></div>,
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("inSubmit");
        if (this.state.curQuery !== "") {
            console.log("FETCHING");
            let {curQuery} = this.state;
            let FLICKR_API_KEY = "127eb5c6066070b6ef6203c9d9a89dd8";
            const urlRoot = "https://api.flickr.com/services/rest/";
            const method = "?method=flickr.photos.search";
            const apikey = "&api_key="+ FLICKR_API_KEY;
            const text = "&text=" + curQuery;
            const tags =  "&tags=" + curQuery;
            const sort = "&sort=relevance";
            const safe = "&safe_search=1"; //safe search is on
            const format = "&per_page=12&page=1&format=json&nojsoncallback=1";
            const url = urlRoot + method + apikey + sort + safe + text + format;
            console.log("querying this url:", url);
            fetch(url)
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return response.json();
                })
                .then((j) =>{
                    console.log("IN DATA");
                    //loop through all pictures from search
                    let picArray = j.photos.photo.map((pic) => {
                        //copied from flickr's documentation, get location of pictures
                        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                        return(
                            <span class="picture">
                                <img 
                                    class="searchImg"
                                    alt={curQuery} 
                                    src={srcPath} 
                                    onDoubleClick={this.handleSelect}
                                />
                            </span>
                        )
                    })
                    this.setState({ 
                        pictures: picArray,
                    });
                })
                .then((error) => {
                    console.log("ERROR:", error);
                })
        }   
    }

    handleChange(e) {
        console.log("inChange"); 
        e.preventDefault();
        this.setState({
            curQuery: e.target.value,
        });
    }

    handleSelect(e) {
        e.preventDefault();
        this.setState({
            selected: e.target,
        });
    }

    render() {
        const {curQuery, pictures, search} = this.state;
        console.log(this.state);
        return (
            <div>
                <div class="button">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            name="q" 
                            onChange={this.handleChange} 
                            value={curQuery}
                            placeholder="Search..."
                        />
                        <button class="searchButton" onSubmit={this.handleSubmit}>
                            <FontAwesomeIcon icon={faSearch}/> 
                        </button>
                    </form>
                </div>
                Here are some pictures of {curQuery}: {<br/>}
                <div class="board">
                     {pictures}
                </div>
            </div>
        );
    }
}

export default Query;