import React from 'react';
import Header from '../components/Header';
import '../css/products.css';
import '../css/main.css';
import QueryString from 'query-string';
import { getProduct, updateUserCart, updateProductInventory } from '../services/db';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { UserContext } from '../services/UserProvider';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: QueryString.parse(props.location.search).id,
            quantity: 1,
            addedToCart: false
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async componentDidMount() {
        const res = await getProduct(this.state.id);
        await this.setStateAsync({loading: false, product: res});
    }

    handleChange(event) {
        this.setState({quantity: parseInt(event.target.value), addedToCart: false});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let user = this.context;
        let exists = false;
        user.cart.items.forEach(item => {
            if (item.id === this.state.id) {
                exists = true;
                item.quantity += this.state.quantity;
            }
        });
        if (!exists) {
            user.cart.items.push({id: this.state.id, quantity: this.state.quantity});
            user.cart.timestamp = new Date().getTime() + 86400000; // Add 24 hours for cart reservation
        }
        await updateUserCart(user);
        const value = this.state.quantity - (2 * this.state.quantity);
        await updateProductInventory(this.state.id, value);
        this.setState({addedToCart: true});
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Header />
                    <BounceLoader
                        className="loader"
                        css={override}
                        size={80}
                        color={"#ff5e6c"}
                        loading={this.state.loading}
                    />
                </div>
            );
        } else {
            const quantityOptions = [];
            if (this.state.product.inventory <= 0) {
                quantityOptions.push(<option key={0} quantity={0}>{0}</option>);
            } else {
                let i;
                for (i = 1; i <= this.state.product.inventory; i++) {
                    quantityOptions.push(<option key={i} quantity={i}>{i}</option>);
                }
            }
            return (
                <div>
                    <Header />
                    <div className="content">
                        <div className="product-detail">
                            <img className="thumbnail" src={this.state.product.imageUrl} alt="product thumbnail" />
                            <div className="detail-info">
                                <h1 className="title">{this.state.product.name}</h1>
                                <h2>${this.state.product.price}</h2>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        <h5>Quantity</h5>
                                        {
                                            this.state.product.inventory <= 0
                                            ? (
                                                <select disabled className="quantity-selector" value={this.state.quantity} onChange={this.handleChange}>
                                                    {quantityOptions}
                                                </select>
                                            ) : (
                                                <select className="quantity-selector" value={this.state.quantity} onChange={this.handleChange}>
                                                    {quantityOptions}
                                                </select>
                                            )
                                        }
                                    </label>
                                    {
                                        this.state.addedToCart
                                        ? (
                                            <input disabled={this.state.addedToCart} className="buy-button added" type="submit" value="Added To Cart" />
                                        ) : (
                                            this.state.product.inventory <= 0
                                            ? (
                                                <input disabled={this.state.addedToCart} className="buy-button oos" type="submit" value="Out Of Stock" />
                                            ) : (
                                                <input className="buy-button" type="submit" value="Add To Cart" />
                                            )
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

ProductDetail.contextType = UserContext;

export default ProductDetail;