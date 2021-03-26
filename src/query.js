import React from 'react';
import './index.css';
import Image from './image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

class Query extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.fetchPics = this.fetchPics.bind(this);

        this.state = {
            curQuery: "",
            search:"",
            pictures: [],
            selected: NaN,
            selectionHappened: false,
        };
    }

    fetchPics(page_num) {
        console.log("FETCHING");
        let {curQuery} = this.state;
        let FLICKR_API_KEY = "127eb5c6066070b6ef6203c9d9a89dd8"; // got from flickr api account webpage
        const urlRoot = "https://api.flickr.com/services/rest/";
        const method = "?method=flickr.photos.search";
        const apikey = "&api_key="+ FLICKR_API_KEY;
        const text = "&text=" + curQuery;
        /*const tags =  "&tags=" + "meme"; */
        const sort = "&sort=relevance"; 
        const safe = "&safe_search=1"; // safe search is on
        const format = "&per_page=12&format=json&nojsoncallback=1";
        const page = "&page=" + page_num;
        const url = urlRoot + method + apikey + sort + safe + page + text+ format;
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

    handleSubmit(e) {
        e.preventDefault();
        console.log("inSubmit");
        const {curQuery} = this.state.curQuery;
        if (curQuery !== "") {
            this.fetchPics(1);
            let temp_query = curQuery;
            this.setState({
                search: temp_query,
            });
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
        let src_path = e.target.getAttribute("src");
        console.log("src_path", src_path);
        this.setState({
            selected: src_path,
            selectionHappened: true,
        });
    }

    renderHelper() {
        const {curQuery, pictures, selected, selectionHappened, search} = this.state;
        let output = [];

        if (selectionHappened) {
            output.push(
                <div>
                    <Image img={selected} />
                </div>
            );
        } else {
            output.push(
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
                            <button class="sideButton" onSubmit={this.handleSubmit}>
                                <FontAwesomeIcon icon={faSearch}/> 
                            </button>
                        </form>
                    </div>
                </div>
            );
            if (pictures.length === 0) {
                output.push(
                    <div>
                        Nothing To See Here, Yet 
                    </div>
                )
            } else {
                output.push(
                    <div>
                        Here are some pictures of {search}: {<br/>}
                        <div class="board">
                            {pictures}
                        </div>
                    </div>
                );
            }
        }
        
        return output;
    }

    render() {
        console.log(this.state);
        let output = this.renderHelper();
        return (
            <div>
                {output}
            </div>
        );
    }
}

export default Query;