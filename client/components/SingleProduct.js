import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct } from '../store/singleProduct';
import { addProduct } from '../store/CheckoutStore';
import { Link } from 'react-router-dom';
import { addItemThunk } from '../store/cart';

export class SingleProduct extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.addIt = this.addIt.bind(this);
	}
	addIt(product) {
		const newProductOrder = {
			productId: product.id,
			price: product.price,
		};
		this.props.addItem(this.props.currentUser.id, newProductOrder);
	}

	handleClick(product) {
		this.props.isLoggedIn ? this.addIt(product) : this.props.addToCart(product);
	}
	componentDidMount() {
		this.props.getSingleProduct(this.props.match.params.productId);
	}

	render() {
		const { singleProduct } = this.props;
		return (
			<div id="box">
				<div className="single-product-view">
					<div className="single-product-border">
						<h1>{singleProduct.name}</h1>
						<img className="products-image-size" src={singleProduct.image} />
						<h1 className="price">Price: ${singleProduct.price}</h1>
						<p> {singleProduct.description}</p>
						<h3>Alcohol By Volume: {singleProduct.ABV}%</h3>
						<h3>Alcohol Type: {singleProduct.alcoholType}</h3>
						<div>
							{singleProduct.stockAmount > 0 ? (
								<h1>In stock</h1>
							) : (
								<h1>Out of stock</h1>
							)}
						</div>
						<button
							disabled={singleProduct.stockAmount < 1}
							onClick={() => {
								this.handleClick(singleProduct);
							}}
						>
							<h1>add to cart</h1>
						</button>
					</div>
					<div className="back-to-all-products-link">
						<Link to={'/products'}>Back to All Products</Link>
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
		isLoggedIn: !!state.auth.id,
	};
	//have to return state as value to a key
};

const mapDispatch = (dispatch) => {
	return {
		getSingleProduct: (productId) => dispatch(getSingleProduct(productId)),
		addToCart: (product) => dispatch(addProduct(product)),
		addItem: (id, item) => dispatch(addItemThunk(id, item)),
	};
};

export default connect(mapState, mapDispatch)(SingleProduct);
