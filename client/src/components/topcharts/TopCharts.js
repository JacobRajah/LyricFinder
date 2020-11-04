import React, { Component } from 'react';
import TopBar from '../navbar/topbar';
import Axios from 'axios';
import './TopCharts.css'
import '../home/home.css'

function Track(props) {
    return(
        <div className="Track" id={props.rank}>
            <img src={props.cover} className="cover" alt="coverart"/>
            <p className="content">
                <p className="name">{props.name}</p>
                <p className="artist">{props.artist}</p>
                <h4 className="rank">{props.rank}</h4>
            </p>
        </div>
    )
}

function Charts(props) {
    if(props.populated){
        return(
            <div className="charts">
                {
                    props.charts.map((e,i) => {
                        return(
                            <Track cover={e.cover} 
                            name={e.name} 
                            artist={e.artist} 
                            rank={e.rank}/>
                        )
                    })
                }
            </div>    
        )

    }

    return(
        <div></div>
    )
}

class TopCharts extends Component {

    constructor(props){
        super();
        this.state = {
            populated: false
        }
        this.charts = null;
    }

    componentDidMount() {
        this.getCharts()
    }

    getCharts = () => {
        Axios.get('/topcharts').then(response => {
            this.charts = response.data;
            this.setState({populated:true})
        });

    }

    render (){
        
        return (
            <div className="App">
                <div className="App-beta">
                    <TopBar></TopBar>
                </div>
                <div className="App-header">
                    <div className="TC">
                        <h2>Billboard Top 100</h2>
                        <Charts charts={this.charts} populated={this.state.populated}></Charts>
                    </div>
                </div>
            </div>
        )
    };
}

export default TopCharts