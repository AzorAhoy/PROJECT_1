import React, { Component } from 'react';
import Autocomplete from "../Autocomplete/Autocomplete";
import axios from '../../axios';
import "./style.css";

class Header extends Component {
    state = {
        isOpen: false,
        username: '',
        id: '',
        suggestions: [
            "Alligator",
            "Bask",
            "Crocodilian",
            "Death Roll",
            "Eggs",
            "Jaws",
            "Reptile",
            "Solitary",
            "Tail",
            "Wetlands"
        ]
    };

    componentDidMount() {
        // Check login


        const access_token = window.localStorage.getItem("access_token");
        axios.get("http://localhost:6900/api/auth/check?access_token=" + access_token)
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    this.setState({
                        username: response.data.user.username,
                        id: response.data.user.id
                    });
                    //em them dong duoi vao
                    this.props.getUser(response.data.user.id);
                } else {
                    //this.props.history.push("/login");
                }

            }).catch(error => {

            });
        const tmp = this.state.suggestions;
        this.setState({
            suggestions: this.props.suggestions || tmp
        })
    }    

    logout = (event) => {
        localStorage.removeItem("access_token");
        window.location.href = "/";
    }

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });
    render() {
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark" >
                    <div className="">
                        <a className="navbar-brand" href="#">
                            <p>VIDEO GAME</p>
                        </a> 
                    </div>
                    <button className="navbar-toggler" type="button" datatoggle="collapse" datatarget="#navbarTogglerDemo02" ariacontrols="navbarTogglerDemo02" ariaexpanded="false" arialabel="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <Autocomplete
                            suggestions={this.state.suggestions}
                        />

                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div className={menuClass} aria-labelledby="dropdownMenuButton1">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div className={menuClass} aria-labelledby="dropdownMenuButton2">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    {this.state.id ?
                        <div className="text-white">
                            <span>welcome, {this.state.username}</span>
                            <a className="nav-link" onClick={this.logout}>
                                Logout<span>(current)</span></a>
                        </div>
                        :
                        <a className="nav-link  text-light" href="/login">Tài Khoản <span className="sr-only">(current)</span></a>
                    }
                </nav>
            </div>
        );
    }
}

export default Header;