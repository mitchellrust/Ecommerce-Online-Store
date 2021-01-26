import React from 'react';
import { UserContext } from '../services/UserProvider';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';

class AccountDropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            showDropdown: false,
            showLogin: false
        }

        this.showDropdown = this.showDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    showDropdown(event) {
        event.preventDefault();
        this.setState({ showDropdown: true }, () => {
            document.addEventListener('click', this.closeDropdown);
        });
    }

    closeDropdown(event) {
        if (this.dropdown && !this.dropdown.contains(event.target)) {
            this.setState({ showDropdown: false }, () => {
                document.removeEventListener('click', this.closeDropdown);
            });
        }
    }

    goToLogin() {
        this.setState({ showLogin: true });
    }

    render() {
        let location = window.location.pathname;
        if (location === "/login" || location === "signup") {
            return (<div className="dropdown"><div className="dropdown-header" onClick={this.goToLogin}><Link to="/login"><FontAwesomeIcon className="icon" icon={faUser} />Login / Sign Up</Link></div></div>);
        }
        if (this.state.showLogin) {
            return (
                <Redirect to="/login" />
            );
        }
         return (
            <div className="dropdown">
                 <UserContext.Consumer>
                    {user => {
                        if (user) {
                            let icon = <FontAwesomeIcon className="icon" icon={faSortDown} />;
                            if (this.state.showDropdown) {
                                icon = <FontAwesomeIcon className="icon" icon={faSortUp} />;
                            }
                            return (<div className="dropdown-header" onClick={this.showDropdown}>Hello, {user.firstName}{icon}</div>);
                        } else {
                            return (<div className="dropdown-header" onClick={this.goToLogin}><Link to="/login"><FontAwesomeIcon className="icon" icon={faUser} />Login / Sign Up</Link></div>);
                        }
                    }}
                </UserContext.Consumer>
                {
                    this.state.showDropdown
                        ? (
                            <ul className="dropdown-items" ref={(element) => {
                                this.dropdown = element;
                            }}>
                                <li className="dropdown-item">
                                    <Link to="/cart" onClick={this.props.closeMenu}>My Cart</Link>
                                </li>
                                <li className="dropdown-item">
                                    <Link to="/account" onClick={this.props.closeMenu}>My Account</Link>
                                </li>
                                <UserContext.Consumer>
                                    {user => {
                                        if (user.role === "admin") {
                                            return (
                                                <li className="dropdown-item">
                                                    <Link to="/addproduct" onClick={this.props.closeMenu}>Add A Product</Link>
                                                </li>
                                            );
                                        }
                                    }}
                                </UserContext.Consumer>
                            </ul>
                        ) : (
                            null
                        )
                }
            </div>
        );
    }
}

export default AccountDropdown;