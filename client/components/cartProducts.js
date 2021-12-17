import React, { Component } from 'react';

class CartProducts extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(evt, product) {
		evt.preventDefault();
		console.log('This is evt.target:', evt.target);
		let newQuantity = parseInt(evt.target.value);
		evt.target.value = '';

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
	render() {
		const { removeFromCart, currentUser } = this.props;
		return (
			<tbody>
				{this.props.cartItem.map((product) => {
					return (
						<tr key={product.id}>
							<td>
								<img src={product.image} width="50px" height="50px" />
							</td>

							<td>{product.name}</td>
							<td>${product.price}/bottle</td>
							<td>
								<input
									name="quantity"
									type="number"
									min={1}
									max={product.stockAmount}
									value={product.productOrders.quantity}
									onChange={(evt) => this.handleClick(evt, product)}
								/>
							</td>
							<td>${product.productOrders.quantity * product.price}</td>
							<td>
								<button
									onClick={() => removeFromCart(currentUser.id, { product })}
								>
									Remove
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		);
	}
}

export default CartProducts;
