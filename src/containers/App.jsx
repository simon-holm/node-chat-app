import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import StartComponent from '../components/Start'
import ChatTerminal from '../components/ChatTerminal'
import MacBar from '../components/MacBar'
import DesktopIcon from '../components/DesktopIcon'

import {
  sendMessage,
  newMessage,
  newLocationMessage,
  botBroadcastLocation
} from '../api/api'
import { openCloseChatHelper } from '../helpers/chat'

// Icons imported for webpack
import MacHd from '../assets/icons/mac-hd.png'
import TerminalIcon from '../assets/icons/terminal-icon.png'
import Spotify from '../assets/icons/spotify.png'
import Finder from '../assets/icons/finder.png'
import Chrome from '../assets/icons/chrome.png'

const APP_DATA = JSON.parse(localStorage.getItem('__INITIAL_STATE__'))

const INITIAL_STATE = {
  sessions: [
    {
      chatName: '#Epic Chat',
      messages: [
        {
          from: '$',
          text: 'Chat initialized',
          createdAt: new Date().getTime()
        }
      ],
      isOpen: false
    }
  ],
  username: 'Anonymous'
}

class App extends Component {
  state = APP_DATA || INITIAL_STATE

  constructor(props) {
    super(props)
    newMessage(message => this.updateChatSession(message))
    newLocationMessage(message => this.updateChatSession(message))
  }

  componentDidUpdate() {
    localStorage.setItem('__INITIAL_STATE__', JSON.stringify(this.state))
  }

  updateChatSession = message => {
    let newSessions = [...this.state.sessions]
    newSessions.map(session => {
      if (session.chatName === message.chatName) {
        session.messages.push(message)
      }
    })
    this.setState({ sessions: newSessions })
  }

  openCloseChat = currentChat => {
    this.setState({
      sessions: openCloseChatHelper(currentChat, this.state.sessions)
    })
  }

  updateUserName = username => {
    const oldUsername = this.state.username
    this.setState({ username })
    sendMessage(
      {
        chatName: '#Epic Chat',
        from: 'Bot',
        text: `${oldUsername} changed their name to ${username}`
      },
      () => console.log('sent')
    )
  }

  broadcastUserLocation = (chatName, username) => {
    if (!navigator.geolocation) {
      return console.log('Geolocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(
      pos => botBroadcastLocation(chatName, username, pos),
      () => console.log('Unable to fetch location')
    )
  }

  render() {
    const { sessions } = this.state
    return (
      <div>
        <Navbar
          username={this.state.username}
          updateUserName={this.updateUserName}
        />
        <div
          className="center-align app-background"
          style={{ minHeight: 'calc(100vh - 30px)' }}
        >
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <StartComponent />
                  {sessions.map((session, index) => {
                    const currentChat = this.state.sessions.filter(
                      s => s.chatName === session.chatName
                    )
                    return (
                      <div key={index + 'chat'}>
                        <ChatTerminal
                          username={this.state.username}
                          chatName={session.chatName}
                          messages={session.messages}
                          isOpen={currentChat[0].isOpen}
                          close={() => this.openCloseChat(currentChat)}
                          userLocation={this.broadcastUserLocation}
                        />
                        <DesktopIcon
                          callBack={() => this.openCloseChat(currentChat)}
                          icon={TerminalIcon}
                          title={session.chatName}
                          position={{ x: 10, y: 150 }}
                        />
                      </div>
                    )
                  })}
                  <DesktopIcon
                    callBack={() => alert('this.props.callBack Doubleclick!')}
                    icon={MacHd}
                    title={'C: HDD'}
                    position={{
                      x: window.innerWidth - 120,
                      y: -80
                    }}
                  />
                </div>
              )}
            />
            <Route path="/edit" render={() => <div />} />
          </Switch>
        </div>

        <MacBar
          icons={[
            {
              name: 'Finder',
              icon: Finder,
              callBack: () => alert('Finder clicked')
            },
            {
              name: 'Chrome',
              icon: Chrome,
              callBack: () => alert('Chrome clicked')
            },
            {
              name: 'Spotify',
              icon: Spotify,
              callBack: () => alert('Spotify clicked')
            }
          ]}
        />
      </div>
    )
  }
}

export default App
