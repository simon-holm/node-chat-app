import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Navbar from '../components/Navbar';
import {Footer} from '../components/Footer';

import { newMessage } from '../api/api';

class App extends Component {
    constructor(props) {
        super(props);

        newMessage((message) => console.log(message));
    }
	render() {
		return (
			<div>
                <Navbar/>
				<div className="center-align">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <h1>HEJ HEJ</h1>
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