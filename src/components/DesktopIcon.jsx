import React, { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import { randomPosition } from '../helpers/randomposition';

class DesktopIcon extends Component {
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
        clicked: 0
    };

    handleDrag = (e, ui) => {
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

    onIconClick = () => {
        this.setState({ clicked: this.state.clicked += 1 })
        setTimeout(() => {
            this.setState({ clicked: 0 })
        }, 250);

        if (this.state.clicked >= 2) {
            this.props.callBack();
            this.setState({ clicked: 0 })
        }
    }

    render() {
        const dragHandlers = {
            onStart: this.onStart,
            onStop: this.onStop
        };
        return (
            <Draggable handle=".handle" {...dragHandlers} defaultPosition={this.props.position ? this.props.position : {x: randomPosition(10, 1500) , y: randomPosition(0, 10)}}> 
                <div className="desktop-icon-component">
                    <div className="handle" onClick={this.onIconClick}>
                        <img src={this.props.icon} />
                        <p>{this.props.title}</p>
                    </div>
                </div>
            </Draggable>
        );
    }
}


export default DesktopIcon;