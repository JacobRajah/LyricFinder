import React, { Component } from 'react';
import TopBar from '../navbar/topbar';
import './trending.css'
import '../home/home.css'

class Trending extends Component {
    render (){
        return (
            <div className="App">
                <div className="App-beta">
                    <TopBar></TopBar>
                </div>
                <div className="App-header">
                    <div className="trending">
                        
                    </div>
                </div>
            </div>
        )};
}

export default Trending