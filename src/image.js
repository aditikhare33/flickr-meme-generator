import React from 'react';
import PropTypes from 'prop-types';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import {faSearch} from '@fortawesome/free-solid-svg-icons';

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curText: "",
            image: this.props.img,
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("inSubmit");
    }

    handleChange(e) {
        console.log("inChange"); 
        e.preventDefault();
        this.setState({
            curText: e.target.value,
        });
    }
    render() {
        const {curText} = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                        <input type="text" name="q" onChange={this.handleChange} value={curText}/>
                        <button onSubmit={this.handleSubmit}>
                            
                        </button>
                </form>
            </div>
        );
    }
}

Image.propTypes = {
    img: PropTypes.any.isRequired,
};

export default Image;