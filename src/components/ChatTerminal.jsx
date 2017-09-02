import React, {Component} from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import { randomPosition } from '../helpers/randomposition';
import { dateParser } from '../helpers/dateParse';
import { sendMessage } from '../api/api';

let refresher;

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
        },
        value: "",
        messages: [],
        topSpace: 320
    };

    componentWillReceiveProps(nextProps) {
        this.setState({ messages: nextProps.messages })
        let nrOfMessages = this.state.messages.length;
        if (this.state.topSpace >= 1 && nrOfMessages >= 1) {
            this.setState({ topSpace: 320 - (19 * (nrOfMessages - 1))})
        }
        this.scrollToBottom();
    }

    componentDidMount() {
        refresher = setInterval(() => {
            this.forceUpdate()
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(refresher)
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

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

    onSubmitInput = (event) => {
        event.preventDefault();
        if (this.state.value != "") {
            sendMessage({ chatName: this.props.chatName, from: 'Test', text: this.state.value }, () => console.log('sent'))
            this.setState({ value: "" })
        }
        
    }
    
    onChangeInput = (event) => {
        this.setState({ value: event.target.value })
    }

    renderMessages = () => {
        return this.state.messages.map((message, index) => {
            const { from, text, createdAt } = message;
            return (
                <div key={index}>
                    {`${from}: ${text} (${dateParser.timeSince(createdAt)})`}
                </div>
            )
        })
    }

    scrollToBottom = () => {
        this.bottomChat.scrollTop = this.bottomChat.scrollHeight;
    }

    focusInput = () => {
        this.chatInput.focus();
    }

    render() {
        const dragHandlers = {
            onStart: this.onStart,
            onStop: this.onStop
        };
        const { chatName } = this.props;
        return (
            <Draggable handle="strong" {...dragHandlers} defaultPosition={{x: randomPosition(10, 800) , y: randomPosition(20, 200)}}>
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
                    <div className="chat-screen" onClick={this.focusInput}>
                        <div className="chat-content" ref={(el) => { this.bottomChat = el; }}>
                            <div style={{ marginTop: this.state.topSpace }}></div>
                            {this.renderMessages()}
                        </div>
                        <form onSubmit={this.onSubmitInput}>
                            <label htmlFor="message">
                                <span className="icon">
                                    <i className="fa fa-chevron-right"></i>
                                </span>
                            </label>
                            <input ref={input => { this.chatInput = input }} id="message" name="message" type="text" value={this.state.value} autoComplete="off" onChange={this.onChangeInput}/>
                        </form>
                    </div>
                </div>
            </Draggable>
        );
    }
}

ChatTerminal.propTypes = {
    chatName: PropTypes.string.isRequired,
  };

export default ChatTerminal;