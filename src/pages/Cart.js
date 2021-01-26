import React from 'react';
import Header from '../components/Header';
import '../css/cart.css';
import CartItem from '../components/CartItem';
import { getProductsByID, updateProductInventory } from '../services/db';
import { UserContext } from '../services/UserProvider';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import CartTimer from '../components/CartTimer';
import { updateUserCart } from '../services/db';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            items: [],
            expiryDate: 0
        };

        this.removeItem = this.removeItem.bind(this);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async componentDidMount() {
        let user = this.context;
        let idList = [];
        user.cart.items.forEach(item => idList.push(item.id));
        if (idList.length === 0) {
            return await this.setStateAsync({items: [], loading: false});
        }
        const res = await getProductsByID(idList);
        let items = res.map(item => {
            let qty = 0;
            user.cart.items.forEach(cItem => {
                if (cItem.id === item.id) {
                    qty = cItem.quantity;
                }
            });
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                inventory: item.inventory,
                quantity: qty
            }
        });
        await this.setStateAsync({items, expiryDate: user.cart.timestamp, loading: false});
    }

    async removeItem(id, quantity) {
        let user = this.context;
        user.cart.items = user.cart.items.filter(item => item.id !== id);
        await updateUserCart(user);
        await updateProductInventory(id, quantity);
        const items = this.state.items.filter(item => item.id !== id);
        await this.setStateAsync({items});
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
        }
        
        const cartItems = this.state.items.map(item => {return (<CartItem key={item.id} product={item} removeItem={this.removeItem} />)});
        return (
            <div>
                <Header />
                <div className="content cart">
                    <h1>My Cart</h1>
                    {
                        this.state.items.length === 0
                        ? (
                            <div>There are no items in your cart.</div>
                        ) : (
                            <div>
                                <CartTimer expiryDate={this.state.expiryDate} />
                                <ul>
                                    {cartItems}
                                </ul>
                            </div>
                        ) 
                    }
                </div>
            </div>
        );
    }
}

Cart.contextType = UserContext;

export default Cart;