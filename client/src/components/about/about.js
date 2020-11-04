import React, { Component } from 'react';
import TopBar from '../navbar/topbar';
import './about.css'
import '../home/home.css'

class About extends Component {
    render (){
        return (
            <div className="App">
                <div className="App-beta">
                    <TopBar></TopBar>
                </div>
                <div className="App-header">
                    <div className="about">
                        <h1>Hi, I'm Jacob</h1>
                    </div>
                </div>
            </div>
        )};
}

export default About