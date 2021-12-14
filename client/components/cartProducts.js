import React from 'react';

const CartProducts = (props) => {
	const { handleClick, removeFromCart } = props;
	console.log('This is the cartIProduct props:', props);
	return (
		<div>
			<div>
				{props.cartItem.products.map((product) => {
					return (
						<div key={product.id}>
							<img src={product.image} />
							<h3>{product.name}</h3>
							<h3>Price: ${product.price}</h3>
							<span>Quantity: {product.productOrders.quantity}</span>
							<form onSubmit={(evt) => handleClick(evt, product)}>
								<input
									name="quantity"
									type="text"
									// id="inp"
									// placeholder="&nbsp;"
								/>
								
								<button type="submit">Update Quantity</button>
							</form>

							<button onClick={() => removeFromCart()}>Delete</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CartProducts