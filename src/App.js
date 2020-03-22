import React from 'react'
import './App.css'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Inspector from './components/Inspector'
import Viewer from './components/Viewer'

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom'

import 'bulma/css/bulma.css'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Switch>
          <Route path="/records/:uuid" component={Viewer} />
          <Route path="/">
            <Inspector />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
