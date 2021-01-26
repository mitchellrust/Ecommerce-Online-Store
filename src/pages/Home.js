import React from 'react';
import Products from '../components/Products';
import '../css/main.css';
import Header from '../components/Header';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    <Products type="all" />
                </div>
            </div>
        );
    }
}

export default Home;