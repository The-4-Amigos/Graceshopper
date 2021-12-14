
import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import { addProduct } from "../store/CheckoutStore";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, addToCart } = this.props;
    return (
      <div>
        <h1>Our Current Liquor Selection:</h1>
        <div>
          {products.length < 1 ? (
            <h1>We are completely out of stock :(</h1>
          ) : (
            products.map((product) => (
              <div className="single-product-border" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <h2>{product.name}</h2>
                  <img className="products-image-size" src={product.image} />
                  <h3>${product.price}</h3>
                </Link>
                <button
                  onClick={() => {
                    addToCart(product, product.qty);
                  }}
                >
                  <h1>add to cart</h1>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

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
    addToCart: (product, qty) => dispatch(addProduct(product, qty)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
