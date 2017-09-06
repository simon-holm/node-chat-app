import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import App from './containers/App'

// Styles
import './main.scss'

ReactDOM.render(
  <Router>
    <Route component={() => <App />} />
  </Router>,
  document.getElementById('app')
)
