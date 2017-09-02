import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Icons imported for webpack
import Spotify from '../assets/icons/spotify.png';
import Finder from '../assets/icons/finder.png';
import Chrome from '../assets/icons/chrome.ico';
import Trash from '../assets/icons/trash.png';

class MacBar extends Component {
    render() {
        return (
            <div className="mac-bar-component">
                <div className="bar-flex-group">
                    <div className="left-group">
                        <span>
                            <img src={Finder} />
                        </span>
                        <span>
                            <img src={Chrome} />
                        </span>
                        <span>
                            <img src={Spotify} />
                        </span>
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

}

export default MacBar;