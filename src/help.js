import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';

class Help extends React.Component {
    constructor(props) {
        super(props);

        this.handleHelp = this.handleHelp.bind(this);

        this.state = {
            needHelp:false,
        };
    }

    handleHelp() {
        let temp_help = this.state.needHelp;
        this.setState({
            needHelp: !temp_help,
        });
    }

    renderHelp() {
        const {needHelp} = this.state;
        let helpMenu = []
        if (needHelp) {
            helpMenu.push(
                <div class="border">
                    <span class="filled">
                        how to use the meme generator 3000
                    </span>
                    <span class="instructions">
                        <button onClick={this.handleHelp} class="noBorder">
                         <FontAwesomeIcon icon={faTimesCircle}/>
                        </button>
                        {<br/>} 
                            1. search for images {<br/>} 
                            2. double click to select an image {<br/>}
                            3. add text to your image {<br/>}
                            (Note: drag the bottom right corner of the text box to resize it!)
                    </span>
                </div>
            );
        } else {
            helpMenu.push(
                <span>
                    <button onClick={this.handleHelp} class="button">
                        how to use the meme generator 3000
                    </button>
                </span>
            );
        }
        return helpMenu;

    }

    render() {
        let helpMenu = this.renderHelp();
        return (
            <div>
                {helpMenu}
            </div>
        );
    }
}

export default Help;