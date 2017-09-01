import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../components/Navbar';
import {Footer} from '../components/Footer';

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
		return (
			<div>
                <Navbar/>
				<div className="center-align" style={{ minHeight: 'calc(100vh - 52px)'}}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <div>
                                    <h1>HEJ HEJ</h1>
                                    <button onClick={ () => this.onTest() }>ES7</button>
                                    <p>Using Stage-2: {this.state.stage2 ? 'Yes': 'No'}</p>
                                    <button onClick={ () => this.testAsync() }>Async Await 2sek alert</button>
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