import React, { Component } from 'react';
import TopBar from '../navbar/topbar';
import './trending.css'
import '../home/home.css'

function PlaylistPlate(props) {
    return(
        <div className="plate">
            <div className="headline">
                <img src="https://i.scdn.co/image/ab67706f00000003f04cbd323e0edd1b19ef58bb" className="headimg" alt="header"></img>
            </div>
            {/* <audio controls>
                <source src="https://p.scdn.co/mp3-preview/bbafd15ff484394a0ca106d5fef0a81eeea4ef5b?cid=b0890075013943d7b857475306c66bfe"/>
            </audio> */}
            <Track cover={props.cover}
                    preview={props.preview}
                    name={props.name}
                    artist={props.artist}></Track>
        </div>
    )
}

function Track(props) {
    return(
        <div>
            <div className="Track">
                <img src={props.cover} className="cover" alt="cover"></img>
                <span className="playbutton">
                    <p className="p1"></p><p className="p2"></p>
                </span>
            </div>
        </div>
    )
}

class Trending extends Component {

    constructor(){
        super();
        this.state = {
            obtained: false
        }
        this.playlist1 = [
            {
                name: 'All I Want for Christmas Is You',
                artist: ["Mariah Carey"],
                id: '0bYg9bo50gSsH3LtXe2SQn',
                image: 'https://i.scdn.co/image/ab67616d0000b2734246e3158421f5abb75abc4f',
                preview: 'https://p.scdn.co/mp3-preview/bbafd15ff484394a0ca106d5fef0a81eeea4ef5b?cid=b0890075013943d7b857475306c66bfe'
              },
            {
                name: "It's the Most Wonderful Time of the Year",
                artist: ["Andy Williams"],
                id: '5hslUAKq9I9CG2bAulFkHN',
                image: 'https://i.scdn.co/image/ab67616d0000b27398073965947f92f1641b8356',
                preview: 'https://p.scdn.co/mp3-preview/b7f07feff3ed976d9e0fd53ba7e295e1782e4299?cid=b0890075013943d7b857475306c66bfe'
              }
        ];
    }
    render (){
        return (
            <div className="App">
                <div className="App-beta">
                    <TopBar></TopBar>
                </div>
                <div className="App-header">
                    <div className="trending">
                        <PlaylistPlate cover={this.playlist1[0].image}
                                       preview={this.playlist1[0].preview}
                                       name={this.playlist1[0].name}
                                       artist={this.playlist1[0].artist[0]}></PlaylistPlate>
                    </div>
                </div>
            </div>
        )};
}

export default Trending