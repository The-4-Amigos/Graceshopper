import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserOrders } from '../store/order';
import { Link } from 'react-router-dom';

import SingleOrder from './SingleOrder';
import { orders } from '../../script/seedData';
/**
 * COMPONENT
 */
class Profile extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchUserOrders(this.props.currentUser.id);
	}

	render() {
		const { currentUser, orders } = this.props;
		const { id, fullName, email, address, dob } = currentUser;
		// console.log('This is req:', req.orders);
		return (
			<div>
				<div>
					<h3>{currentUser.fullName}</h3>
					<div>
						<h2>My Profile</h2>
						<h3>Name: {fullName}</h3>
						<p>Email: {email}</p>
						<p>Address: {address}</p>
						<p>Date of Birth: {dob}</p>
						<div>
							<h2>Order History</h2>
							{orders.orders ? (
								orders.orders[0] ? (
									orders.orders.map((order) => {
										return <SingleOrder key={order.id} order={order} />;
									})
								) : (
									<h3>No Order History</h3>
								)
							) : (
								<h3>No Order History</h3>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		currentUser: state.currentUser,
		orders: state.orders,
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchUserOrders: (id) => dispatch(fetchUserOrders(id)),
	};
};

export default connect(mapState, mapDispatch)(Profile);
