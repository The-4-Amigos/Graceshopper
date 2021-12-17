import { connect } from "react-redux";
import React, { Component } from "react";
import Swal from "sweetalert2";
import faker from "faker";

export class CheckouthtmlForm extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(product) {}

  render() {
    const cartItems = this.props.guestCart.cartItems;
    const cart = this.props.cart;
    const isLoggedIn = this.props.isLoggedIn;

    let totalAmount = 0;
    let itemAmount = 0;
    let tax = 8.875;
    console.log("isLoggedin checkout form: ", isLoggedIn);

    let orderId = faker.datatype.number({ min: 1000, max: 10000000 });

    cartItems.forEach((item) => {
      totalAmount += item.price * item.qty;
      itemAmount += Number(item.qty);
    });
    cart.products.forEach((item) => {
      totalAmount += item.price * item.productOrders.quantity;
      itemAmount += Number(item.productOrders.quantity);
    });


    const taxAmount = totalAmount / tax;
    let now = new Date();
    
    return (
      <div>
        <div className="containerFORM">
          <p className="help">Please review your bill and pay </p>
          <div className="boxFORM card-panel z-depth-3">
            <div className="merchant">
              <h5 className="center-align">Fullstack Spirits</h5>
              <p>
                {now.getMonth() +
                  1 +
                  "/" +
                  now.getDate() +
                  "/" +
                  now.getFullYear()}
              </p>
            </div>
            <div className="invoice">
              <table className="highlight">
                <thead>
                  <tr>
                    <th>QTY</th>
                    <th>ITEM</th>
                    <th className="right-align">PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products
                    ? cart.products[0]
                      ? cart.products.map((item) => (
                          <tr key={item.id}>
                            <td>{item.productOrders.quantity}</td>
                            <td>{item.name}</td>
                            <td className="right-align">${item.price}</td>
                          </tr>
                        ))
                      : cartItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.qty}</td>
                            <td>{item.name}</td>
                            <td className="right-align">${item.price}</td>
                          </tr>
                        ))
                    : cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.qty}</td>
                          <td>{item.name}</td>
                          <td className="right-align">${item.price}</td>
                        </tr>
                      ))}
                  <tr>
                    <td></td>
                    <td className="right-align">Tax</td>
                    <td className="right-align">{tax}%</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="right-align bold">Subtotal</td>
                    <td className="right-align bold">${totalAmount}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="right-align bold">Total</td>
                    <td className="right-align bold">
                      ${Math.round((totalAmount + taxAmount) * 100) / 100}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="payment">
              <h4>Payment Information</h4>
              <div className="credit-card-box card-panel z-depth-2 animation-element slide-left">
                <div className="flip">
                  <div className="front">
                    <div className="logo">
                      <img
                        src="http://cdn.flaticon.com/svg/39/39134.svg"
                        alt=""
                      />
                    </div>
                    <div className="number input-field">
                      <label htmlFor="card-number">Card Number</label>
                      <input
                        type="text"
                        id="card-number"
                        className="input-card-number"
                        maxLength="16"
                        placeholder="0000 0000 0000 0000"
                      />

                      <label htmlFor="card-number">Billing Address</label>
                      <input
                        type="text"
                        id="card-number-3"
                        className="input-card-number"
                        maxLength="40"
                        placeholder="Billing Address"
                      />
                    </div>
                    <div className="cvv input-field">
                      <label htmlFor="card-cvv">CVV</label>
                      <input
                        type="text"
                        id="card-cvv"
                        className="input-card-cvv"
                        maxLength="3"
                        placeholder="###"
                      />
                    </div>
                    <div className="card-holder input-field">
                      <label htmlFor="name">Card Holder</label>
                      <input
                        placeholder="NAME"
                        type="text"
                        name="name"
                        id="name"
                      />
                    </div>

                    <div className="card-expiration-date input-field">
                      <select id="month">
                        <option></option>
                        <option>Jan</option>
                        <option>Feb</option>
                        <option>Mar</option>
                        <option>Apr</option>
                        <option>May</option>
                        <option>Jun</option>
                        <option>Jul</option>
                        <option>Aug</option>
                        <option>Sep</option>
                        <option>Oct</option>
                        <option>Nov</option>
                        <option>Dec</option>
                      </select>
                      <select>
                        <option></option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                      </select>
                      <label>Expires</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="button checkout row">
              <button
                onClick={() => {
                  Swal.fire({
                    title: `Thank you for your purchase!`,
                    text: `Your order number is: ${orderId}`,
                    icon: "success",
                    inputAttributes: {
                      autocapitalize: "off",
                    },
                  })
                    .then(() => this.props.history.push("/products"))
                    .then(async () => await localStorage.clear())
                    .then(() => location.reload());
                }}
                className="col s12 btn-large green btn waves-effect waves-dark register"
              >
                <span>Checkout</span> <i className="fa fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    guestCart: state.guestCart,
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
  };
};

export default connect(mapStateToProps, null)(CheckouthtmlForm);
