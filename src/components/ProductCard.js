import React from 'react';
import { Link } from "react-router-dom";
import '../css/products.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
`;

class ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = { imageLoading: true };

        this.imageLoaded = this.imageLoaded.bind(this);
    }

    imageLoaded() {
        this.setState({ imageLoading: false });
    }

    render() {
        const params = "?id=" + this.props.product.id;
         return (
            <div className="product-card">
                <Link to={{
                    pathname: "/product",
                    search: params
                }}>
                    {
                        this.props.product.inventory <= 0
                        ?
                        <div className="oos-overlay"></div>
                        :
                        null
                    }
                    {
                        this.state.imageLoading
                        ? (
                            <div className="thumbnail-placeholder">
                                <ClipLoader
                                    className="loader"
                                    css={override}
                                    size={100}
                                    color={"#ff5e6c"}
                                    loading={this.state.imageLoading}
                                />
                            </div>
                        ) : ( null )
                    }
                    <img className="thumbnail" src={this.props.product.imageUrl} onLoad={this.imageLoaded} alt="product thumbnail" />
                    <div className="info">
                        <h3>{this.props.product.name}</h3>
                        <h4>${this.props.product.price}</h4>
                        {
                            this.props.product.inventory <= 0
                            ?
                            <h4 className="oos-text">Out Of Stock</h4>
                            :
                            null
                        }
                    </div>
                </Link>
            </div>
        );
    }
}

export default ProductCard;