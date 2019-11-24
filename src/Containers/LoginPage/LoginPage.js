import React, { Component } from 'react';
//import RegisterPage from '../RegisterPage/RegisterPage'

class LoginPage extends Component {
    state = {
        username: '',
        password: '',
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props._onLogin(this.state.username, this.state.password);
    }

    render() {
        return (
            <div>
                <div className="col-6 offset-3 my-5 p-5">
                    <h3 className="text-secondary bold">Login</h3>
                    <form onSubmit={this.handleSubmit} className="border boder-secondary p-5 rounded">
                        <div className="form-group">
                            <input required onChange={this.handleInputChange} className="form-control" name="username" type="text" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <input required onChange={this.handleInputChange} className="form-control" name="password" type="password" placeholder="password" />
                        </div>
                        <div className="form-group text-right font-weight-light">
                            <a href='/register' className="text-secondary">Bạn Chưa Có Tài Khoản?</a>
                        </div>

                        <div className="form-group text-center ">
                            <input className="form-control btn-secondary" value="Login" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;