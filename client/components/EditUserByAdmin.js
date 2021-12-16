import React from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../store/singleUserByAdmin'

class EditUser extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            fullName: this.props.user.fullName || '',
            isAdmin: this.props.user.isAdmin.toString() || '',
            username: this.props.user.username || '',
            email: this.props.user.email || '',
            address: this.props.user.address || '',
            dob: this.props.user.dob || '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidUpdate (prevProps) {
        if (prevProps.user.id !== this.props.user.id) {
            this.setState({
                fullName: this.props.user.fullName || '',
                isAdmin: this.props.user.isAdmin || '',
                username: this.props.user.username || '',
                email: this.props.user.email || '',
                address: this.props.user.address || '',
                dob: this.props.user.dob || '',
                password: this.props.user.password || '',
            })
        }
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault()
        this.props.updateUser({...this.props.user, ...this.state})
    }

    render () {
        const { username, password, fullName, email, address, dob, isAdmin } = this.state
        const { handleSubmit, handleChange, } = this
        return (
                <div className="single-user-info">
                    <h3>Enter Changes Below Then Save Changes</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fullName">Edit Full Name: </label>
                            <input type="text" name= "fullName" onChange={handleChange} value={fullName} />

                            <label htmlFor="isAdmin">Is Admin? </label>
                            <input name= "isAdmin" onChange={handleChange} value={isAdmin} />
                            
                            <label htmlFor="username">Edit UserName: </label>
                            <input type="text" name= "username" onChange={handleChange} value={username} />

                            <label htmlFor="email">Edit Email: </label>
                            <input name= "email" onChange={handleChange} value={email} />

                            <label htmlFor="address">Edit Address: </label>
                            <input type="text" name= "address" onChange={handleChange} value={address} />

                            <label htmlFor="dob">Edit DOB: </label>
                            <input name= "dob" onChange={handleChange} value={dob} type="date" />

                            <label htmlFor="password">Edit Password: </label>
                            <input name= "password" onChange={handleChange} value={password} type="password"/>
                            </div>                        
                        <div>
                            <button type="submit">Save Changes</button>
                        </div>
                    </form>

                </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user)),
    }
}
export default connect(null, mapDispatchToProps)(EditUser)
