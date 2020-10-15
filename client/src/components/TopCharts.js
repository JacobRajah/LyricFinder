import React, { Component } from 'react';
import TopBar from './topbar';
import './TopCharts.css'
import './home.css'

class TopCharts extends Component {
    render (){
        return (
            <div className="App">
                <div className="App-beta">
                    <TopBar></TopBar>
                </div>
                <div className="App-header">
                    <div className="TC">
                        
                    </div>
                </div>
            </div>
        )};
}

export default TopCharts