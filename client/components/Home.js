import React from 'react';
import { connect } from 'react-redux';
import AllProducts from './AllProducts';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <div>
        <h3>Welcome, {username}</h3>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);

//user to view their account info/edit/or look at past orders
