import React from 'react';
import Header from '../components/Header';
import { logout } from '../services/auth';
import '../css/main.css';

class Account extends React.Component {

    async handleClick() {
        await logout();
        console.log("DONE");
    }

    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    Account Page.
                    <div onClick={this.handleClick}>Logout</div>
                </div>
            </div>
        );
    }
}

export default Account;