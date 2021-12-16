import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import { Login, Signup } from './components/AuthForm';
import Profile from './components/Profile';
import SingleProduct from './components/SingleProduct';
import { me } from './store';
import GuestCart from './components/Cart';
import UserCart from './components/UserCart';
import AllUsersAdminView from './components/AllUsersAdminView';
import SingleUser from './components/SingleUser';
import { HomePage } from './components/HomePage';
import swal from 'sweetalert';
import AllProductsAdminView from './components/AllProductsAdminView';
import SingleProductAdminView from './components/SingleProductAdminView';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/cart" component={GuestCart} />
        <Route path="/products/:productId" component={SingleProduct} />

        {isLoggedIn ? (
          <Switch>
            <Route path="/user/:userId" component={Profile} />
            <Route exact path="/cart/:userId" component={UserCart} />
            {isLoggedIn && isAdmin && (
              <Switch>
                <Route exact path="/users/:userId" component={SingleUser} />
                <Route exact path="/users" component={AllUsersAdminView} />
                <Route
                  exact
                  path="/adminProducts"
                  component={AllProductsAdminView}
                />
                <Route
                  path="/adminProducts/:productAdminId"
                  component={SingleProductAdminView}
                />
              </Switch>
            )}
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </Switch>
    );
  }
}

//landing page has link to allproducts

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes

export default withRouter(connect(mapState, mapDispatch)(Routes));
