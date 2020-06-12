import React from 'react';
import './App.css';
import CustomerInputs from './components/UI';
import BetaNumber from './components/betaNumber';

function App() {
  return (
    <div className="App">
      <div className="App-beta">
        <BetaNumber beta="1.1.1"/>
      </div>
      <div className="App-header">
        <h1>Welcome to Lyric Finder</h1>
        <CustomerInputs></CustomerInputs>
      </div>
    </div>
  );
}

export default App;
