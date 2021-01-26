import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faImage, faShoppingBag, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import '../css/header.css';
import logo from '../assets/logo.png'
import HamburgerMenu from 'react-hamburger-menu';
import Menu from './Menu';
import AccountDropdown from './AccountDropdown';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
            open: !this.state.open
        });
    }

    closeMenu() {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div>
                <div className="header">
                    <Link to="/" onClick={this.closeMenu}>
                        <img className="logo" src={logo} alt="logo" />
                    </Link>
                    <ul>
                        <li>
                            <Link to="/prints"><FontAwesomeIcon className="icon" icon={faLayerGroup} />Prints</Link>
                        </li>
                        <li>
                            <Link to="/stickers"><FontAwesomeIcon className="icon" icon={faImage} />Stickers</Link>
                        </li>
                        <li>
                            <Link to="/merchandise"><FontAwesomeIcon className="icon" icon={faShoppingBag} />Merchandise</Link>
                        </li>
                        <li>
                            <Link to="/about"><FontAwesomeIcon className="icon" icon={faBookOpen} />About</Link>
                        </li>
                    </ul>
                    <HamburgerMenu className="menu-toggle" user={this.state.user} isOpen={this.state.open} menuClicked={this.toggleMenu} />
                </div>
                <div className="user-button">
                    <AccountDropdown />
                </div>
                {this.state.open && <Menu closeMenu={this.toggleMenu} />}
            </div>
        )
    }
}

export default Header;