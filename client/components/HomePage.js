import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { addProduct } from '../store/CheckoutStore';

export const HomePage = () => {
  return (
    <div>
      <section className="home">
        <div className="content">
          <img src="FullstackSpiritsLogo.jpeg" />
          <Link to="/products">Shop All Liquors</Link>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(fetchProducts());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
