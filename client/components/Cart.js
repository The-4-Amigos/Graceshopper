import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _addProduct, deleteFromCart } from '../store/CheckoutStore';
import CheckoutForm from './checkoutForm';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import swal from 'sweetalert';

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
    const { deleteProduct, createOrder } = this.props;
    let totalAmount = 0;
    let itemAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.price * item.qty;
      itemAmount += Number(item.qty);
    });

    return (
      <div className="shopping-cart">
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}/Bottle</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max={item.stockAmount}
                      value={item.qty}
                      onChange={(event) => this.handleQtyChange(event, item)}
                    />
                  </td>
                  <td>${item.price * item.qty}</td>
                  <td>
                    <button
                      className="remove-product"
                      onClick={() => {
                        deleteProduct(item);
                      }}
                    >
                      Remove{' '}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={6} className="total">
                  Total: ${totalAmount}
                </td>
                <td>
                  <Link to="/checkout">
                    <button>Checkout</button>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guestCart: state.guestCart,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(_addProduct(product)),
    deleteProduct: (product) => dispatch(deleteFromCart(product)),
    // createOrder: (order) =>dispatch(addOrderId(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
