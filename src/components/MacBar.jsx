import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Icons imported for webpack
import Trash from '../assets/icons/trash.png';

class MacBar extends Component {
    render() {
        return (
            <div className="mac-bar-component">
                <div className="bar-flex-group">
                    <div className="left-group">
                        {this.props.icons.map(icon => {
                            return (
                                <span key={icon.name}>
                                    <img src={icon.icon} onClick={icon.callBack}/>
                                </span>
                            )
                        })}
                    </div>
                    <div className="right-group">
                        <span>
                            <img src={Trash} />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

MacBar.PropTypes = {
 icons: PropTypes.array.isRequired
}

export default MacBar;