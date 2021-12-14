import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import AllUsersAdminView from './AllUsersAdminView';

const Navbar = ({
	handleClick,
	isLoggedIn,
	isAdmin,
	currentUser,
	guestCart,
}) => (
	<div>
		<h1>Fullstack Spirits</h1>
		<nav>
			{isLoggedIn && isAdmin && <Link to="/users">View All Users</Link>}
			{isLoggedIn ? (
				<div>
					{/* The navbar will show these links after you log in */}
					<Link to={`/user/${currentUser.id}`}>{currentUser.username}</Link>
					<a href="#" onClick={handleClick}>
						Logout
					</a>
					<Link to="/products">Shop All Liquors</Link>
					<Link to={`/cart/${currentUser.id}`}>
						<img
							src="https://cdn.shopify.com/s/files/1/0139/6552/5046/t/1/assets/cart.png?20010"
							width="50"
							height="40"
						/>
						{/* <span>Cart {cart.cartItems.length}</span>*/}
					</Link>
				</div>
			) : (
				<div>
					{/* The navbar will show these links before you log in */}
					<Link to="/login"> Login </Link>
					<Link to="/signup"> Sign Up </Link>
					<Link to="/products">Shop All Liquors</Link>
					<Link to="/cart">
						<img
							src="https://cdn.shopify.com/s/files/1/0139/6552/5046/t/1/assets/cart.png?20010"
							width="50"
							height="40"
						/>
						<span>Cart {guestCart.cartItems.length}</span>
					</Link>
				</div>
			)}
		</nav>
		<hr />
	</div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		isAdmin: !!state.auth.isAdmin,
		currentUser: state.currentUser,
		guestCart: state.guestCart,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
