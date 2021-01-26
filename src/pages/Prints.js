import React from 'react';
import Header from '../components/Header';
import Products from '../components/Products';

class Prints extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    <h1>Prints</h1>
                    <Products type="print" />
                </div>
            </div>
        );
    }
}

export default Prints;