import React, { Component } from 'react';
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../../Components/Header/Header';
import Rating from "../../Components/StarRating/Rating";
import Autocomplete from "../../Components/Autocomplete/Autocomplete"
import PercentageCircle from "../../Components/PercentageCircle/PercentageCircle";
import Slider from "../../Components/Slider/Slider";
import axios from '../../axios';

class GamePage extends Component {
    state = {
        user: "",
        tab1: "",
        tab2: "hide",
        tab3: "hide",
        title: "",
        developers: [],
        cover: "",
        genres: [],
        platforms: [],
        summary: "",
        loaded: false,
        official_site: null,
        steam: null,
        gog: null,
        itch: null,
        epic: null,
        wikia: null,
        wikipedia: null,
        facebook: null,
        twitter: null,
        instagram: null,
        youtube: null,
        twitch: null,
        screenshots: [],
        alt_names: [],
        release_dates: [],
        keywords: [],
        esrb: {},
        pegi: {},
        Rating: 0,
        gameid:""
    }

    getRating = (r) => {
        this.setState({
            Rating: r + 1
        })
        //return this.state.rating; 
    }

    getUser = (u) => {
        this.setState({
            user: u
        })
    }

    componentWillMount() {
        const id = "5db092c245d60247b48ae51e";
        this.setState({
            gameid: id
        })
        axios.get("http://localhost:6900/api/game/" + id)
            .then(data => {
                const info = data.data.data;
                console.log(data.data);
                this.setState({
                    loaded: true,
                    title: info.title,
                    developers: info.developers,
                    cover: info.cover,
                    genres: info.genres,
                    platforms: info.platforms,
                    summary: info.summary,
                    official_site: info.official_site,
                    steam: info.steam,
                    gog: info.gog,
                    itch: info.itch,
                    wikia: info.wikia,
                    wikipedia: info.wikipedia,
                    facebook: info.facebook,
                    twitter: info.twitter,
                    instagram: info.instagram,
                    youtube: info.youtube,
                    twitch: info.twitch,
                    epic: info.epic,
                    screenshots: info.screenshots,
                    alt_names: info.alt_names,
                    release_dates: info.release_dates,
                    keywords: info.keywords,
                    esrb: info.esrb,
                    pegi: info.pegi
                })
            })
    }

    handleTab = (event) => {
        const tabName = event.target.innerHTML
        console.log(event.target.innerHTML);
        if (tabName == "About") {
            this.setState({
                tab1: "",
                tab2: "hide",
                tab3: "hide"
            })
        }
        else if (tabName == "Add to") {
            this.setState({
                tab1: "hide",
                tab2: "",
                tab3: "hide"
            })
        }
        else if (tabName == "Share") {
            this.setState({
                tab1: "hide",
                tab2: "hide",
                tab3: ""
            })
        }
    }

