import React, { Component } from 'react';

class FreshStart extends Component {

    pickColor(color){
        this.props.ColorSelected(color);
    }

    render() {
        return(
            <div className="Game-intro">
                <h3>Pick color for the first player</h3>
                <button type="button" className="colorChoice ccRed" onClick={() => { this.pickColor(0)}}></button>
                <button type="button" className="colorChoice ccYellow" onClick={() => { this.pickColor(1)}}></button>
            </div>
        );      
    }
}

export default FreshStart;
