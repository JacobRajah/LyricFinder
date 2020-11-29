import React, { Component } from 'react';
import TopBar from '../navbar/topbar';
import './about.css'
import '../home/home.css'

function Media(props) {
    const [move, setmove] = React.useState(0);
    return (
        <div className="Main" 
             onClick={() => {setmove(1);}} 
             onAnimationEnd={() => {setmove(0); props.toOptions()}} 
             move={move}>
            <h1 className="Hello">Hi, I'm Jacob</h1>
        </div>
    )
}

function MediaOptions(props) {
    return (
        <div className="options">
            <h4 className="software" onClick={() => props.toSoftware()}>Software</h4>
            <h4 className="work" onClick={() => props.toWork()}>Work Experience</h4>
            <h4 className="projects" onClick={() => props.toProjects()}>Projects</h4>
            <h4 className="education" onClick={() => props.toEducation()}>Education</h4>
            <h4 className="contact" onClick={() => props.toContact()}>Contact</h4>
        </div>
    )
}

function Software(props) {
    return (
        <div className="panel">
            <h3>Software Experience</h3>
            <h1 className="Next" onClick={() => props.backOptions()}>{'>>'}</h1>
        </div>
    )
}

function Work(props) {
    return (
        <div className="panel">
            <h3>Work</h3>
            <h1 className="Next" onClick={() => props.backOptions()}>{'>>'}</h1>
        </div>
    )
}

function Projects(props) {
    return (
        <div className="panel">
            <h3>Projects</h3>
            <h1 className="Next" onClick={() => props.backOptions()}>{'>>'}</h1>
        </div>
    )
}

function Education(props) {
    return (
        <div className="panel">
            <h3>Education</h3>
            <h1 className="Next" onClick={() => props.backOptions()}>{'>>'}</h1>
        </div>
    )
}

function Contact(props) {
    return (
        <div className="panel">
            <h3>Contact</h3>
            <h1 className="Next" onClick={() => props.backOptions()}>{'>>'}</h1>
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
        this.toSoftware = this.toSoftware.bind(this)
        this.backOptions = this.backOptions.bind(this)
        this.toWork = this.toWork.bind(this)
        this.toProjects = this.toProjects.bind(this)
        this.toEducation = this.toEducation.bind(this)
        this.toContact = this.toContact.bind(this)
        
    }

    toOptions() {
        this.setState({main: 0})
        this.setState({options: 1})
    }

    toSoftware() {
        this.setState({
            options: 0,
            software: 1
        })
    }

    toWork() {
        this.setState({
            options: 0,
            work: 1
        })
    }

    toProjects() {
        this.setState({
            options: 0,
            projects: 1
        })
    }

    toEducation() {
        this.setState({
            options: 0,
            education: 1
        })
    }

    toContact() {
        this.setState({
            options: 0,
            contact: 1
        })
    }

    backOptions() {
        this.setState({
            software: 0,
            work: 0,
            projects: 0,
            education: 0,
            contact:0,
            options: 1
        })
    }

    render (){
        return (
                <div className="App">
                    <div className="App-beta">
                        <TopBar></TopBar>
                    </div>
                    <div className="App-header">
                        <div className="about">
                            {this.state.main ? <Media toOptions={this.toOptions}></Media> : null}
                            {this.state.options ? <MediaOptions toSoftware={this.toSoftware} 
                            toWork={this.toWork} toProjects={this.toProjects} toEducation={this.toEducation}
                            toContact={this.toContact}></MediaOptions> : null}
                            {this.state.software ? <Software backOptions={this.backOptions}></Software> : null}
                            {this.state.work ? <Work backOptions={this.backOptions}></Work> : null}
                            {this.state.projects ? <Projects backOptions={this.backOptions}></Projects> : null}
                            {this.state.education ? <Education backOptions={this.backOptions}></Education> : null}
                            {this.state.contact ? <Contact backOptions={this.backOptions}></Contact> : null}
                        </div>
                    </div>
                </div>
            )
        };
}

export default About