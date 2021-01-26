import React from 'react';
import Header from '../components/Header';
import { addImage, addProduct } from '../services/db';
import '../css/main.css';

class AddProduct extends React.Component {
    constructor() {
        super();

        this.state = {
            uploading: false,
            name: "",
            price: "",
            inventory: "",
            type: "print",
            image: ""
        }

        this.nameChange = this.nameChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.inventoryChange = this.inventoryChange.bind(this);
        this.typeChange = this.typeChange.bind(this);
        this.imageChange = this.imageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    nameChange(event) {
        this.setState({name: event.target.value});
    }

    priceChange(event) {
        this.setState({price: event.target.value});
    }
    
    inventoryChange(event) {
        this.setState({inventory: event.target.value});
    }

    typeChange(event) {
        this.setState({type: event.target.value});
    }

    imageChange(event) {
        let file = event.target.files[0];
        let img = new Image();
        img.reactClass = this;
        img.reactTarget = event.target;
        const objectUrl = URL.createObjectURL(file);
        img.onload = function() {
            if (this.width === 600 && this.height === 600) {
                this.reactClass.setState({image: file});
            } else {
                alert("Uploaded image must have 600px by 600px dimensions.");
                this.reactTarget.value = null;
            }
        };
        img.src = objectUrl;
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ uploading: true });
        const imageUrl = await addImage(this.state.image);
        let price = parseFloat(this.state.price);
        const product = {
            name: this.state.name,
            price: price,
            inventory: this.state.inventory,
            type: this.state.type,
            imageUrl
        };
        await addProduct(product);
        this.setState({uploading: false});
    }

    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    <div className="add-product-form">
                        <h1>Add Product</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <h3>Product Name</h3>
                                <input type="text" required name="name" value={this.state.name} onChange={this.nameChange} />
                            </label>
                            <label>
                                <h3>Price</h3>
                                <input type="number" required min="0.01" step="0.01" max="2500" name="price" value={this.state.price} onChange={this.priceChange} />
                            </label>
                            <label>
                                <h3>Inventory</h3>
                                <input type="number" required name="inventory" value={this.state.inventory} onChange={this.inventoryChange} />
                            </label>
                            <label>
                                <h3>Type</h3>
                                <select className="type-selector" value={this.state.type} onChange={this.typeChange}>
                                    <option value="print">Print</option>
                                    <option value="sticker">Sticker</option>
                                    <option value="merchandise">Merchandise</option>
                                    <option value="other">Other</option>
                                </select>
                            </label>
                            <label>
                                <h3>Upload Image</h3>
                                <input type='file' required id='image' onChange={this.imageChange} />
                                <h5>Image must be 600 x 600.</h5>
                            </label>
                            <input className="submit-button" type="submit" value="Add Product" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProduct;