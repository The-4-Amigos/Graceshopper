import React from "react";
import { connect } from "react-redux";
import CartProducts from "./cartProducts";
import { getCartThunk, removeItemThunk, updateItemThunk } from "../store/cart";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  removeFromCart(userId, item) {
    this.props.removeItem(userId, item);
    this.props.getCart(this.props.currentUser.id);
  }

  componentDidMount() {
    this.props.getCart(this.props.currentUser.id);
  }

  render() {
    let { cart, currentUser, updateItem, getCart } = this.props;
    let total = 0;
    let itemTotal = 0;
    if (cart.products) {
      cart.products.forEach((item) => {
        itemTotal += item.price * item.productOrders.quantity;
        total += itemTotal;
        return total;
      });
    }

    return (
      <div>
        <div className="shopping-cart">
          <div className="column-labels">
            <table
              className="shopping-cart"
              width="100%"
              cellSpacing={0}
              cellPadding={0}
            >
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

              {cart.products ? (
                cart.products[0] ? (
                  <CartProducts
                    cartItem={cart.products}
                    removeFromCart={this.removeFromCart}
                    currentUser={currentUser}
                    updateItem={updateItem}
                    getCart={getCart}
                  />
                ) : (
                  <tbody>
                    <tr>
                      <td>Your cart is empty</td>
                    </tr>
                  </tbody>
                )
              ) : (
                <tbody>
                  <tr>
                    <td>
                      {this.props.currentUser.fullName}, your cart is currently
                      empty
                    </td>
                  </tr>
                </tbody>
              )}
              <tfoot>
                <tr>
                  <td colSpan={6} className="total">
                    Total: ${total}
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
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  currentUser: state.currentUser,
});

const mapDispatch = (dispatch) => {
  return {
    removeItem: (userId, item) => dispatch(removeItemThunk(userId, item)),
    updateItem: (id, item) => dispatch(updateItemThunk(id, item)),
    getCart: (id) => dispatch(getCartThunk(id)),
  };
};
export default connect(mapState, mapDispatch)(Cart);
