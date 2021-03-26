import React from 'react';
import PropTypes from 'prop-types';
import Moveable from "react-moveable";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import {faSearch} from '@fortawesome/free-solid-svg-icons';

class Image extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            curText: "",
            image_url: this.props.img,
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        
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
                    <img src = {image_url} alt="selected_img"/>
                </div>

                <form id="text" class="button">
                 <input type="text" name="q" onChange={this.handleChange} value={curText}/>
                 <button onSubmit={this.handleSubmit} class="sideButton"> Submit </button>
                </form>

               <Moveable
                 target={document.getElementById("text")}
                 container={null}
                 origin={true}
               />
            
            </div>
        );
    }
}

Image.propTypes = {
    img: PropTypes.any.isRequired,
};

export default Image;