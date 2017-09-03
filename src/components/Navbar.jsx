import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = { menuActive: false }
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-brand">
                    <a className="navbar-item" href="http://bulma.io">
                        <span className="icon" style={{color: '#333'}}>
                            <i className="fa fa-apple"></i>
                        </span>
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

                    <div className="navbar-burger burger" data-target="navMenubd-example" onClick={() => this.setState({ menuActive: !this.state.menuActive })}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div id="navMenubd-example" className={this.state.menuActive ? "navbar-menu is-active" : "navbar-menu"}>
                    <div className="navbar-start">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-item" href="#"><strong>Finder</strong></a>
                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to={{ pathname: '/'}}>Chat</Link>
                                <Link className="navbar-item" to={{ pathname: '/edit'}}>Another program</Link>
                                
                                <hr className="navbar-divider"/>

                                <div className="navbar-item">
                                    <div>
                                    <p className="is-size-6-desktop">
                                        <strong className="has-text-info">0.5.1</strong>
                                    </p>
                                    
                                        <small>
                                            <a className="bd-view-all-versions" href="#">View all versions</a>
                                        </small>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-item" href="#">File</a>
                            <div className="navbar-dropdown">
                                <a className="navbar-item">New Chat</a>
                                <hr className="navbar-divider"/>
                                <div className="navbar-item">
                                    <div className="navbar-content">
                                        <div className="level is-mobile">
                                            <div className="level-left">
                                                <div className="level-item">
                                                    <strong>It's a button!</strong>
                                                </div>
                                            </div>
                                            <div className="level-right">
                                                <div className="level-item">
                                                    <a className="button is-small" href="http://bulma.io/atom.xml">
                                                        <span className="icon is-small">
                                                            <i className="fa fa-rss"></i>
                                                        </span>
                                                        <span>Boom!</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-item" href="#">Settings</a>
                            <div className="navbar-dropdown">
                                <a className="navbar-item" href="#">Set Username</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="navbar-end">
                        <a className="navbar-item is-hidden-desktop-only" href="https://github.com/spixooze/node-chat-app" target="_blank">
                            <span className="icon" style={{ color: '#333'}}>
                                <i className="fa fa-github"></i>
                            </span>
                        </a>
                    </div>
                </div>

            </nav>
        );
    }
}

export default Navbar;