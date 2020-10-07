import React, { Component } from 'react';
import './expandData.css';

function DropDown(props) {
    if(props.expand){
        return (
            <div>
                <div class="arrow" onClick={() => {(props.myRef).current.scrollIntoView({behavior: 'smooth'})}}>
                    <span></span>
                    <span></span>
                    <span></span>
    
                </div>
            </div>
            
        );
    }

    return null;
}

class ExpandData extends Component {
    
    render (){
        return(
            <DropDown expand={this.props.expand} myRef={this.props.myRef}/>
        );};
}

export default ExpandData