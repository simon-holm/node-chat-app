import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  state = { menuActive: false }

  userNameUpdate = e => {
    e.preventDefault()
    if (
      this.props.username.trim() === this.state.username.trim() ||
      !this.state.username ||
      this.state.username == ''
    ) {
      console.log('Names are identical')
    } else {
      this.props.updateUserName(this.state.username.trim())
    }
  }

  render() {
    const { username } = this.props
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <a className="navbar-item" href="http://bulma.io">
            <span className="icon" style={{ color: '#333' }}>
              <i className="fa fa-apple" />
            </span>
          </a>

          <a
            className="navbar-item is-hidden-desktop"
            href="https://github.com/jgthms/bulma"
            target="_blank"
          >
            <span className="icon" style={{ color: '#333' }}>
              <i className="fa fa-github" />
            </span>
          </a>

          <a
            className="navbar-item is-hidden-desktop"
            href="https://twitter.com/jgthms"
            target="_blank"
          >
            <span className="icon" style={{ color: '#55acee' }}>
              <i className="fa fa-twitter" />
            </span>
          </a>

          <div
            className="navbar-burger burger"
            data-target="navMenubd-example"
            onClick={() =>
              this.setState({ menuActive: !this.state.menuActive })}
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div
          id="navMenubd-example"
          className={
            this.state.menuActive ? 'navbar-menu is-active' : 'navbar-menu'
          }
        >
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-item" href="#">
                <strong>Finder</strong>
              </a>
              <div className="navbar-dropdown">
                <Link className="navbar-item" to={{ pathname: '/' }}>
                  Chat
                </Link>
                <Link className="navbar-item" to={{ pathname: '/edit' }}>
                  Another program
                </Link>

                <hr className="navbar-divider" />

                <div className="navbar-item">
                  <div>
                    <p className="is-size-6-desktop">
                      <strong className="has-text-info">0.5.1</strong>
                    </p>

                    <small>
                      <a className="bd-view-all-versions" href="#">
                        View all versions
                      </a>
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-item" href="#">
                File
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item">New Chat</a>
                <hr className="navbar-divider" />
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
                          <a
                            className="button is-small"
                            href="http://bulma.io/atom.xml"
                          >
                            <span className="icon is-small">
                              <i className="fa fa-rss" />
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
              <a className="navbar-item" href="#">
                Settings
              </a>
              <div className="navbar-dropdown">
                <div className="navbar-item">
                  <div>
                    <p className="is-size-6-desktop">
                      <strong className="has-text-info">Username</strong>
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '300px',
                        alignItems: 'center'
                      }}
                    >
                      <form
                        style={{
                          width: '100%',
                          height: '36px',
                          paddingRight: '5px'
                        }}
                        onSubmit={this.userNameUpdate}
                      >
                        <input
                          style={{ width: '100%', height: '36px' }}
                          placeholder={this.props.username}
                          maxLength="10"
                          onChange={e =>
                            this.setState({ username: e.target.value })}
                        />
                      </form>
                      <a className="button" onClick={this.userNameUpdate}>
                        Set
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <a
              className="navbar-item is-hidden-desktop-only"
              href="https://github.com/spixooze/node-chat-app"
              target="_blank"
            >
              <span className="icon" style={{ color: '#333' }}>
                <i className="fa fa-github" />
              </span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
