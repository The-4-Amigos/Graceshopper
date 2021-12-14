import React from 'react';
import { connect } from 'react-redux';
import { deleteUser, fetchUsers } from '../store/users';
import { Route, Link } from 'react-router-dom';
import AddUserByAdminForm from './AddUserByAdminForm';

class AllUsersAdminView extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const { users } = this.props;
    return (
        <div>
            <div>
            <Route path="/users" component={AddUserByAdminForm} />
            </div>
            <h1>Our Beloved Users:</h1> 
            <div>
            {users.length < 1 ? (
                <h1>There are no Users to display :(</h1>
            ) : (
                users.map((user) => (
                <div className="single-product-border" key={user.id}>
                    <div >
                      <Link to={`/users/${user.id}`}><button className="view-user-info-button">View User Info</button></Link>
                    </div>
                    <h1>Full Name: {user.fullName}</h1>
                    <h2>username: {user.username}</h2>
                    <h2>isAdmin: {user.isAdmin.toString()}</h2>
                      <div className="delete-button-div">
                          <button className="delete-button" type="submit" onClick={() => {this.props.deleteUser(user.id)}}>DELETE USER || X</button>
                      </div>
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(fetchUsers());
    },
    deleteUser: (user) => {
      dispatch(deleteUser(user))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllUsersAdminView);
