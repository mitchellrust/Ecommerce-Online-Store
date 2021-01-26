import React from 'react';
import Header from '../components/Header';
import Products from '../components/Products';

class Merch extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    <h1>Merchandise</h1>
                    <Products type="merchandise" />
                </div>
            </div>
        );
    }
}

export default Merch;