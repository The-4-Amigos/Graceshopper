import React, { Component } from 'react';
import { connect } from 'react-redux';
import { _addProduct, deleteFromCart } from '../store/CheckoutStore';
// import { addOrderId } from "../store/order"; can't find the module
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import swal from '@sweetalert/with-react'

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

  createOrder(cartItems) {
    swal(
      //       <Checkout
      //   store={store}
      //   amountPrefix="Pay $"
      //   testStripeKey="pk_test_ry8ALrWRqEItYo3DQDAOynVH"
      //   liveStripeKey="pk_live_czjLJx8fbS6L6KvQIlItvPvY"
      //   endpoint="https://3kh1a4zr83.execute-api.eu-west-1.amazonaws.com/prod/v1/stripe/create"
      //   fields={[
      //     "name=*|John Doe",
      //     "email=*email|john@example.com",
      //     "phone=tel|+44 207 123 4567",
      //     "number=*|4242 4242 4242 4242|Long number on the front of your card|Card Number",
      //     "cvc=*|123|The 3 digits to the right of the signature strip located on the back of your card|CVC",
      //     "exp=*|10/17||Expiry Date",
      //     "address=*6|1 Chapel Hill, Heswall, BOURNEMOUTH, UK, BH1 1AA|The address where your order will be shipped",
      //   ]}
      // />
      'hello'
    );
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
      <table
        className="shopping-cart"
        width="100%"
        cellSpacing={0}
        cellPadding={0}
      >
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.image} />
              </td>
              <td>{item.name}</td>
              <td>{item.price}</td>
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
              Total: {totalAmount}
            </td>
            <td>
              <button onClick={() => this.createOrder(cartItems)}>
                Checkout
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
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
