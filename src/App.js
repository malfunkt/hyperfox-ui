import React from 'react';
import './App.css';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Inspector from './components/Inspector';

import 'bulma/css/bulma.css'

function App() {
  return (
    <div className="App">
      <Navigation />
			<Inspector />
      <Footer />
    </div>
  );
}

export default App;
