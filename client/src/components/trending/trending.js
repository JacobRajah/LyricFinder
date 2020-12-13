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
            <Tracks charts={props.charts}
                    playSnippet={props.playSnippet}></Tracks>
        </div>
    )
}

function Tracks(props) {
    return (
        <div>
            {
                props.charts.map((e,i) => {
                    return (
                        <Track cover={e.image}
                                preview={e.preview}
                                name={e.name}
                                artist={e.artist}
                                playSnippet={props.playSnippet}></Track>
                    )
                })
            }
        </div>
    )
}

function Track(props) {
    return(
        <div>
            <div className="Track">
                <div className="image-track">
                    <img src={props.cover} className="cover" alt="cover"></img>
                </div>
                <div className="track-data-trending">
                    <p className="name-trending">{props.name}</p>
                    <p className="artist-trending">{props.artist}</p>
                </div>
                <span className="playbutton" onClick={() => props.playSnippet(props.preview)}>
                    <p className="p1"></p><p className="p2"></p><p className="p3"></p>
                </span>
            </div>
        </div>
    )
}

class Trending extends Component {

    constructor(){
        super();
        this.state = {
            obtained: false,
            playing: false,
            audio: undefined,
            curr_prev: undefined
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
              },
            {
                name: "It's Beginning to Look a Lot like Christmas",
                artist: ["Michael Bublé"],
                id: '0bYg9bo50gSsH3LtXe2SQn',
                image: 'https://i.scdn.co/image/ab67616d0000b273119e4094f07a8123b471ac1d',
                preview: 'https://p.scdn.co/mp3-preview/798a8bc5a7a95ccad75648a63bc50aa755dc2289?cid=b0890075013943d7b857475306c66bfe'
              },
            {
                name: "Sleigh Ride",
                artist: ["The Ronettes"],
                id: '0bYg9bo50gSsH3LtXe2SQn',
                image: 'https://i.scdn.co/image/ab67616d0000b273adad4220d51bd720481d4be4',
                preview: 'https://p.scdn.co/mp3-preview/af8102ee02140590690efefd229d2182e5216ec5?cid=b0890075013943d7b857475306c66bfe'
              }
        ];
        this.playSnippet = this.playSnippet.bind(this);
    }

    playSnippet = (url) => {
        if(url == null){
            return
        }
        if(this.state.playing){
            this.state.audio.pause();
            this.setState({playing: false});
        }
        else if(this.state.curr_prev === url & this.state.playing === false){
            this.state.audio.play();
            this.setState({playing: true});
        }
        else{
            var preview = new Audio(url);
            preview.play();
            this.setState({audio: preview, playing: true, curr_prev: url});
        }

    }

    render (){
        return (
            <div className="App">
                <div className="App-beta">
                    <TopBar></TopBar>
                </div>
                <div className="App-header">
                    <div className="trending">
                        <PlaylistPlate charts={this.playlist1}
                                       playSnippet={this.playSnippet}></PlaylistPlate>
                    </div>
                </div>
            </div>
        )};
}

export default Trending