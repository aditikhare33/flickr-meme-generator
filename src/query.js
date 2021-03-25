import React from 'react';

class Query extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            search: "",
            curQuery: "",
            pictures: [],
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        let {curQuery, search} = this.state;
        this.setState({
            search: curQuery,
        })
        console.log("inSubmit");
        if (search !== "") {
            let FLICKR_API_KEY = "127eb5c6066070b6ef6203c9d9a89dd8";
            fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+ FLICKR_API_KEY +  "&tags=" + search + "&per_page=10&page=1&format=json&nojsoncallback=1")
                .then((response) => {
                    if (!response.ok) throw Error(response.statusText);
                    return response.json();
                })
                .then((j) =>{
                    console.log("IN DATA");
                    alert(JSON.stringify(j));
                    //loop through all pictures from search
                    let picArray = j.photos.photo.map((pic) => {
                        //copied from flickr's documentation, get location of pictures
                        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
                        return(
                            <img alt={search} src={srcPath}></img>
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
        if (e.target.value !== "") {
            this.setState({
                curQuery: e.target.value,
            });
        }
    }

    render() {
        const {curQuery, pictures, search} = this.state;
        console.log(this.state);
        return (
            <div>
                <div>
                    <form>
                        <input type="text" onChange={this.handleChange} value={curQuery}/>
                        <button onClick={this.handleSubmit} type="submit"> Search! </button>
                    </form>
                </div>
                <div>
                    Pictures of {curQuery}: {pictures}
                </div>
            </div>
        );
    }
}

export default Query;