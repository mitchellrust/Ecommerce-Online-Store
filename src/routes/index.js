import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Home from '../pages/Home';
import Prints from '../pages/Prints';
import Stickers from '../pages/Stickers';
import Merchandise from '../pages/Merchandise';
import About from '../pages/About';
import ProductDetail from '../pages/ProductDetail';
import Account from '../pages/Account';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import AddProduct from '../pages/AddProduct';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/prints" component={Prints} />
            <Route path="/stickers" component={Stickers} />
            <Route path="/merchandise" component={Merchandise} />
            <Route path="/about" component={About} />
            <Route path="/product" component={ProductDetail} />
            <Route path="/account" component={Account} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route path="/addproduct" component={AddProduct} />
        </Switch>
    );
}

export default Routes;