import React from 'react';
import '../css/products.css';
import ProductCard from './ProductCard';
import { getProducts } from '../services/db';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async componentDidMount() {
        const res = await getProducts(this.props.type);
        await this.setStateAsync({products: res});
    }

    render() {
        const productCards = this.state.products.map(product => {return (<ProductCard  key={product.id} product={product} />)});
         return (
            <div className="products-grid">
                {productCards}
            </div>
        );
    }
}

export default Products;