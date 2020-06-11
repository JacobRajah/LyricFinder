import React, { Component } from 'react';
import Axios from 'axios';

function SongsFound(props){
    
    return (
        <div>
            <h5>Song Name: {props.songName}</h5>
            <h5>Artist: {props.artist}</h5>
        </div>
    );
}

class CustomerInputs extends Component{

    constructor(props){
        super(props);
        this.state = {
            lyrics: null,
            songName: null,
            artist: null,
            isClicked: false
        }
    }

    componentDidMount() {
        this.fetchUsers();
        this.timer = setInterval(() => this.fetchUsers(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    fetchUsers = () => {
        Axios.get('/songname')
            .then(response => {
                var temp = response.data[0].name
                if(temp !== "Searching for Matches.." && temp !== "null"){
                    this.setState({isClicked: false});
                    this.setState({songName: temp});
                    this.setState({artist: response.data[0].artist});
                }
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({isClicked: true});
        this.setState({songName: "Searching for Matches.."});

        const data = {
            name: this.state.lyrics
        }

        Axios.post('/', data).then(res => {
            console.log(res.data);
        });

    }

    handleInputChange = (event) => {
        console.log(event.target.name);
        this.setState({ lyrics : event.target.value})
    }

    handleReset = () => {
        this.setState({lyrics: null})
    }

    render() {
        
        return(

            <div>
                 
                <h3>Type lyrics below to find song</h3>
                <p>{this.state.lyrics}</p>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <input type="text" placeholder='Type Lyrics Here' name='name' onChange={this.handleInputChange}/>
                        <button type="reset" onClick={this.handleReset}>X</button>
                    </p>
                    <p><button disabled={this.state.isClicked} type="submit">Find Song</button></p>
                </form>

                <SongsFound songName={this.state.songName} artist={this.state.artist}/>
            </div>
        );
    }
}

export default CustomerInputs