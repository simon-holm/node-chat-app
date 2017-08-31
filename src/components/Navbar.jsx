import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-brand">
                    <a className="navbar-item" href="http://bulma.io">
                        <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" />
                    </a>
                

                    <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
                        <span className="icon" style={{color: '#333'}}>
                            <i className="fa fa-github"></i>
                        </span>
                    </a>

                    <a className="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
                        <span className="icon" style={{color: '#55acee'}}>
                            <i className="fa fa-twitter"></i>
                        </span>
                    </a>

                    <div className="navbar-burger burger" data-target="navMenubd-example">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;