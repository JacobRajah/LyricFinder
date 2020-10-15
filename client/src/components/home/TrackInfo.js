import React, { Component } from 'react';
import './TrackInfo.css';

class TrackInfo extends Component {

    render (){
        if(this.props.expand){
            return (
                <div ref={this.props.myRef} className="TrackPlate">
                    <div>
                        <img src={this.props.coverArt} alt="cover" className="CoverArt"/>
                    </div>
                    
                    <div className="SongInfo">
                        <h5>{this.props.songName} {this.props.artist}</h5>
                        <p>{this.props.lyrics}</p>
                    </div>
                    
                </div>
            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default TrackInfo