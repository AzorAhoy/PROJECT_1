import React, { Component } from 'react';
import "./style.css";
class Slide extends Component {

    render() {
        const styles = {
            backgroundImage: `url(${this.props.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 60%'
        }
        return <div className="slide" style={styles}></div>
    }
}

export default Slide;