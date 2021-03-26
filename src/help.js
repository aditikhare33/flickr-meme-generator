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
                <div>
                    <button onClick={this.handleHelp} class="button">
                         <FontAwesomeIcon icon={faTimesCircle}/>
                    </button>
                    Generate MEMES by doing the following {<br/>} 
                    <ol>
                        <li> Searching for Images {<br/>} </li>
                        <li> Double Clicking to Select an Image {<br/>}</li>
                        <li> Typing in Text into the Text Box Provided{<br/>}</li>
                    </ol>
                </div>
            );
        } else {
            helpMenu.push(
                <button onClick={this.handleHelp} font-size="12" class="button">
                How to Use the Meme Generator 3000
                {/*<FontAwesomeIcon icon={//faQuestion} />*/}
                </button>
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