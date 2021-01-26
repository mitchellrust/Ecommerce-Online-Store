import React from 'react';
import Header from '../components/Header';
import { Link } from "react-router-dom";
import '../css/main.css';
import { Redirect } from 'react-router-dom';
import { signUp } from '../services/auth';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            loggedIn: false
        }
    
        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.confirmPasswordChange = this.confirmPasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    firstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    lastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    emailChange(event) {
        this.setState({email: event.target.value});
    }
    
    passwordChange(event) {
        this.setState({password: event.target.value});
    }

    confirmPasswordChange(event) {
        this.setState({confirmPassword: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "") {
            alert("All fields are required.");
            return;
        } else if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords did not match. Please try again.");
            return;
        } else if (this.state.password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        } else {
            const err = await signUp(this.state.email, this.state.password, this.state.firstName, this.state.lastName);
            if (err) {
                alert(err.message);
                return;
            }
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
                        <h1>Sign Up</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <h3>First Name</h3>
                                <input type="text" name="firstName" value={this.state.firstName} onChange={this.firstNameChange} />
                            </label>
                            <label>
                                <h3>Last Name</h3>
                                <input type="text" name="lastName" value={this.state.lastName} onChange={this.lastNameChange} />
                            </label>
                            <label>
                                <h3>Email</h3>
                                <input type="email" name="email" value={this.state.email} onChange={this.emailChange} />
                            </label>
                            <label>
                            <h3>Password</h3>
                                <input type="password" name="password" value={this.state.password} onChange={this.passwordChange} />
                            </label>
                            <label>
                                <h3>Confirm Password</h3>
                                <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.confirmPasswordChange} />
                            </label>
                            <input className="auth-button" type="submit" value="Sign Up" />
                        </form>
                        <h5>Already have an account? <Link to="/login">Login</Link>.</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;