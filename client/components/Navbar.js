
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";


const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>FS-App-Template</h1>
    <nav>

      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">Shop All Liquors</Link>
          <Link to="/cart"> 
          <img src= "../../public/shoppingBasket.png" width= "50" height= "40"/>
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login"> Login </Link>
          <Link to="/signup"> Sign Up </Link>
          <Link to="/products">Shop All Liquors</Link>
          <Link to="/cart"> 
          <img src= "../../public/shoppingBasket.png" width= "50" height= "40"/>
          </Link>
        </div>
      )}


    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
