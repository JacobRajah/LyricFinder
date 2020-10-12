import React, { Component } from 'react';
import './home.css';
import CustomerInputs from './LyricInput';
import TopBar from './topbar';

class Home extends Component {

  render(){
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
  
}

export default Home;
