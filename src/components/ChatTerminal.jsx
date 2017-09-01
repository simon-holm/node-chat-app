import React, {Component} from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import { randomPosition } from '../helpers/randomposition';

class ChatTerminal extends Component {
    state = {
        activeDrags: 0,
        deltaPosition: {
            x: 0,
            y: 0
        },
        controlledPosition: {
            x: -400,
            y: 200
        }
    };

    handleDrag(e, ui) {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        });
    }

    onStart = () => {
        this.setState({
            activeDrags: ++this.state.activeDrags
        });
    }

    onStop = () => {
        this.setState({
            activeDrags: --this.state.activeDrags
        });
    }

    render() {
        const dragHandlers = {
            onStart: this.onStart,
            onStop: this.onStop
        };
        const { chatName } = this.props;
        return (
            <Draggable handle="strong" {...dragHandlers} defaultPosition={{x: randomPosition(10, 800) , y: randomPosition(60, 300)}}>
                <div className="chat-terminal-component">
                    <strong>
                        <div className="terminal-top-bar">
                            <div className="controls-group">
                                <div className="left-group">
                                    <a className="delete"></a>
                                </div>
                                <div className="center-group">
                                    <span className="icon">
                                        <i className="fa fa-home"></i>
                                    </span>
                                    <p>{chatName}</p>
                                </div>
                                <div className="right-group">
                                    
                                </div>
                            </div>
                        </div>
                    </strong>
                    <div className="chat-screen">Chat content</div>
                </div>
            </Draggable>
        );
    }
}

ChatTerminal.propTypes = {
    chatName: PropTypes.string.isRequired,
  };

export default ChatTerminal;