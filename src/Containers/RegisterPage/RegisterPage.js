import React, { Component } from 'react';
import axios from '../../axios';

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

class RegisterPage extends Component {
    state = {
        match: true,
        valid: true
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        const email = target.email.value;
        const username = target.username.value;
        const password = target.password.value;
        const password2 = target.password2.value;
        const avatar = target.avatar.value;
        let validurl = (avatar=="")? true: validURL(avatar);
        this.setState({
            match: password === password2 ? true : false,
            valid: validurl
        })
        const data = {
            email,
            username,
            password,
            avatar,
            role: 1
        }
        if (this.state.match && this.state.valid) {
            axios({
                url: "http://localhost:6900/api/user",
                method: "POST",
                data
            })
                .then((response) => {
                    console.log(response);
                    //response.redirect("/login");
                    window.location.href = "/login";
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        console.log(data);
    }    

    render() {
        return (
            <div>
                <div className="col-6 offset-3 my-5 p-5">
                    <h3 className="text-secondary bold">Register</h3>
                    <form onSubmit={this.handleSubmit} className="border border-secondary rounded p-5">
                        <div className="form-group">
                            Email:
                            <input className="form-control" name="email" placeholder="email" type="email" required />
                        </div>
                        <div className="form-group">
                            Username:
                            <input className="form-control" name="username" placeholder="username" id="uid" required />
                        </div>
                        <div className="form-group">
                            Password: <input className="form-control" type="password" name="password" placeholder="password" id="pass" minLength="6" required />
                        </div>
                        <div className="form-group">
                            Re-Password: <input className="form-control" type="password" name="password2" placeholder="re" minLength="6" required />
                        </div>
                        {!this.state.match ? <p className="text-danger">Mật khẩu không khớp</p> : null}
                        <div className="form-group">
                            Avatar: <input className="form-control" name="avatar" placeholder="Link to avatar here"/>
                        </div>
                        {!this.state.valid ? <p className="text-danger">URL không đúng</p> : null}
                        <input className="form-control btn-secondary" type="submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;