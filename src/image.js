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

    //handle Change to text box
    handleChange(e) {
        console.log("inChange"); 
        e.preventDefault();
        this.setState({
            curText: e.target.value,
        });
    }


    //render image and text box
    render() {
        const {curText,image_url} = this.state;

        
        return (
            <div>
                <div>
                    {<br/>}
                    <img src = {image_url} alt="selected_img" class="memePic"/>
                </div>

                <textarea
                     name="Text1" 
                     cols="40"
                     rows="3"
                     class="memeTextCaption"
                     onChange={this.handleChange} 
                     value={curText}
                     placeholder="type your text here"
                     >
                </textarea>
            </div>
        );
    }
}

Image.propTypes = {
    img: PropTypes.any.isRequired,
};

export default Image;