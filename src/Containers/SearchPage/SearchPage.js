import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../../Components/Header/Header';
import axios from '../../axios';
import "./style.css";

class SearchPage extends Component {
    state = {
        resultList: [],
        count: 0
    }

    search = (event) => {
        event.preventDefault();
        var search = event.target.search.value;
        console.log(search);
        axios.get("http://localhost:6900/api/game/search=" + search)
            .then(data => {
                const info = data.data.data;
                console.log(data.data.data);
                this.setState({
                    resultList: info,
                    count: info.length,
                    search: search
                })
            });
    }

    handleChange = (event) => {
        //event.preventDefault();
        console.log(event.target.value);
    }

    render() {
        let results = this.state.resultList.map((item, index) => {
            var release_date;
            var year;
            if (item.release_dates.length > 0) {
                release_date = new Date(item.release_dates[0].date);
                year = release_date.getFullYear
                console.log(release_date);
            }

            return (
                <div className="game-result" id={index} data-original-title="Grand Theft Auto" key={index}>
                    <div className="media overflow relative">
                        <div className="media-left">
                            <a href={`/game/${item._id}`}>
                                <img
                                    src={item.cover}
                                    alt={item.title} />
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">
                                <a href={`/game/${item._id}`}>
                                    <span>{item.title}</span>
                                </a>
                                <small className="game-shortdate text-muted">
                                    <span>{year? (year): null}</span>
                                </small>
                            </h4>
                        </div>
                    </div>
                </div>
            );
        })

        return (
            <div>
                <Header />
                <div className="input-group" id="headerSearchRevealed">
                    <form onSubmit={this.search}>
                        <div className="form-group">
                            <input name="search" id="search" className="form-control" onChange={this.handleChange} />
                        </div>


                        <button className="btn btn-default form-control" type="submit">
                            SEARCH
                            </button>
                    </form>

                </div>
                <div className="main-container center" id="main-contain">

                    <span id="twitch_acc_merge" className="if_logged_in"></span>
                    <div id="notices"></div>
                    <div className="content" id="content-page"><br />
                        <div className="sorting-area nopad">
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="nav nav-pills nav-pills-search">
                                        <li className="active">
                                            <a data-type="1" href="/search?utf8=✓&amp;type=1&amp;q=gta">
                                                Video Games
                                            </a>
                                        </li>
                                        <li>
                                            <a data-type="3" href="/search?utf8=✓&amp;type=3&amp;q=gta">
                                                Companies
                                            </a>
                                        </li>
                                        <li>
                                            <a data-type="2" href="/search?utf8=✓&amp;type=2&amp;q=gta">
                                                People
                                            </a>
                                        </li>
                                        <li>
                                            <a data-type="4" href="/search?utf8=✓&amp;type=4&amp;q=gta">
                                                Characters
                                            </a>
                                        </li>
                                        <li>
                                            <a data-type="6" href="/search?utf8=✓&amp;type=6&amp;q=gta">
                                                Pages
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-6">
                                    <div className="sorting-methods mar-md-top">
                                        <a className="label label-default label-primary" id="results-listBtn">
                                            <span className="fa fa-th-list active"></span>
                                        </a>
                                        <a className="label label-default" id="results-coverBtn">
                                            <span className="fa fa-th"></span>
                                        </a>
                                        <a className="label label-primary" href="/search?q=gta&amp;sort=1&amp;type=1" rel="nofollow">
                                            Relevance
                                        </a>
                                        <a className="label label-default" href="/search?desc=1&amp;q=gta&amp;sort=2&amp;type=1" rel="nofollow">
                                            Title
                                        </a>
                                        <a className="label label-default" href="/search?desc=1&amp;q=gta&amp;sort=3" rel="nofollow">
                                            Release date
                                        </a>
                                        <a className="label label-default" href="/search?desc=1&amp;q=gta&amp;sort=4" rel="nofollow">
                                            Rating
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mar-md-bottom text-muted">{this.state.count} results for "{this.state.search}"</p>
                        <div className="block" data-sort="0" id="search-results">
                            
                            {results ? results : <p>No result</p>}
                            <div className="pagination">
                                <span>&laquo;</span>
                                <span className="active">1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>&raquo;</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPage;