import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../components/Navbar';
import {Footer} from '../components/Footer';
import StartComponent from '../components/Start';
import ChatTerminal from '../components/ChatTerminal';
import MacBar from '../components/MacBar';
import DesktopIcon from '../components/DesktopIcon';

import { newMessage } from '../api/api';

// Icons imported for webpack
import MacHd from '../assets/icons/mac-hd.png';
import TerminalIcon from '../assets/icons/terminal-icon.png';
import Spotify from '../assets/icons/spotify.png';
import Finder from '../assets/icons/finder.png';
import Chrome from '../assets/icons/chrome.png';

class App extends Component {
    state = { 
        sessions: [
            {
                chatName: '#Epic Chat',
                messages: [
                    {
                        from: '$',
                        text: 'Chat initialized',
                        createdAt: new Date().getTime()
                    }
                ]
            }
        ],
        username: 'Anonymous' 
    }

    constructor(props) {
        super(props);
        newMessage((message) => this.updateChatSession(message));
    }
    
    updateChatSession = (message) => {
        let newSessions = [...this.state.sessions];
        newSessions.map(session => {
            if (session.chatName === message.chatName) {
                session.messages.push({ from: message.from, text: message.text, createdAt: message.createdAt })
            }
        })
        this.setState({ sessions: newSessions })
    }

    updateUserName = username => this.setState({ username })

	render() {
        const { sessions } = this.state;
		return (
			<div>
                <Navbar/>
				<div className="center-align app-background" style={{ minHeight: 'calc(100vh - 30px)'}}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div>
                                    <StartComponent />
                                    {sessions.map((session, index) => {
                                        return (
                                            <div key={index + 'chat'}>
                                                <ChatTerminal 
                                                    username={this.state.username} chatName={session.chatName} 
                                                    messages={session.messages}
                                                />
                                                <DesktopIcon callBack={() => alert('clicked Chat Terminal')} 
                                                    icon={TerminalIcon}
                                                    title={session.chatName}
                                                    isRoot={false}
                                                />
                                            </div>
                                        )
                                    })}
                                    <DesktopIcon 
                                        callBack={() => alert('this.props.callBack Doubleclick!')}
                                        icon={MacHd}
                                        title={'C: HDD'}
                                        isRoot={false}
                                    />
                                </div>
                            )}
                        />
                        <Route
                            path="/edit"
                            render={() => (
                                <div>
                                </div>
                            )}
                        />
                    </Switch>
                </div>
                
                <MacBar icons={[
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
                ]} />
			</div>
		);
	}
}

export default App;