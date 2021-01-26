import React from 'react';
import Header from '../components/Header';
import Products from '../components/Products';

class Stickers extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    <h1>Stickers</h1>
                    <Products type="sticker" />
                </div>
            </div>
        );
    }
}

export default Stickers;