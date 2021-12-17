import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductAdmin } from '../store/singleProductAdmin';
import EditProductByAdmin from './EditProductByAdmin';

export class SingleProduct extends React.Component {
  constructor () {
    super()
    this.state = {
        renderProductUserForm: false
    }
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
}

handleEditButtonClick () {
    this.setState({
        renderProductUserForm: true
    })
}

  componentDidMount() {
    this.props.getProductAdmin(this.props.match.params.productAdminId);
  }


  render() {
    const { product } = this.props;
    return (
      <div>
        <div id="box">
          <div className="single-product-border">
            <h1>{product.name}</h1>
            <img className="products-image-size" src={product.image} />
            <h1>ABV: {product.ABV}%</h1>
            <h1>Stock Amount: {product.stockAmount}</h1>
            <h1 className="price">Price: ${product.price}</h1>
            <h3>Description: {product.description}</h3>
            <h3>Category: {product.alcoholType}</h3>
            <div>
                {this.state.renderProductUserForm && <EditProductByAdmin product={product}/>}
                <button id='edit-user-restricted-button' onClick={() => this.handleEditButtonClick()} className="edit-button" type="submit">Edit This Product</button>
            </div>
            <div className="back-to-all-products-link" >
            <Link to={'/adminProducts'}>
              Back to All Products
            </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
	return {
		product: state.productAdmin,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getProductAdmin: (productId) => dispatch(fetchProductAdmin(productId)),
	};
};

export default connect(mapState, mapDispatch)(SingleProduct);
