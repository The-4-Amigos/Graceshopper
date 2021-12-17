import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { fetchOrder } from '../store/order';

export default function SingleOrder(props) {
	const { order } = props;
	const { products } = order;
	let total = 0;
	if (products) {
		products.map((product) => {
			total = total + product.price;
		});
	}

	return (
		<div>
			<h4>Order #{order.id}</h4>
			<table>
				<thead>
					<tr>
						<th>Item</th>
						<th>Price</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{products ? (
						products.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.name}</td>
									<td>${item.price}.00</td>
									<td>{order.fulfilled === true ? 'Fulfilled' : 'In Cart'}</td>
								</tr>
							);
						})
					) : (
						<td>No orders to display</td>
					)}
				</tbody>
				<tfoot>
					<tr>
						<td>Total: ${total}.00</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
