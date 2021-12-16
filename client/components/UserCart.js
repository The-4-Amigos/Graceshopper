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
		this.removeFromCart = this.removeFromCart.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(evt, product) {
		evt.preventDefault();
		let newQuantity = parseInt(event.target.quantity.value);
		event.target.quantity.value = '';

		if (!newQuantity) {
			return;
		}
		const newProductOrder = {
			productId: product.id,
			quantity: newQuantity,
			price: product.price,
			changeQuantity: true,
		};

		this.props.updateItem(this.props.currentUser.id, newProductOrder);
		this.props.getCart(this.props.currentUser.id);
	}

	removeFromCart(userId, item) {
		this.props.removeItem(userId, item);
		this.props.getCart(this.props.currentUser.id);
	}

	componentDidMount() {
		this.props.getCart(this.props.currentUser.id);


	}

	render() {
		let { cart, currentUser } = this.props;
		let total = 0;
		let itemTotal = 0;
		if(cart.products) {
			cart.products.forEach((item) => {
			itemTotal += item.price * item.productOrders.quantity;
			total += itemTotal;
			return total
		});
		}
		

		return (
			<div>
				<div className="shopping-cart">
					<div className="column-labels">
						<h1>Shopping Cart</h1>
						<table>
							<thead>
								<tr>
									<th></th>
									<th>Name</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Remove</th>
								</tr>
							</thead>

							{cart.products ? (
								cart.products[0] ? (
									<CartProducts
										cartItem={cart.products}
										handleClick={this.handleClick}
										removeFromCart={this.removeFromCart}
										currentUser={currentUser}
									/>
								) : (
									<tbody>
										<tr>
											<td>Your cart is empty</td>
										</tr>
									</tbody>
								)
							) : (
								<tbody>
									<tr>
										<td>
											{this.props.currentUser.fullName}, your cart is currently
											empty
										</td>
									</tr>
								</tbody>
							)}
						</table>
					</div>
					<div>
						<div className="total-amount">
							<h3>Subtotal: ${total}</h3></div>
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
		removeItem: (userId, item) => dispatch(removeItemThunk(userId, item)),
		updateItem: (id, item) => dispatch(updateItemThunk(id, item)),
		getCart: (id) => dispatch(getCartThunk(id)),
	};
};
export default connect(mapState, mapDispatch)(Cart);
