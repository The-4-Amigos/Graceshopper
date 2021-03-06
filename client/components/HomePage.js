import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { addProduct } from '../store/CheckoutStore';
import swal from 'sweetalert';

const sweetAlert = () => {
	swal({
		title: 'Must be 21 or over to enter the page',
		icon: 'warning',
		button: 'Confirm I am 21 or older',
	});
};
export const HomePage = () => {
	return (
		<section className="home">
			<div className="content">
				<img
					onClick={sweetAlert()}
					className="products-image-size"
					src="FullstackSpiritsLogo.jpeg"
					height="50"
					width="50"
				/>
				<Link to="/products">Shop All Liquors</Link>
			</div>
		</section>
	);
};

// const mapStateToProps = (state) => {
//   return {
//     products: state.products,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getProducts: () => {
//       dispatch(fetchProducts());
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
