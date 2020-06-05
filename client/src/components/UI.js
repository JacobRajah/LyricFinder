import React, { Component } from 'react';
import Axios from 'axios';

function SongsFound(props){
    
    return (
        <div>
            <h5>{props.value}</h5>
        </div>
    );
}

class CustomerInputs extends Component{

    constructor(props){
        super(props);
        this.state = {
            lyrics: null,
            songName: null,
            isClicked: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({isClicked: true});
        this.setState({songName: "Searching for Matches.."});

        const data = {
            name: this.state.lyrics
        }

        Axios.post('/', data).then(res => {
            this.setState({isClicked: false});
            this.setState({songName: res.data});
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

                <SongsFound value={this.state.songName}/>
            </div>
        );
    }
}

export default CustomerInputs