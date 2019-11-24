import React, { Component } from 'react';
import Rating from "./Rating";
import "./StarRating.css";

class StarRating extends Component {
    render() {
        return (
            <div>
                <p>Rating component</p>
                <Rating />
                <p>Rating component (with set value that <strong>can</strong> be changed)</p>
                <Rating rating="1" />
                
                <p>Rating component (with set value that <strong>can't</strong> be changed)</p>
                <Rating rating="1" disabled="true" />
               
            </div>
        );
    }
}

export default StarRating;