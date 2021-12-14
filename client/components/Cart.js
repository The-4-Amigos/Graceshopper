import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProduct } from '../store/CheckoutStore';
import { _addProduct } from '../store/CheckoutStore';

export class Checkout extends Component {
  handleQtyChange(event, product) {
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    cart.forEach((Item) => {
      if (Item.id === product.id) {
        Item.qty = event.target.value;
      }
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    this.props.addToCart(cart);
  }

  render() {
    const cartItems = this.props.guestCart.cartItems;

    let totalAmount = 0;
    let itemAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.price * item.qty;
      itemAmount += Number(item.qty);
    });

    return (
      <div>
        {!cartItems.length ? (
          <h1>There are no items in your cart</h1>
        ) : (
          <div>
            <div>
              <h1>Shopping Cart</h1>
              <div className="shopping-cart"></div>
              <div className="column-labels">
                <label className="product-image">Image</label>
                <label className="product-details">Product</label>
                <label className="product-price">Price</label>
                <label className="product-quantity">Quantity</label>
                <label className="product-removal">Remove</label>
              </div>
            </div>
            {cartItems.map((item) => (
              <div className="product" key={item.id}>
                <div className="product-image">
                  <img src={item.image} width="50px" height="50px" />
                </div>
                <div className="product-details">
                  <div className="product-title">{item.name}</div>
                </div>
                <div className="product-price">${item.price}</div>
                <div className="product-quantity">
                  <input
                    type="number"
                    min="1"
                    max={item.stockAmount}
                    value={item.qty}
                    onChange={(event) => this.handleQtyChange(event, item)}
                  />
                </div>
                <div className="product-removal">
                  <button className="remove-product">Remove</button>
                </div>
              </div>
            ))}
            <hr />
            <div className="checkout">
              <div className="total-amount">
                ${totalAmount}
                <div>
                  <div className="numItems">
                    <p>
                      {itemAmount < 2 ? (
                        <h4>{itemAmount} item total</h4>
                      ) : (
                        <h4>{itemAmount} items total</h4>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guestCart: state.guestCart,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addToCart: (product) => dispatch(_addProduct(product)),
    deleteProduct: (id) => dispatch(deleteProduct(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
