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
                <div class="center">
                    <span class="instructions">
                    HOW TO USE THE MEME GENERATOR 3000
                    <button onClick={this.handleHelp} class="noBorder">
                         <FontAwesomeIcon icon={faTimesCircle}/>
                    </button>
                    {<br/>} 
                        <ol>
                            <li> SEARCH FOR IMAGES {<br/>} </li>
                            <li> DOUBLE CLICK TO SELECT AN IMAGE {<br/>}</li>
                            <li> ADD TEXT TO THE TEXT BOX {<br/>}</li>
                        </ol>
                    </span>
                </div>
            );
        } else {
            helpMenu.push(
                <span class="center">
                    <button onClick={this.handleHelp} class="button">
                        How to Use the Meme Generator 3000
                        {/*<FontAwesomeIcon icon={//faQuestion} />*/}
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