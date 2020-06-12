import React, { Component } from 'react';
import Axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';

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

    // componentDidMount() {
    //     this.fetchUsers();
    //     this.timer = setInterval(() => this.fetchUsers(), 1000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timer);
    //     this.timer = null;
    // }

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
                }
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({isClicked: true});

        const data = {
            name: this.state.lyrics
        }
        
        this.timer = setInterval(() => this.fetchUsers(), 1000);

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
            </div>
        );
    }
}

export default CustomerInputs