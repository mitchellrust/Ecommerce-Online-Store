import React from 'react';
import Header from '../components/Header';
import { Link } from "react-router-dom";
import '../css/main.css';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../services/auth';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            email: "",
            password: ""
        }
    
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    emailChange(event) {
        this.setState({email: event.target.value});
    }
    
    passwordChange(event) {
        this.setState({password: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const res = await loginUser(this.state);
        if (res.code !== undefined) {
            if (res.code === "auth/user-not-found") {
                alert("Incorrect email or password.");
                return;
            } else if (res.code === "auth/user-disabled") {
                alert("Your account has been disabled. Please try again later.");
                return;
            } else if (res.code === "auth/wrong-password") {
                alert("Incorrect email or password.");
                return;
            } else if (res.code === "auth/invalid-email") {
                alert("Incorrect email or password.");
                return;
            }
        } else {
            this.setState({loggedIn: true});
        }
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <Redirect to="/" />
            );
            
        }
        return (
            <div>
                <Header />
                <div className="content">
                    <div className="auth-form">
                    <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <h3>Email</h3>
                                <input type="email" name="email" value={this.state.email} onChange={this.emailChange} />
                            </label>
                            <label>
                            <h3>Password</h3>
                                <input type="password" name="password" value={this.state.password} onChange={this.passwordChange} />
                            </label>
                            <input className="auth-button" type="submit" value="Login" />
                        </form>
                        <h5>Don't have an account? <Link to="/signup">Sign Up</Link>.</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;