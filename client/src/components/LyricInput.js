import React, { Component } from 'react';
import Axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import ExpandData from './expandData';
import TrackInfo from './TrackInfo';
import './LyricInput.css'

function SongsFound(props){

    if(props.songName != null){
        return (
            <div>
                <h5>{props.songName}, {props.artist}</h5>
            </div>
        );
    }

    return null;
}

class CustomerInputs extends Component{

    constructor(props){
        super(props);
        this.state = {
            lyrics: 'Type lyrics below to find song',
            songName: null,
            artist: null,
            isClicked: false,
            coverArt: null,
            geniusLyrics: null,
            expand: false
        }
        this.myRef = React.createRef();
    }

    fetchReq = () => {
        Axios.get('/songData').then(response => {
            if(response.data.path != null){
                // Stop the timer
                clearInterval(this.timer);
                this.timer = null;

                this.setState({geniusLyrics: response.data.lyrics});
                this.setState({coverArt: response.data.coverArt});
                this.setState({expand: true});
            }
            else if(response.data.path === "Not found"){
                clearInterval(this.timer);
                this.timer = null;
            }
        })
    }

    fetchUsers = () => {
        Axios.get('/songname')
            .then(response => {
                var temp = response.data[0].name
                if(temp !== "null"){
                    this.setState({isClicked: false});
                    this.setState({songName: temp});
                    this.setState({artist: response.data[0].artist});
                    clearInterval(this.timer);
                    this.timer = null;
                    this.timer = setInterval(() => this.fetchReq(), 500);
                }
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({isClicked: true});
        this.setState({expand:false});

        const data = {
            name: this.state.lyrics
        }
        
        this.timer = setInterval(() => this.fetchUsers(), 1000);

        Axios.post('/', data).then(res => {
            console.log(res.data);
        });

    }

    handleInputChange = (event) => {
        if(this.state.lyrics === 'Type lyrics below to find song'){
            this.setState({ lyrics: null});
        }
        this.setState({ lyrics : event.target.value})
    }

    handleReset = () => {
        this.setState({lyrics: 'Type lyrics below to find song'})
    }

    render() {
        
        return(

            <div>
                <p>{this.state.lyrics}</p>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <input type="text" placeholder='Type Lyrics Here' name='name' onChange={this.handleInputChange}/>
                        <button type="reset" onClick={this.handleReset}>X</button>
                    </p>
                    <p><button disabled={this.state.isClicked} type="submit">Find Song</button></p>
                </form>

                <LoadingOverlay
                active={this.state.isClicked}
                spinner
                styles={{
                    overlay: (base) => ({
                    ...base,
                    background: 'rgba(40,44,52,10)'
                    })
                }}
                text='Searching for matches...'
                >
                    <SongsFound songName={this.state.songName} artist={this.state.artist}/>
                </LoadingOverlay>

                <ExpandData myRef={this.myRef} expand ={this.state.expand}></ExpandData>

                <TrackInfo myRef={this.myRef} coverArt={this.state.coverArt} lyrics={this.state.geniusLyrics} 
                songName={this.state.songName} artist={this.state.artist} expand={this.state.expand}/>

            </div>
        );
    }
}

export default CustomerInputs