    submit (event, rating) {
        const gameid = this.state.gameid;
        const pros = event.target.pros.value;
        const cons = event.target.cons.value;
        const review = event.target.review.value;
        const userid = this.state.user;
        event.preventDefault();
        console.log(event.target.review.value);
        console.log(event.target.pros.value);
        console.log(event.target.cons.value);
        console.log(rating);
        console.log(this.state.user);
        console.log(this.state.gameid);
        axios({
            url: 'http://localhost:6900/api/userreview',
            method: 'POST',
            data: {
                user: userid,
                game: gameid,
                review: review,
                pros: pros,
                cons: cons,
                rating: rating
            }
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
        //console.log(event.target.rating.value);
    }

    render() {
        console.log(this.state.Rating)
        //const genres = this.state.genres.join(',');
        //const platforms = this.state.platforms.join(',');
        if (!this.state.loaded) return "LOADING...";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const release_dates = new Date(this.state.release_dates[0].date).toLocaleDateString("en-US", options);
        const dates = this.state.release_dates.map((item, key) => {

            const date = new Date(item.date);
            const platform = item.platform
            console.log(date.toLocaleDateString("en-US", options) + "-" + platform);
            return (
                <div className="text-muted release-date" data-original-title="" title="">
                    <span itemProp="datePublished">
                        <time dateTime={date}>{date.toLocaleDateString("en-US", options)}</time>
                    </span> -
                    {platform}
                </div>)

        });
        const developers = this.state.developers.map((developer, key) => {
            return <p>{developer}</p>
        })
        const publishers = this.state.developers.map((publisher, key) => {
            return <p>{publisher}</p>
        })
        const genres = this.state.genres.map((genre, key) => {
            return <p>{genre}</p>
        })

        var esrb_logo="";
        console.log(this.state.esrb.rating)
        switch(this.state.esrb.rating) {
            case "RP":
                esrb_logo ="https://www.esrb.org/wp-content/uploads/2019/05/RP.svg";
            break;
            case "EC":
                esrb_logo ="https://en.wikipedia.org/wiki/File:ESRB_2013_Early_Childhood.svg";
            break;
            case "E":
                esrb_logo = "https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg";
                break;
            case "E10+":
                esrb_logo = "https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg";
                break;
            case "T":
                esrb_logo = "https://www.esrb.org/wp-content/uploads/2019/05/T.svg";
                break;  
            case "M":
                esrb_logo = "https://www.esrb.org/wp-content/uploads/2019/05/M.svg";
                break;  
            case "AO":
                esrb_logo = "https://www.esrb.org/wp-content/uploads/2019/05/AO.svg";
                break;  
        default:
            // code block
        }

        var pegi_logo = "";
        console.log(this.state.pegi.rating)
        switch (this.state.pegi.rating) {
            case 3:
                pegi_logo = "https://rating.pegi.info/images/games/age_threshold_icons/3.png";
                break;
            case 7:
                pegi_logo = "https://rating.pegi.info/images/games/age_threshold_icons/7.png";
                break;
            case 12:
                pegi_logo = "https://rating.pegi.info/images/games/age_threshold_icons/12.png";
                break;
            case 16:
                pegi_logo = "https://rating.pegi.info/images/games/age_threshold_icons/16.png";
                break;
            case 18:
                pegi_logo = "https://rating.pegi.info/images/games/age_threshold_icons/18.png";
                break;

            default:
            // code block
        }

        return (
            <div>
                <Header getUser={this.getUser}/>
                <div className="main-container center" id="main-contain">

                    <span id="twitch_acc_merge" className="if_logged_in"></span><br />
                    <div id="notices"></div>
                    <div className="content" id="content-page">
                        <div className="loaded">
                            <div className="gamepage-header" data-reactroot="" >
                                <div className="parallax-container" >
                                    <div className="parallax-background" ></div>
                                </div>
                                <div className="gamepage-header-info row" >
                                    <div className="gamepage-cover col-3">
                                        <img className="img-responsive cover_big" alt={this.state.title} src={this.state.cover} />
                                    </div>

                                    <div className="gamepage-summary col-5" >
                                        <div className="gamepage-title-container" style={{ "height": "266.6px" }}>
                                            <div className="gamepage-title-wrapper">
                                                <h1 className="banner-title">
                                                    {this.state.title}
                                                    <a className="btn btn-default btn-xs banner-title-button" href="/games/indivisible/edit">Edit</a>
                                                </h1>
                                                <h2 className="banner-subheading">
                                                    {release_dates}
                                                    <span >  23 days ago</span>
                                                </h2>
                                                <h3 className="banner-subsubheading">
                                                    {this.state.developers[0]}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="gamepage-tabs">
                                            <div className="compwnent-tabs">
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-light" onClick={this.handleTab}>About</button>
                                                    <button type="button" className="btn btn-light" onClick={this.handleTab}>Add to</button>
                                                    <button type="button" className="btn btn-light" onClick={this.handleTab}>Share</button>
                                                </div>

                                            </div>
                                            <div className={this.state.tab1}>
                                                <p>
                                                    <span className="text-semibold">
                                                        Genre:
                                                    </span>
                                                    {" " + this.state.genres.join(',')}
                                                </p>
                                                <p>
                                                    <span className="text-semibold">
                                                        Platforms:
                                                    </span>
                                                    {" " + this.state.platforms.join(',')}
                                                </p>
                                                <div className="">
                                                    {this.state.summary}
                                                </div>
                                                <br /><br />
                                                <div className="row fix-heights">
                                                    {/* <div className="col-sm-4 mar-lg-bottom">
                                                        <a href="https://store.steampowered.com/app/421170" target="_blank" rel="noopener noreferrer nofollow">
                                                            <img className="img-responsive " alt="" src="https://images.igdb.com/igdb/image/upload/t_original/steam_zstrel.png"/>
                                                        </a>
                                                    </div> */}
                                                </div>
                                                <div className="row">
                                                    {this.state.steam ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.steam} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Steam page</span>
                                                        </a> : null}
                                                    {this.state.facebook ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.facebook} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Facebook page</span>
                                                        </a> : null}
                                                    {this.state.twitter ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.twitter} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Twitter page</span>
                                                        </a> : null}
                                                    {this.state.youtube ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.youtube} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Youtube page</span>
                                                        </a> : null}
                                                    {this.state.official_site ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.official_site} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Offical page</span>
                                                        </a> : null}
                                                    {this.state.wikipedia ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.wikipedia} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Wikipedia page</span>
                                                        </a> : null}
                                                    {this.state.gog ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.gog} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>GOG page</span>
                                                        </a> : null}
                                                    {this.state.itch ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.itch} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Itch.io page</span>
                                                        </a> : null}
                                                    {this.state.epic ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.epic} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Epic Store page</span>
                                                        </a> : null}
                                                    {this.state.twitch ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.twitch} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Twitch page</span>
                                                        </a> : null}

                                                    {this.state.instagram ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.instagram} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Instagram page</span>
                                                        </a> : null}
                                                    {this.state.wikia ?
                                                        <a className="gamepage-website-link col-md-4"
                                                            href={this.state.wikia} target="_blank" rel="noopener noreferrer nofollow">
                                                            <span className="fa fa-facebook mar-md-right"></span>
                                                            <span>Wikia page</span>
                                                        </a> : null}
                                                </div>
                                            </div>
                                            <div className={this.state.tab2} data-reactid="80">
                                                <div className="row" data-reactid="81">
                                                    <div className="field-group col-md-4">
                                                        <input type="checkbox" className="checkbox" id="addto_list_59589" value="59589" />
                                                        <label className="inline-block">
                                                            <div className="gamepage-addtolist-label overflow-wrap">e4rr</div>
                                                        </label>
                                                    </div>
                                                </div>
                                                <br data-reactid="86" />
                                                <a href="/users/list/new?game_id=13555" className="btn btn-primary" data-reactid="87">
                                                    Create new list
                                                    </a>
                                            </div>
                                            <div className={this.state.tab3} data-reactid="88">
                                                <a className="btn mar-sm-right btn-facebook btn-sm" href="#" target="_parent" rel="noopener noreferrer nofollow" data-reactid="89">
                                                    <span className="fa fa-facebook fa-lg mar-md-right" data-reactid="90"></span>
                                                    facebook
                                                    </a>
                                                <a className="btn mar-sm-right btn-twitter btn-sm" href="https://twitter.com/intent/tweet?text=Indivisible on IGDB.com+https://www.igdb.com/g/agj" target="_parent" rel="noopener noreferrer nofollow" data-reactid="92">
                                                    <span className="fa fa-twitter fa-lg mar-md-right" data-reactid="93"></span>
                                                    tweet
                                                    </a>
                                                <a className="btn mar-sm-right btn-google-plus btn-sm" href="https://plus.google.com/share?url=https://www.igdb.com/g/agj" target="_blank" rel="noopener noreferrer nofollow" data-reactid="95">
                                                    <span className="fa fa-google-plus fa-lg mar-md-right" data-reactid="96"></span>
                                                    Google
                                                    </a>
                                                <br data-reactid="98" /><br data-reactid="99" />
                                                <div className="input-group" data-reactid="100">
                                                    <span className="input-group-addon" data-reactid="101">
                                                        <div className="fa fa-link" data-reactid="102"></div>
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"

                                                        onChange={null}
                                                        data-clipboard-text="https://www.igdb.com/g/agj"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gamepage-gauge col-2 container">
                                        <div className="row">
                                            <div className="row">
                                                <PercentageCircle score='56' size="small" className="col" />
                                                <div className="col gauge-single-info text-muted" style={{ "marginTop": "15%" }} data-reactid="117">Need more ratings</div>
                                            </div>

                                            <div className="row">
                                                <PercentageCircle score='56' size="small" />
                                                <div className="gauge-twin-info text-muted" data-reactid="118" style={{ "marginTop": "15%" }}>
                                                    Based on 10
                                                    <div className="text-semibold" data-reactid="121">
                                                        critic ratings
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr data-reactid="122" /><br data-reactid="123" />
                                        <div data-reactid="124">
                                            <strong className="block mar-md-bottom" data-reactid="125">How would you rate this game?</strong>
                                            <Rating getRating={this.getRating}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Slider images={this.state.screenshots} />
                        <div className="row relative">
                            <div className="gamepage-scrollspy-wrapper">
                                <div className="gamepage-scrollspy">
                                    <p>QUICK NAV</p>
                                    <p className="active">Member Reviews</p>
                                    <p className="">Recommendations</p>
                                    <p className="">Recently Visited</p>
                                    <p className="">Credits</p>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div
                                    className="row" data-load="/streams/extract?game=13555&amp;limit=3"
                                    data-loading="/assets/ajax-loading-response-86bb92c6295652dc51afc6ce33b0074683688bc10f44287f5622e650823f92b9.gif"
                                    id="game_streams"
                                ></div>
                                <div className="mar-lg-bottom" id="reviews-gamepage">
                                    <h3 className="underscratch underscratch-green" data-scrollspy="">
                                        <a className="text-muted" href="/games/indivisible/reviews"><span>Member Reviews</span></a>
                                    </h3>
                                    <div className="loaded">
                                        <form method="POST" onSubmit={event => this.submit(event, this.state.Rating)}>
                                            <div className="row mar-lg-bottom" data-reactid="2">
                                                <div className="col-md-offset-2 col-md-10" data-reactid="3">
                                                    <label data-reactid="4">Write a review</label>
                                                </div>
                                                <div className="col-md-2 mar-lg-bottom" data-reactid="5">
                                                    <p className="text-muted mar-lg-top" data-reactid="7">
                                                        This review must contain original content written by you.
                                                    </p>
                                                </div>
                                                <div className="col-md-10 " data-reactid="8">
                                                    <div className="form-group" data-reactid="9">
                                                        <textarea className="form-control" name="review"/>
                                                    </div>
                                                    <div className="row" data-reactid="11">
                                                        <div className="col-md-6" data-reactid="12">
                                                            <label data-reactid="13">Positive Points</label>
                                                            <textarea className="form-control" placeholder="Some things you liked..." name="pros" />
                                                            
                                                        </div>
                                                        <div className="col-md-6" data-reactid="15">
                                                            <label data-reactid="16">Negative Points</label>
                                                            <textarea className="form-control" placeholder="Some things you didn't..." name="cons" />
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="pull-right mar-lg-top" data-reactid="18">
                                                        <strong className="rating-stars-label" data-reactid="19">How would you rate it?</strong>
                                                        <Rating name = "rating" getRating={this.getRating}/>
                                                        <button className="pull-right mar-lg-left btn btn-sm btn-primary" type="submit">Post</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <hr />
                                </div>
                                <div className="clearfix"></div>
                                <div className="row member-review-game" data-reactid="42">
                                    <div className="col-xs-3 col-md-2" data-reactid="43">
                                        <div className="media" data-reactid="44">
                                            <div className="media-left" data-reactid="45">
                                                <a href="/users/stoltenberg" target="_self" data-reactid="46">
                                                    <img alt="Profile image" height="45" width="45" data-reactid="47" />
                                                </a>
                                            </div>
                                            <div className="media-body" data-reactid="48">
                                                <a href="/users/themarklv" target="_self" data-reactid="49">
                                                    Themarklv
                                                </a>
                                                <div className="text-muted" data-reactid="50">
                                                    6 reviews
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-10" data-reactid="53">
                                        <h2 className="nomar-top member-review-rating" data-reactid="54">
                                            <span data-reactid="55">
                                                Great
                                            <span
                                                    className="member-review-rating-word"
                                                    style={{ "WebkitFilter": "hue-rotate(-13deg)", "filter": "hue-rotate(-13deg)" }} data-reactid="58">
                                                    100%
                                            </span>
                                            </span>
                                            <small data-reactid="61">
                                                <time dateTime="U" data-reactid="62">December 22nd, 2018</time>
                                            </small>
                                        </h2>
                                        <div className="member-review-game-text" data-reactid="63">
                                            <div className="" data-reactid="64">
                                                THE LAST GAME IN ITS SERIES. but they're good. also, Matpat made a theory about it.
                                            </div>
                                            <div className="row" data-reactid="65">
                                                <br data-reactid="66" />
                                                <div className="col-sm-6" data-reactid="67">
                                                    <strong className="text-green" data-reactid="68">Positive points</strong>
                                                    <div className="" data-reactid="69">
                                                        The bittersweet good ending which is made by destroying and galime, and darkon.
                                                        </div>
                                                </div>
                                                <div className="col-sm-6" data-reactid="70">
                                                    <strong className="text-danger" data-reactid="71">Negative points</strong>
                                                    <div className="" data-reactid="72">uhh, I don't know what to say here.</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div data-reactid="73">
                                            <span className="text-semibold" data-reactid="74">Was this review...?</span>
                                            <button className="btn btn-default btn-sm member-review-game-button" data-reactid="75">
                                                <div className="material-icons" data-reactid="76">lightbulb_outline</div>
                                                Useful?
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <aside className="col-sm-3">
                                <div className="clearfix"></div>
                                <div className="loaded">
                                    <div className="mar-lg-bottom">
                                        <h3 className="underscratch underscratch-green mar-lg-bottom" data-scrollspy="">Game Critics Reviews</h3>
                                        <div>
                                            <a href="https://www.dualshockers.com/indivisible-review-ps4-pc-xbox-one-switch/" target="_blank"
                                                className="external-review-item external-review-item-superb ">
                                                <span>DualShockers</span>
                                                <div className="pull-right">95%</div>
                                                <div className="external-review-item-progress" style={{ "width": "95%" }}></div>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="https://www.godisageek.com/reviews/indivisible-review/" target="_blank"
                                                className="external-review-item external-review-item-superb ">
                                                <span>God is a Geek</span>
                                                <div className="pull-right">90%</div>
                                                <div className="external-review-item-progress" style={{ "width": "90%" }}></div>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="https://gamingbolt.com/indivisible-review-bending-genres" target="_blank"
                                                className="external-review-item external-review-item-great ">
                                                <span>Gamingbolt</span>
                                                <div className="pull-right">80%</div>
                                                <div className="external-review-item-progress" style={{ "width": "80%" }}></div>
                                            </a>
                                        </div>
                                        <div className="mar-md-top mar-lg-bottom">
                                            <a href="/games/indivisible/reviews" className="text-green cursor-pointer">
                                                Read all 10 critic reviews
                                                </a>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="underscratch underscratch-red">
                                    <span>Information</span>
                                </h3>
                                <div className="optimisly-game-maininfo">
                                    <label>Release Dates:</label>
                                    {dates}
                                    <label className="mar-lg-top">Developers:</label>
                                    {developers}
                                    <label className="mar-lg-top">Publishers:</label>
                                    {publishers}
                                </div>
                                <div className="optimisly-game-extrainfo1">
                                   
                                    <label className="mar-lg-top">Genre:</label>
                                    {genres}
                                </div>
                                <div className="optimisly-game-extrainfo2">
                                    <label className="mar-lg-top">Keywords:</label>
                                    <div className="loaded">
                                        <div data-reactroot="" className="">
                                            {this.state.keywords.join(",  ")}
                                            <span className="text-green cursor-pointer">Read More</span>
                                        </div>
                                    </div>

                                </div>
                                <div className="clearfix mar-lg-top">
                                    <h3 className="underscratch underscratch-blue pull-left nomar-top mar-lg-bottom">Time To Beat</h3>
                                    <div className="pull-right">
                                        <a className="btn btn-xs btn-default" data-target="#experience" data-toggle="modal" href="/games/indivisible/experiences/new">
                                            Submit
                                            </a>
                                    </div>
                                </div>
                                <table className="table-condensed">
                                    <tbody>
                                        <tr>
                                            <th>Hastily: </th>
                                            <td>0h 0min</td>
                                        </tr>
                                        <tr>
                                            <th>Normally: </th>
                                            <td>0h 0min</td>
                                        </tr>
                                        <tr>
                                            <th>Completely: </th>
                                            <td>0h 0min</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h3 className="underscratch underscratch-yellow">Age Rating</h3>
                                <span className="hide" itemProp="contentRating">ESRB {this.state.esrb.rating}</span>
                                <div>
                                    <span className="hide" itemProp="contentRating">ESRB {this.state.esrb.rating}</span>
                                    <img alt={`ESRB ${this.state.esrb.rating}`} title={`ESRB ${this.state.esrb.rating}`} width="60px" className="mar-md-right gamepage-rating-image"
                                        src={esrb_logo} />
                                </div>
                                <span className="hide" itemProp="contentRating">PEGI {this.state.pegi.rating}</span>
                                <div>
                                    <span className="hide" itemProp="contentRating">PEGI {this.state.pegi.rating}</span>
                                    <img alt={`PEGI ${this.state.pegi.rating}`} 
                                    title={`PEGI ${this.state.pegi.rating}`} width="60px" className="mar-md-right gamepage-rating-image"
                                        src={pegi_logo} />
                                </div>
                                <div className="clearfix mar-lg-bottom">
                                    <h3 className="underscratch underscratch-pink" data-scrollspy="" data-toggle="tab" href="#tabs-credits">
                                        <span>Credits</span>
                                    </h3>
                                    <p className="nomar">There is currently no information about this game's credits.
                                            <br /><a href="/games/indivisible/credits/edit">Click here</a> to start adding it.
                                        </p>
                                </div>
                                <h3 className="underscratch underscratch-red">Other</h3>
                                <a className="block" href="/games/indivisible/presskit" target="_blank">Presskit</a>
                                <a className="block" href="/games/indivisible/countdown" target="_blank">Countdown</a>
                                <a className="block" href="/games/indivisible/credits">End credits</a>
                                <a className="block" href="/games/indivisible/reviews">Reviews</a>
                                <a href="/games/indivisible/changes" rel="nofollow">Previous changes</a>
                                <br /><br />
                                <div className="sidebar-footer">
                                    <div>
                                        <a href="https://www.twitch.tv/p/legal/privacy-policy" rel="nofollow" target="_self">Privacy Notice</a>
                                        <span> - </span>
                                        <a href="https://www.twitch.tv/p/legal/terms-of-service/" rel="nofollow" target="_self">Terms</a>
                                        <span> - </span>
                                        <a href="/content-policy">Content Policy</a>
                                        <span> - </span>
                                        <a href="https://www.twitch.tv/p/legal/community-guidelines/" rel="nofollow" target="_self">Community Guidelines</a>
                                        <span> - </span>
                                        <a href="https://www.twitch.tv/p/legal/developer-agreement/" rel="nofollow" target="_self">Developer Terms</a>
                                        <span> - </span>
                                        <a href="/api" target="_self">API</a>
                                        <span> - </span>
                                        <a href="https://discord.gg/WvBNFRu" target="_blank">Discord</a>
                                    </div>
                                    <div className="text-muted">
                                        <span>IGDB is operated by </span>
                                        <a href="https://www.twitch.tv" target="_self">Twitch</a>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <br />
                        <div aria-hidden="true" aria-labelledby="experienceModal" className="modal fade" id="experience" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12"></div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default GamePage;