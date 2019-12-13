import React, { Component } from 'react';
import "./StarRating.css";

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating || null,
            temp_rating: 0
        }
    }



    // getInitialState() {
    //     return {
    //         rating: this.props.rating || null,
    //         temp_rating: null
    //     };
    // }

    rate(rating) {
        this.setState({
            rating: rating,
            temp_rating: rating
        });
        this.props.getRating(rating);
    }

    star_over(rating) {
        //this.state.temp_rating = this.state.rating;
        let t = this.state.rating;
        //this.state.rating = rating;
        this.setState({
            rating: this.state.rating,
            temp_rating: rating
        });
        this.setState({
            rating: this.state.rating,
            temp_rating: this.state.temp_rating
        });
    }

    star_out() {
        let temp = this.state.temp_rating;
        this.setState({ rating: temp });
    }

    render() {
        var stars = [];
        console.log(this.state.temp_rating);
        console.log(this.state.rating);
        //this.props.getRating(this.state.rating);
        for (var i = 0; i < 10; i++) {
            var klass = 'star-rating__star';

            if (this.state.rating >= i && this.state.rating != null) {
                klass += ' is-selected';
            }

            stars.push(
                <label
                    key={i}
                    className={klass}
                    onClick={this.rate.bind(this, i)}
                    onMouseOver={this.star_over.bind(this, i)}
                    //onMouseOut={this.star_out}
                    >
                    ★
                </label>
            );
        }

        return (
            <div className="star-rating">
                {stars}
            </div>
        );
        }
    // render() {
    //     return (
    //         <div>
                
    //         </div>
    //     );
    // }
};

export default Rating;