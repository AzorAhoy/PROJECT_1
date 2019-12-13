import React, { Component } from 'react';
//import logo from './logo.svg';
//import MultiSelect from "@kenshooui/react-multi-select";
import MultiSelect from "../../Components/MultiSelect/MultiSelect";
//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../../Components/Header/Header';
import StarRating from "../../Components/StarRating/StarRating";
import Autocomplete from "../../Components/Autocomplete/Autocomplete"
import PercentageCircle from "../../Components/PercentageCircle/PercentageCircle"
import Slider from "../../Components/Slider/Slider";
import './style.css';
import axios from '../../axios';


class HomePage extends Component {
    state = {
        list: [],
        titles: [],
        rating: []
    }

    componentDidMount() {
        axios.get("http://localhost:6900/api/game/")
            .then(data => {
                const list = data.data.data
                console.log(list);

                this.setState({
                    list
                });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get("http://localhost:6900/api/userreview/")
            .then(data => {
                console.log(data.data.result);
                this.setState({rating: data.data.result});
            })
            .catch(err => {
                console.log(err);
            })

        let tempArr = ["1"];
        tempArr.push("1");
        tempArr.push("1");
        tempArr.push("1");
        //tempArr.push(list.title);
        this.state.list.forEach(item => {
            console.log(item);
            //tempArr.push(item.title+"");
        });

        // for (let index = 0; index < this.state.list.length; index++) {
        //     tempArr.push(this.state.list[index].title + "");

        // }
        //this.state.list.map((item) => tempArr.push(item.title));
        this.setState({ titles: tempArr });
        console.log(tempArr)
    }

    render() {
        const LIST1 = this.state.list.map((item, key) => {
            console.log(item._id);
            const rating = this.state.rating.find(i => i._id === `${item._id}`);
            if (rating)
                console.log(rating.avgRating);
            return (
                <div className="col-sm-5ths slick-slide slick-cloned" style={{ "width": "295px" }}
                >
                    <a className="game-card"
                        href={`/game/${item._id}`} >
                        <img className="img-responsive cover_uniform game-card-image cover_uniform cover_uniform" src={item.cover} />
                        <div className="game-card-overlay">Read<br />More</div>
                        <div className="game-card-caption">
                            <div className="game-card-aside">{rating ? `${Math.round(rating.avgRating * 10)}%`: null}</div>
                            <p className="game-card-name">{item.title}</p>
                            <small className="game-card-subtitle">{item.genres.join(",")}</small>
                        </div>
                    </a>
                </div>
            )
        })

        return (
            <div>
                <Header suggestions={this.state.titles} />
                <h3 className="underscratch underscratch-yellow">Popular Games Right Now</h3>
                <div className="slick-home slick-coverflow slick-initialized slick-slider">
                    <div className="slick-arrow-prev slick-arrow" style={{ "display": "block" }}>
                        <span className="material-icons">keyboard_arrow_left</span>
                    </div>
                    <div aria-live="polite" className="slick-list draggable">
                        <div className="slick-track" role="listbox">
                            {LIST1}
                        </div>
                    </div>
                    <div className="slick-arrow-next slick-arrow" style={{ "display": "block" }}>
                        <span className="material-icons">keyboard_arrow_right</span>
                    </div>
                </div>

                {/* <h3 className="underscratch underscratch-green"><a href="/reviews"><span>Recently Reviewed</span></a></h3>
                <div className="loaded">
                    <div className="review-panels">
                        <div className="row">
                            <div className="col-sm-4" data-reactid="3">
                                <a href="/games/felix-the-reaper"
                                    className="review-panel review-panel-small review-panel-great embed-responsive embed-responsive-16by9">
                                    <div className="review-panel-caption">
                                        <p className="review-panel-title overflow-wrap">
                                            Felix the Reaper
                                        </p>
                                        <p className="review-panel-genres">Adventure</p>
                                    </div>
                                    <div className="review-panel-rating">
                                        78%
                                    </div>
                                    <img className="full-width screenshot_med embed-responsive-item" alt=""
                                        src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/peqlhyiey3aqfrsio21c.jpg" />
                                </a>
                            </div>
                            <div className="col-sm-4">
                                <a href="/games/stela"
                                    className="review-panel review-panel-small review-panel-good embed-responsive embed-responsive-16by9">
                                    <div className="review-panel-caption">
                                        <p className="review-panel-title overflow-wrap">Stela</p>
                                        <p className="review-panel-genres">Adventure</p>
                                    </div>
                                    <div className="review-panel-rating" data-reactid="17">65%
                                    </div>
                                    <img className="full-width screenshot_med embed-responsive-item" alt=""
                                        src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc68yr.jpg" />
                                </a>
                            </div>
                            <div className="col-sm-4" data-reactid="21">
                                <a href="/games/stranded-sails"
                                    className="review-panel review-panel-small review-panel-unimpressive embed-responsive embed-responsive-16by9">
                                    <div className="review-panel-caption" data-reactid="23">
                                        <p className="review-panel-title overflow-wrap" data-reactid="24">Stranded Sails</p>
                                        <p className="review-panel-genres" data-reactid="25">Adventure</p>
                                    </div>
                                    <div className="review-panel-rating" data-reactid="26">53%
                                    </div
                                    ><img className="full-width screenshot_med embed-responsive-item" alt=""
                                        src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc5shr.jpg" />
                                </a>
                            </div>
                        </div>
                        <div className="row" data-reactid="30"><div className="col-lg-8" data-reactid="31">
                            <a href="/games/little-big-workshop"
                                className="review-panel review-panel-small review-panel-great embed-responsive embed-responsive-16by9"
                                style={{"padding-bottom":"57%"}} data-reactid="32">
                                <div className="review-panel-caption" data-reactid="33">
                                    <p className="review-panel-title overflow-wrap" data-reactid="34">Little Big Workshop</p>
                                    <p className="review-panel-genres" data-reactid="35">Simulator</p>
                                </div>
                                <div className="review-panel-rating" data-reactid="36">80%
                                </div>
                                <img className="full-width screenshot_big embed-responsive-item" alt=""
                                    src="https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc77w1.jpg"/>
                            </a>
                        </div>
                            <div className="col-sm-6 col-lg-4" data-reactid="40">
                                <a href="/games/little-town-hero"
                                    className="review-panel review-panel-small review-panel-unimpressive embed-responsive embed-responsive-16by9"
                                    data-reactid="41">
                                    <div className="review-panel-caption" data-reactid="42">
                                        <p className="review-panel-title overflow-wrap" data-reactid="43">Little Town Hero</p>
                                        <p className="review-panel-genres" data-reactid="44">Role-playing (RPG)</p>
                                    </div>
                                    <div className="review-panel-rating" data-reactid="45">
                                        55%
                                </div>
                                    <img className="full-width screenshot_med embed-responsive-item" alt=""
                                        src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/sc6yz8.jpg" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-lg-4" data-reactid="49">
                                <a href="/games/monkey-king-hero-is-back"
                                    className="review-panel review-panel-small review-panel-unimpressive embed-responsive embed-responsive-16by9" data-reactid="50">
                                    <div className="review-panel-caption" data-reactid="51">
                                        <p className="review-panel-title overflow-wrap" data-reactid="52">Monkey King: Hero Is Back</p>
                                        <p className="review-panel-genres" data-reactid="53">Adventure</p>
                                    </div>
                                    <div className="review-panel-rating" data-reactid="54">57%
                                    </div>
                                    <img className="full-width screenshot_med embed-responsive-item" alt=""
                                        src="https://images.igdb.com/igdb/image/upload/t_screenshot_med/s2dodplbot2s1jukjy25.jpg"/>

                                </a>
                            </div>
                        </div>
                            <div className="row mar-lg-bottom" data-reactid="58">

                            </div>
                            <div className="row fix-heights">

                            </div>
                        </div>
                    </div> */}
            </div>
        );
    }
}

export default HomePage;