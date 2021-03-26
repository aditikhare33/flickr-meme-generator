import React from 'react';
import PropTypes from 'prop-types';
//import Moveable from "react-moveable";
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
                    <img src = {image_url} alt="selected_img" class="memePic"/>
                </div>

                <div >
                 <input 
                    class="memeTextCaption"
                    type="text" 
                    onChange={this.handleChange} 
                    value={curText}
                    placeholder="type your text here"/>
                </div>

            
            </div>
        );
    }
}

Image.propTypes = {
    img: PropTypes.any.isRequired,
};

export default Image;