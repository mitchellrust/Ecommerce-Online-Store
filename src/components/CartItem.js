import React from 'react';
import '../css/cart.css';
import { UserContext } from '../services/UserProvider';
import { updateUserCart, updateProductInventory } from '../services/db';

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.product.quantity,
            totalAvailable: this.props.product.inventory + this.props.product.quantity
        };

        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event) {
        const newQuantity = parseInt(event.target.value);
        let user = this.context;
        user.cart.items.forEach(item => {
            if (item.id === this.props.product.id) {
                item.quantity = newQuantity;
            }
        });
        await updateUserCart(user);
        const value = this.state.quantity - newQuantity;
        await updateProductInventory(this.props.product.id, value);
        this.setState({quantity: newQuantity});
    }

    render() {
        const quantityOptions = [];
        let i;
        for (i = 1; i <= this.state.totalAvailable; i++) {
            quantityOptions.push(<option key={i} quantity={i}>{i}</option>);
        }
        return (
            <li>
                <img className="thumbnail" src={this.props.product.imageUrl} alt="product thumbnail" />
                <div className="product-info">
                    <h2>{this.props.product.name}</h2>
                    <h4>${this.props.product.price}</h4>
                    <h4 className="quantity-text">Quantity</h4>
                    <select className="quantity-selector" value={this.state.quantity} onChange={this.handleChange}>
                        {quantityOptions}
                    </select>
                    <div className="spacer">
                        |
                    </div>
                    <div className="remove-button" onClick={() => {this.props.removeItem(this.props.product.id, this.state.quantity)}}>
                        Remove
                    </div>
                </div>
            </li>
        )
    }
}

CartItem.contextType = UserContext;

export default CartItem;