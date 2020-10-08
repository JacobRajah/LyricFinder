import React from 'react';
import './App.css';
import CustomerInputs from './components/LyricInput';
import TopBar from './components/topbar';

function App() {
  return (
    <div className="App">
      <div className="App-beta">
        <TopBar></TopBar>
      </div>
      <div className="App-header">
        <CustomerInputs></CustomerInputs>
      </div>
    </div>
  );
}

export default App;
