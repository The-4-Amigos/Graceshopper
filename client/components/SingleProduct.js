import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct } from '../store/singleProduct';
import { addProduct } from "../store/CheckoutStore";

export class SingleProduct extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     qty: 1,
  //   };
  // }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId);
  }


  render() {
    const { singleProduct, addToCart  } = this.props;
    return (
      <div>
        <div>
          <div className="single-product-border">
            <h1>{singleProduct.name}</h1>
            <img className="products-image-size" src={singleProduct.image} />
            <h1>Price: ${singleProduct.price}</h1>
            <p>Description: {singleProduct.description}</p>
            <h3>ABV: {singleProduct.ABV}%</h3>
            <h3>Category: {singleProduct.alcoholType}</h3>
            <div>
              {singleProduct.stockAmount > 0 ? (
                <h1>In stock</h1>
              ) : (
                <h1>Out of stock</h1>
              )}
            </div>
            <button onClick={() => {addToCart(singleProduct)}}>
              <h1>add to cart</h1>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
	return {
		singleProduct: state.singleProductReducer,
		cart: state.guestCart,
		currentUser: state.currentUser,
	};
	//have to return state as value to a key
};

const mapDispatch = (dispatch) => {
	return {
		getSingleProduct: (productId) => dispatch(getSingleProduct(productId)),
    addToCart: (product) => dispatch(addProduct(product)),
	};
};

export default connect(mapState, mapDispatch)(SingleProduct);
