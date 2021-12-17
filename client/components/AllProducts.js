import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { addProduct } from '../store/CheckoutStore';
import { addItemThunk } from '../store/cart';
import Select from 'react-select';

class AllProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'all',
		};
		this.handleClick = this.handleClick.bind(this);
		this.addIt = this.addIt.bind(this);
		this.handleSelected = this.handleSelected.bind(this);
	}

	handleSelected(selectedOption) {
		this.setState({ value: selectedOption });
	}

	addIt(product) {
		const newProductOrder = {
			productId: product.id,
			price: product.price,
		};
		this.props.addItem(this.props.currentUser.id, newProductOrder);
	}

	handleClick(product) {
		this.props.isLoggedIn
			? this.addIt(product)
			: this.props.addToCart(product, product.qty);
	}
	componentDidMount() {
		this.props.getProducts();
	}

	render() {
		const options = [
			{ value: 'all', label: 'All' },
			{ value: 'wine', label: 'Wine' },
			{ value: 'rum', label: 'Rum' },
			{ value: 'whiskey', label: 'Whiskey' },
			{ value: 'tequila', label: 'Tequila' },
		];
		const { value } = this.state.value;
		const products = this.props.products.filter((product) => {
			if (value === 'all' || this.state.value === 'all') return product;
			if (value === 'wine') return product.alcoholType === 'wine';
			if (value === 'rum') return product.alcoholType === 'rum';
			if (value === 'whiskey') return product.alcoholType === 'whiskey';
			if (value === 'tequila') return product.alcoholType === 'tequila';
		});

		return (
			<section className="products" id="products">
				<div>
					<h1 className="heading">Our Current Liquor Selection:</h1>
					<div>
						<Select
							name="category-filter"
							options={options}
							onChange={this.handleSelected}
							autoFocus={true}
						></Select>
						{products.length < 1 ? (
							<h2>Loading...</h2>
						) : (
							<div className="product">
								<div className="wrapper">
									{products.map((product) => (
										<div
											/*className="single-product-border"*/ className="box"
											key={product.id}
										>
											<Link to={`/products/${product.id}`}>
												<img
													className="products-image-size"
													src={product.image}
												/>
												<h3>{product.name}</h3>
												<div>
													<button className="view-more-product-info-button">
														Click for More Info
													</button>
												</div>
												<div className="price">$ {product.price}</div>
											</Link>
											<div>
												{product.stockAmount > 0 ? (
													<h1>In stock</h1>
												) : (
													<h1>Out of stock</h1>
												)}
											</div>
											<button
												disabled={product.stockAmount < 1}
												onClick={() => {
													this.handleClick(product, product.qty);
												}}
											>
												<h1>add to cart</h1>
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		products: state.products,
		isLoggedIn: !!state.auth.id,
		currentUser: state.currentUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProducts: () => {
			dispatch(fetchProducts());
		},
		addToCart: (product, qty) => dispatch(addProduct(product, qty)),
		addItem: (id, item) => dispatch(addItemThunk(id, item)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
