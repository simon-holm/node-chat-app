import React, {Component} from 'react';

class StartComponent extends Component {
    render() {
        return (
            <div>
                <h1>BOILER</h1>
                <button onClick={() => this.props.onTest()}>ES7</button>
                <p>Using Stage-2: {this.props.stage2 ? 'Yes' : 'No'}</p>
                <button onClick={() => this.props.testAsync()}>Async Await 2sek alert</button>
            </div>
        );
    }
}

export default StartComponent;