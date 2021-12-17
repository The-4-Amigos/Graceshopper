import React from 'react'
// import { fetchRobot, removeRelation } from '../redux/singleRobot'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUser } from '../store/singleUserByAdmin'
import EditUserByAdmin from './EditUserByAdmin'


class SingleUser extends React.Component {
    constructor () {
        super()
        this.state = {
            renderEditUserForm: false
        }
        this.handleEditButtonClick = this.handleEditButtonClick.bind(this)
    }

    handleEditButtonClick () {
        this.setState({
            renderEditUserForm: true
        })
    }
    componentDidMount(){
        this.props.loadSingleUser(this.props.match.params.userId)
    }

    render () {
        const { user }= this.props
        return (
            <div className = 'all-users'>
                <h1>User Info:</h1>
                <div className="single-user">
                    <div>
                        <h2>Full Name: {user.fullName}</h2>
                    </div>
                    <div>
                        <h2>isAdmin: {String(user.isAdmin)}</h2>
                        <h2>username: {user.username}</h2>
                        <h2>email: {user.email}</h2>
                        <h2>address: {user.address}</h2>
                        <h2>dob: {user.dob}</h2>
                    </div>
                </div>
                <div>
                    {this.state.renderEditUserForm && <EditUserByAdmin user={user} />}
                    <button id='edit-user-restricted-button' onClick={() => this.handleEditButtonClick()} className="edit-button" type="submit">Edit This User</button>
                </div>
                <div>
                    <h1>All User's Orders:</h1>
                    {(user.orders === undefined || user.orders.length < 1) ? <h1>This User Has No Orders :(</h1> :
                    <div className="all-users-orders">{user.orders.map(order =>
                    <div key={order.id} id='user-view-by-admin-order-div'>
                        <h2>Order Id: {order.id}</h2>
                        <h2>Fulfilled: {String(order.fulfilled)}</h2>

                        {(order.products === undefined || order.products.length < 1) ? <h1>This Order Has No Products :(</h1> :
                        <div>{order.products.map(product =>
                        <div key={product.id}>
                            <h2>Product Id: {product.id}</h2>
                            <h2>Name: {product.name}</h2>
                            <h2>ABV: {product.ABV}%</h2>
                            <h2>Amount in Stock: {product.stockAmount}</h2>
                            <h2>Price: {product.price}</h2>
                            <h2>Description: {product.description}</h2>
                            <h2>Category: {product.alcoholType}</h2>
                        </div>
                        )}
                        </div>}

                    </div>
                    )}
                    </div>}
                </div>
                <div>
                    <Link to="/users">
                        <p>Back to All Users</p>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadSingleUser: (userId) => {
            dispatch(fetchUser(userId))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
