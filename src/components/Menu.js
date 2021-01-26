import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faImage, faShoppingBag, faBookOpen, faUser, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import '../css/header.css';
import { UserContext } from '../services/UserProvider';

class Menu extends React.Component {
    constructor() {
        super();

        this.state = {
            showAccountOptions: false
        }

        this.toggleAccountOptions = this.toggleAccountOptions.bind(this);
    }

    toggleAccountOptions() {
        this.setState({showAccountOptions: !this.state.showAccountOptions});
    }

    render() {
        return (
            <div className={`menu ${this.state.showAccountOptions ? "extended" : ""}`}>
                <ul>
                        <li>
                            <Link to="/prints" onClick={this.props.closeMenu}><FontAwesomeIcon className="icon" icon={faLayerGroup} />Prints</Link>
                        </li>
                        <li>
                            <Link to="/stickers" onClick={this.props.closeMenu}><FontAwesomeIcon className="icon" icon={faImage} />Stickers</Link>
                        </li>
                        <li>
                            <Link to="/merchandise" onClick={this.props.closeMenu}><FontAwesomeIcon className="icon" icon={faShoppingBag} />Merchandise</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={this.props.closeMenu}><FontAwesomeIcon className="icon" icon={faBookOpen} />About</Link>
                        </li>
                        <li>
                            <UserContext.Consumer>
                                {user => {
                                    if (user) {
                                        let icon = <FontAwesomeIcon className="dropdown-icon" icon={faSortDown} />;
                                        if (this.state.showAccountOptions) {
                                            icon = <FontAwesomeIcon className="dropdown-icon" icon={faSortUp} />;
                                        }
                                        return (<div onClick={this.toggleAccountOptions}>Hello, {user.firstName}{icon}</div>);
                                    } else {
                                        return (<Link to="/login"><FontAwesomeIcon className="icon" icon={faUser} />Login / Sign Up</Link>);
                                    }
                                }}
                            </UserContext.Consumer>
                        </li>
                        {this.state.showAccountOptions
                            ? (
                                <div className="account-opts">
                                    <li className="account-opt">
                                        <Link to="/cart" onClick={this.props.closeMenu}>My Cart</Link>
                                    </li>
                                    <li className="account-opt">
                                        <Link to="/account" onClick={this.props.closeMenu}>My Account</Link>
                                    </li>
                                </div>
                            ) : (
                                null
                            )
                        }
                    </ul>
            </div>
        );
    }
}

export default Menu;