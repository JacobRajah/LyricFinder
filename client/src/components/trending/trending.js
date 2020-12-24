import React, { Component } from 'react';
import TopBar from '../navbar/topbar';
import './trending.css'
import '../home/home.css'
import Axios from 'axios';

function PlaylistPlate(props) {
    return(
        <div className="plate">
            <div className="headline">
                <img src={props.coverHead} className="headimg" alt="header"></img>
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
            <div className="Track-trending">
                <div className="image-track">
                    <img src={props.cover} className="cover-trending" alt="cover"></img>
                </div>
                <div className="track-data-trending">
                    <p className="name-trending">{props.name}</p>
                    <p className="artist-trending">{props.artist}</p>
                </div>
                <span className="playbutton" onClick={() => props.playSnippet(props.preview)}>
                    <div className="arrow-right"></div>
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
            curr_prev: undefined,
            p1_ready: false,
            p2_ready: false
        }
        this.playlist1 = {
            name: null,
            url: null,
            tracks: []
        };
        this.playlist2 = {
            name: null,
            url: null,
            tracks: []
        }
        this.playSnippet = this.playSnippet.bind(this);
    }

    componentDidMount() {
        this.getPlaylist1('Christmas Hits');
        this.getPlaylist2('Rap Caviar');
    }

    getPlaylist1 = (pname) => {
        Axios.post('/trending', {playlist: pname}).then(res => {
            this.playlist1.tracks = res.data.tracks;
            this.playlist1.name = res.data._id;
            this.playlist1.url = res.data.url;
            this.setState({p1_ready: true});
        });
    }

    getPlaylist2 = (pname) => {
        Axios.post('/trending', {playlist: pname}).then(res => {
            this.playlist2.tracks = res.data.tracks;
            this.playlist2.name = res.data._id;
            this.playlist2.url = res.data.url;
            this.setState({p2_ready: true});
        });
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
                        {this.state.p1_ready ? <PlaylistPlate charts={this.playlist1.tracks}
                                       playSnippet={this.playSnippet}
                                       coverHead={this.playlist1.url}></PlaylistPlate> : null}
                        {this.state.p2_ready ? <PlaylistPlate charts={this.playlist2.tracks}
                                       playSnippet={this.playSnippet}
                                       coverHead={this.playlist2.url}></PlaylistPlate> : null}
                    </div>
                </div>
            </div>
        )};
}

export default Trending