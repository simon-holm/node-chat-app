import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../components/Navbar';
import {Footer} from '../components/Footer';
import StartComponent from '../components/Start';
import ChatTerminal from '../components/ChatTerminal';

import { newMessage } from '../api/api';

class App extends Component {
    state = { stage2: true }

    constructor(props) {
        super(props);
        newMessage((message) => console.log(message));
    }
    
    onTest = () => alert('ES7');

    delayStuff = (stuff) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(stuff);
            }, 2000)
        })
    }

    testAsync = async () => {
        let first = await this.delayStuff(20);
        let second = await this.delayStuff(30);
        alert(`${await first} + ${ await second} = ${await first + await second}`)
    }

	render() {
        const { stage2 } = this.state;
		return (
			<div>
                <Navbar/>
				<div className="center-align app-background" style={{ minHeight: 'calc(100vh - 52px)'}}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div>
                                    <StartComponent 
                                        stage2={stage2} 
                                        onTest={this.onTest} 
                                        testAsync={this.testAsync} 
                                    />
                                    <ChatTerminal chatName={'#Epic Chat'}/>
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
                </div>
                <Footer/>
			</div>
		);
	}
}

export default App;