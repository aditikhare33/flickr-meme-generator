import React from 'react';
import './index.css';
import Image from './image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

class Query extends React.Component {
    // bind member functions and set initial empty states
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.fetchPics = this.fetchPics.bind(this);
        this.handleDeselect = this.handleDeselect.bind(this);
        this.handlePaginationPlus = this.handlePaginationPlus.bind(this);
        this.handlePaginationMinus = this.handlePaginationMinus.bind(this);
        this.renderHelper = this.renderHelper.bind(this);
        this.createUrl = this.createUrl.bind(this);

        this.state = {
            curQuery: "",
            search:"",
            pictures: [],
            selected: NaN,
            selectionHappened: false,
            curPage: 1,
        };
    }

    createUrl(page_num) {
        let {curQuery} = this.state;

        let FLICKR_API_KEY = "127eb5c6066070b6ef6203c9d9a89dd8"; // got from flickr api account webpage

        const urlRoot = "https://api.flickr.com/services/rest/";
        const method = "?method=flickr.photos.search";
        const apikey = "&api_key="+ FLICKR_API_KEY;
        const text = "&text=" + curQuery;
        const sort = "&sort=relevance"; 
        const safe = "&safe_search=1"; // safe search is on
        const format = "&per_page=12&format=json&nojsoncallback=1";
        const page = "&page=" + page_num;
        const url = urlRoot + method + apikey + sort + safe + page + text+ format;

        return url;
    }

    // queries flickr api according to page number and current query
    //page_num is a parameter here even tho its part of the state bc of the use of setTimeout
    fetchPics(page_num) {
        if (this.state.curQuery !== undefined && this.state.curQuery !== "") {
            this.setState({ search: this.state.curQuery,});
            let {curQuery} = this.state;
            let url = this.createUrl(page_num);
            fetch(url)
            .then((response) => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            }).then((j) => {
                //loop through all pictures from search
                let picArray = j.photos.photo.map((pic) => {
                    //copied from flickr's documentation, get location of pictures
                    var srcPath = 'https://farm'+pic.farm+ '.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                    return(
                        <span class="picture">
                            <img class="searchImg" alt={curQuery} src={srcPath} onDoubleClick={this.handleSelect}/>
                        </span>
                    )
                })
                this.setState({ pictures: picArray,});
            }).then((error) => { console.log("ERROR:", error); })
        } else {
            this.setState({ pictures: [], });
        }
    }

    // handles changes to the search bar's text input
    handleChange(e) { 
        e.preventDefault();
        this.setState({
            curQuery: e.target.value,
            search: "",
        });
    }

    // handles submit of query (updates pictures array that is diplayed)
    handleSubmit(e) {
        e.preventDefault();
        const {curQuery} = this.state.curQuery;
        if (curQuery !== "") {
            this.fetchPics(1);
            let temp_query = curQuery;
            this.setState({
                search: temp_query,
            });
        }   
    }

    // handles selection of image to make meme of upon double click
    handleSelect(e) {
        e.preventDefault();
        let src_path = e.target.getAttribute("src");
        this.setState({
            selected: src_path,
            selectionHappened: true,
        });
    }

    // handle option go back to search page
    handleDeselect(e) {
        e.preventDefault();
        this.setState({
            selected: "",
            selectionHappened: false,
        });
    }

    handlePaginationPlus() {
        let tempCurPage = this.state.curPage;

        // so don't have to rely on setState updating quick enough and so don't have to return a explicit promist
        setTimeout(this.fetchPics, 0, this.state.curPage + 1); 
        tempCurPage++;
        this.setState({
            curPage: tempCurPage,
        });
    }

    handlePaginationMinus() {
        let tempCurPage = this.state.curPage;

        // so don't have to rely on setState updating quick enough and so don't have to return a explicit promist
        setTimeout(this.fetchPics, 0, this.state.curPage - 1);
        if (tempCurPage > 1) {
            tempCurPage--;
        }
        this.setState({
            curPage: tempCurPage,
        });
    }

    renderPrevButton() {
        const {curPage} = this.state;
        let prevButton = [];
        if (curPage > 1) {
            prevButton.push(
                <span>
                    <button onClick={this.handlePaginationMinus} class="button bottom">
                        go to previous page
                    </button>
                </span>
            );
        }
        return prevButton;

    }

    renderEmpty() {
        const {curQuery, search} = this.state;
        let emptyScreen = [];
        let str =  "nothing to see here... yet";
        let prevButton = this.renderPrevButton();
        if (search === "" || curQuery === "") {
            str = "your searches will appear here";
        } 
        emptyScreen.push(
            <div>
                <div class = "centerVertical">
                    {str}{<br/>} 
                    <img src="http://i.stack.imgur.com/SBv4T.gif" alt="waiting......." />
                </div>
                {<br/>} {prevButton}
            </div>
        );
        return emptyScreen;

    }

    renderPics(){
        const {pictures} = this.state;
        let picScreen = [];
        let prevButton = this.renderPrevButton();
        picScreen.push(
            <div>
                <div class="filled">
                {<br/>}
                    here are some pictures of your search: {<br/>}
                </div>
                <div class="board">
                    {pictures}
                </div>
                {<br/>} {prevButton}
                <button onClick={this.handlePaginationPlus} class="button bottom"> 
                    go to next page
                </button>
            </div>
        );
        return picScreen;
    }

    renderSearch() {
        const {curQuery, pictures} = this.state;
        let searchScreen = [];
        searchScreen.push(
            <div>
                {<br/>} 
                    <div class="button">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            class="search" type="text" 
                            name="q"  onChange={this.handleChange} 
                            value={curQuery} placeholder="type your search here"
                        />
                        <button class="sideButton" onSubmit={this.handleSubmit}>
                            <FontAwesomeIcon icon={faSearch}/> 
                        </button>
                    </form>
                </div>
            </div>
        );
        if (pictures.length === 0) {
            searchScreen.push(this.renderEmpty());
        } else {
            searchScreen.push(this.renderPics());
        }
        return searchScreen;
    }

    renderSelection() {
        const {selected} = this.state;
        let selectionScreen = [];
        selectionScreen.push(
            <div>
                {<br/>}
                <button onClick={this.handleDeselect} class="button">
                    Go back to Search Page?
                </button>
                <Image img={selected} />
            </div>
        );
        return selectionScreen;
    }
    // separate function to handle logic of what to render when, to reduce clutter in actual render function
    // essentially: if no image selected, show search page, otherwise show selected image and text box
    renderHelper() {
        const {selectionHappened} = this.state;
        let output = [];
        if (selectionHappened) {
            output.push(this.renderSelection());
        } else {
            output.push(this.renderSearch());
        }
        return output;
    }

    // render 
    render() {
        let output = this.renderHelper();
        return (
            <div>  {output}  </div>
        );
    }
}

export default Query;