import React from 'react';

class Query extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            search: "",
            curQuery: "",
            pictures: [],
        };
    }
    handleSubmit(e) {
        e.persist();

        console.log("inSubmit");
        const {curQuery} = this.state;

        let FLICKR_API_KEY = "127eb5c6066070b6ef6203c9d9a89dd8";
        fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+FLICKR_API_KEY+'&tags=" + curQuery + "&per_page=10&page=1&format=json&nojsoncallback=1")
            .then(function(response){
                return response.json();
            })
            .then(function(j){
                alert(JSON.stringify(j));
                
        //loop through all pictures from search
        let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="dogs" src={srcPath}></img>
        )
        })

        this.setState(
            {pictures: picArray
        });
        /*
        let FLICKR_API_KEY = "127eb5c6066070b6ef6203c9d9a89dd8";
        var Flickr = require('flickr-sdk');
        var flickr = new Flickr(process.env.FLICKR_API_KEY);
        
        flickr.photos.search({
            text: 'doggo'
        }).then(function (res) {
            console.log('yay!', res.body);
        }).catch(function (err) {
            console.error('bonk', err);
        }); */
        /*
        let apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=" + apikey + "&per_page=10&format=json&nojsoncallback=1";
        console.log("apiurl", apiurl);
        */
    }

    handleChange(e) {
        console.log("inChange"); 
        e.persist();
        this.setState({
            curQuery: e.target.value,
          });
    }
    render() {
        const {curQuery, pictures} = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="q" onChange={this.handleChange} value={curQuery}/>
                    <input type="submit" value="Search Images" />
                </form>
            </div>
            <div>
                {pictures}
            </div>
        
        );
    }
}

export default Query;