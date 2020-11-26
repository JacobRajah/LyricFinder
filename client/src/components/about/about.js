import React, { Component } from 'react';
import TopBar from '../navbar/topbar';
import './about.css'
import '../home/home.css'

function Media(props) {
    const [move, setmove] = React.useState(0)
    return (
        <div className="Main" 
             onClick={() => {setmove(1);}} 
             onAnimationEnd={() => {setmove(0); props.toOptions()}} 
             move={move}>
            <h1 className="Hello">Hi, I'm Jacob</h1>
            <h1 className="Next">{'>>'}</h1>
        </div>
    )
}

class About extends Component {

    constructor(props) {
        super()
        this.state = {
            main: 1,
            options: 0,
            software: 0,
            work: 0,
            projects: 0,
            education: 0,
            contact:0
        }

        this.toOptions = this.toOptions.bind(this)
    }

    toOptions() {
        this.setState({main: 0})
        this.setState({options: 1})
    }

    render (){
        if(this.state.main){
            return (
                <div className="App">
                    <div className="App-beta">
                        <TopBar></TopBar>
                    </div>
                    <div className="App-header">
                        <div className="about">
                            <Media toOptions={this.toOptions}></Media>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.options){
            return (
                <div className="App">
                    <div className="App-beta">
                        <TopBar></TopBar>
                    </div>
                    <div className="App-header">
                        <div className="about">
                            <h1>Options</h1>
                        </div>
                    </div>
                </div>
            )
        }
        };
}

export default About