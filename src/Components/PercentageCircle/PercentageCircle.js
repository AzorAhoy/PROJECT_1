import React, { Component } from 'react';
import "./style.css";

class PercentageCircle extends Component {
    state = {
        score: 0,
        size: '',
        color: '',
        className: ""
    };

    componentWillMount() {
        this.setState({
            score: this.props.score ? this.props.score : 0,
            size: this.props.size ? this.props.size : '',
            color: this.props.color ? this.props.color: "green",
            className: `c100 p${this.props.score} big`
        })
    }

    render() {
        return (
            <div className="page">
                <div className={`c100 p${this.state.score} ${this.state.size} ${this.state.color}`}>
                    <span>{this.state.score}%</span>
                    <div className="slice">
                        <div className="bar"></div>
                        <div className="fill"></div>
                    </div>
                </div>
                {/* <h1>Pure CSS Percentage Circle - circle100</h1>
                <div className="clearfix">

                    <div className="c100 p50 big">
                        <span>50%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                    <div className="c100 p25">
                        <span>25%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                    <div className="c100 p12 small">
                        <span>12%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                </div>

                <div className="clearfix">

                    <div className="c100 p50 big green">
                        <span>50%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                    <div className="c100 p25 green">
                        <span>25%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                    <div className="c100 p12 small green">
                        <span>12%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                </div>

                <div className="clearfix">

                    <div className="c100 p50 big orange">
                        <span>50%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                    <div className="c100 p25 orange">
                        <span>25%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                    <div className="c100 p12 small orange">
                        <span>12%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>

                </div>





                <div className="dark-area clearfix">


                    <div className="clearfix">

                        <div className="c100 p50 big dark">
                            <span>50%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                        <div className="c100 p25 dark">
                            <span>25%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                        <div className="c100 p12 small dark">
                            <span>12%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                    </div>

                    <div className="clearfix">

                        <div className="c100 p50 big dark green">
                            <span>50%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                        <div className="c100 p25 dark green">
                            <span>25%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                        <div className="c100 p12 dark small green">
                            <span>12%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                    </div>

                    <div className="clearfix">

                        <div className="c100 p50 dark big orange">
                            <span>50%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                        <div className="c100 p25 dark orange">
                            <span>25%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                        <div className="c100 p12 dark small orange">
                            <span>12%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>

                    </div>

                </div>

                <small>Andre Firchow | <a href="http://firchow.net">Blog</a></small> */}

            </div>
        );
    }
}

export default PercentageCircle;