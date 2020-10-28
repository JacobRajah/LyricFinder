import React, { Component } from 'react';
import TopBar from '../navbar/topbar';
import './TopCharts.css'
import '../home/home.css'

function Track(props) {
    return(
        <div className="Track">
            <img src={props.cover} className="cover" alt="coverart"/>
            <h2 className="name">{props.name}</h2>
            <h6 className="artist">{props.artist}</h6>

        </div>
    )
}

class TopCharts extends Component {

    constructor(props){
        super()
        this.state = {
            cover: 'https://images.genius.com/b37e9ec812dac4d8b6b8cbfb274dcf77.300x300x1.png',
            name: 'Glock In My Lap',
            artist: '21 Savage & Metro Boomin'
        }
    }

    render (){
        return (
            <div className="App">
                <div className="App-beta">
                    <TopBar></TopBar>
                </div>
                <div className="App-header">
                    <div className="TC">
                        <div className="charts">
                            <Track cover={this.state.cover} name={this.state.name} artist={this.state.artist}></Track>
                            <Track cover={this.state.cover} name={this.state.name} artist={this.state.artist}></Track>
                        </div>
                        
                    </div>
                </div>
            </div>
        )};
}

export default TopCharts