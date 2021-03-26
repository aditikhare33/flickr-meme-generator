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
                    HOW TO USE THE MEME GENERATOR 3000
                    <span class="instructions">
                        <button onClick={this.handleHelp} class="noBorder">
                         <FontAwesomeIcon icon={faTimesCircle}/>
                        </button>
                        {<br/>} 
                            1. SEARCH FOR IMAGES {<br/>} 
                            2. DOUBLE CLICK TO SELECT AN IMAGE {<br/>}
                            3. ADD TEXT TO THE TEXT BOX {<br/>}
                    </span>
                </div>
            );
        } else {
            helpMenu.push(
                <span class="center">
                    <button onClick={this.handleHelp} class="button">
                         HOW TO USE THE MEME GENERATOR 3000
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