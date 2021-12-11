import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductsInCart, deleteProduct } from '../store/CheckoutStore';

export class Checkout extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     products: []
  //   }
  // }

  componentDidMount() {
    try {
      this.props.getProductsAddedToCart();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(
      'this is pops products inside the cart.js comp',
      this.props.products
    );
    const products = this.props.products;
    console.log();
    return (
      <div>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <div>{product.name}</div>
              <button onClick={() => this.props.deleteProduct(product.id)}>
                DELETE ME
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsInCart,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getProductsAddedToCart: () => dispatch(fetchProductsInCart()),
    deleteProduct: (id) => dispatch(deleteProduct(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
