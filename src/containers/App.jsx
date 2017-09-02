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

class App extends Component {
    state = { 
        sessions: [
            {
                chatName: '#Epic Chat',
                messages: [
                    {
                        from: 'Admin',
                        text: 'Chat initialized',
                        createdAt: new Date().getTime()
                    }
                ]
            }
        ] 
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
                                    {sessions.map(session => {
                                        return <ChatTerminal key={session.chatName} chatName={session.chatName} messages={session.messages}/>
                                    })}
                                </div>
                            )}
                        />
                        <Route
                            path="/edit"
                            render={() => (
                                <h1>EDIT</h1>
                            )}
                        />
                    </Switch>
                    <DesktopIcon 
                        callBack={() => alert('this.props.callBack Doubleclick!')}
                        icon={MacHd}
                    />
                </div>
                <MacBar />
			</div>
		);
	}
}

export default App;