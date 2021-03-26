import React from 'react';
import PropTypes from 'prop-types';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import {faSearch} from '@fortawesome/free-solid-svg-icons';

class Image extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            curText: "",
            image_url: this.props.img,
        };

    }

    handleChange(e) {
        console.log("inChange"); 
        e.preventDefault();
        this.setState({
            curText: e.target.value,
        });
    }

    render() {
        const {curText,image_url} = this.state;
        return (
            <div>
                <div>
                    {<br/>}
                    <img src = {image_url} alt="selected_img"/>
                </div>

                <form id="target"class="memeText">
                 <input 
                    type="text" 
                    name="q" 
                    onChange={this.handleChange} 
                    value={curText}
                    placeholder="type your text here"/>
                </form>

               
            
            </div>
        );
    }
}

Image.propTypes = {
    img: PropTypes.any.isRequired,
};

export default Image;