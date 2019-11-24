import React, { Component } from 'react';
import "./style.css";
class RightArrow extends Component {
    render() {
        return (
            <div className="nextArrow arrow" onClick={this.props.goToNextSlide}>
                <i className="fa fa-arrow-right fa-2x" aria-hidden="true">→</i>
            </div>
        );
    }
}

export default RightArrow;