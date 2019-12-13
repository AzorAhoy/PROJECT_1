import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import logo from './logo.svg';
//import MultiSelect from "@kenshooui/react-multi-select";
import MultiSelect from "./Components/MultiSelect/MultiSelect";
//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './Containers/HomePage/HomePage';
import LoginPage from './Containers/LoginPage/LoginPage';
import RegisterPage from './Containers/RegisterPage/RegisterPage';
import AdminPage from './Containers/AdminPage/AdminPage';
import GamePage from './Containers/GamePage/GamePage';
import SearchPage from './Containers/SearchPage/SearchPage'
import axios from './axios';


class App extends Component {
    state = {
        username: '',
        id: '',
        role: 1,
        loggedIn: false
    }

    _onLogin = (username, password) => {
        axios.post("http://localhost:6900/api/auth/login",
            {
                username: username,
                password: password
            }
        ).then((response) => {
            if (response.data.success) {
                const role = response.data.user.role
                console.log(this.props)
                window.localStorage.setItem("access_token", response.data.access_token);
                this.setState({
                    username: response.data.user.username,
                    id: response.data.user.id,
                    role: response.data.user.role,
                    loggedIn: true
                });
                if (this.state.role == 0)
                    this.props.history.push("/admin");
                else
                    this.props.history.push("/");
            }
            else {
                alert(response.data.message);
            }
            console.log(response.data);
        })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {

        return (
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => {
                            return <HomePage {...props} />
                        }}
                    />
                    <Route
                        exact
                        path="/game/:id"
                        render={props => {
                            return <GamePage {...props} />
                        }}
                    />
                    <Route
                        exact
                        path="/search"
                        render={props => {
                            return <SearchPage {...props} />
                        }}
                    />
                    <Route
                        exact
                        path="/login"
                        render={props => {
                            return <LoginPage {...props} _onLogin={this._onLogin} />
                        }}
                    />
                    <Route
                        exact
                        path="/register"
                        render={props => {
                            return <RegisterPage {...props} />
                        }}
                    />
                    <Route
                        exact
                        path="/admin"
                        render={props => {
                            return <AdminPage {...props} />
                        }}
                    />
                </Switch>
            </div>

        );
    }
}

export default withRouter(App);
