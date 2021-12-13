import React from 'react';
import { connect } from 'react-redux';
import CartProducts from './cartProducts';
import { getCartThunk, removeItemThunk, updateItemThunk } from '../store/cart';

/**
 * COMPONENT
 */
class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.checkout = this.checkout.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.viewItem = this.viewItem.bind(this);
	}

	handleClick(evt, product) {
		evt.preventDefault();
		// o: event is not defined but evt is
		let newQuantity = parseInt(event.target.quantity.value);
		event.target.quantity.value = '';

		if (newQuantity === 0) {
			this.removeFromCart(product);
			return;
		}

		if (!newQuantity) {
			return;
		}
		const newProductOrder = {
			// orderId: order.id,
			productId: product.id,
			quantity: newQuantity,
			price: product.price,
			changeQuantity: true,
		};

		this.props.updateItem(this.props.currentUser.id, newProductOrder);
	}

	viewItem(product) {
		this.props.history.push(`/products/${product.id}`);
	}

	removeFromCart(product) {
		this.props.removeItem(product);
	}

	componentDidMount() {
		this.props.getCart(this.props.currentUser.id);
	}

	checkout() {
		this.props.order(this.props.cart);
	}

	render() {
		let { cart } = this.props;
		let total = 0;
		console.log('This is the user cart props', this.props.cart);
		return (
			<div>
				<h3>Cart</h3>
				<div>
					{cart ? (
						cart[0] ? (
							cart.map((cartItem) => (
								<CartProducts
									key={cartItem.id}
									cartItem={cartItem}
									handleClick={this.handleClick}
									removeFromCart={this.removeFromCart}
									viewItem={this.viewItem}
								/>
							))
						) : (
							<p>{this.props.currentUser.fullName}, your cart is empty</p>
						)
					) : (
						<p>
							{this.props.currentUser.fullName}, your cart is currently empty
						</p>
					)}
					<button onClick={() => history.push('/signup')}>Purchase</button>
					<div>
						<h3>Total: ${total}</h3>
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	cart: state.cart,
	currentUser: state.currentUser,
});

const mapDispatch = (dispatch) => {
	return {
		removeItem: (item) => dispatch(removeItemThunk(item)),
		updateItem: (id, item) => dispatch(updateItemThunk(item)),
		getCart: (id) => dispatch(getCartThunk(id)),
	};
};
export default connect(mapState, mapDispatch)(Cart);
