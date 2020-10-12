import React, { Component } from 'react';
import './topbar.css'
import { Link } from 'react-router-dom';

class TopBar extends Component {

    render (){
        return (
            <div className="Nav">
                <h1 className="WebName">LYRIC FYNDER</h1>
                <Link to={'./topcharts'}>
                    <h1 className="Redirects">TOP CHARTS</h1>
                </Link>
                <h1 className="Redirects">TRENDING</h1>
                <h1 className="Redirects">SEARCH</h1>
                <h1 className="Redirects">ABOUT</h1>
                <img src={require("../images/spotify.png")} className="RedirectsIMG" alt="spotify"></img>
            </div>
        )};
}

export default TopBar