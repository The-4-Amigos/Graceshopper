import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../store/users'



class AddUserByAdminForm extends React.Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: '',
            fullName: '',
            email: '',
            address: '',
            dob: '',
            isAdmin: '',
            showForm: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    handleSelectChange(event) {
		this.setState({ isAdmin: event.target.value });
	}


    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value,

        })
    }

    handleSubmit (event) {
        event.preventDefault()
        this.props.addUser({...this.state})
        this.setState({
            username: '',
            password: '',
            fullName: '',
            email: '',
            address: '',
            dob: '',
            isAdmin: ''
        })
    }

    render () {
        const { username, password, fullName, email, address, dob, isAdmin} = this.state
        const { handleChange, handleSubmit } = this

        return (
                <div className="add-user-form" >
                    <label htmlFor="add-new-user-button"><h1>View form with button below:</h1></label>
                    <button className="add-new-user-button" type="submit" onClick={() => this.setState({showForm: true})} >Add New User</button>

                    {this.state.showForm && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Add UserName: </label>
                                <input name= "username" onChange={handleChange} value={username} />

                                <label htmlFor="password">Add Password: </label>
                                <input name= "password" onChange={handleChange} value={password} type="password"/>

                                <label htmlFor="fullName">Add Full Name: </label>
                                <input name= "fullName" onChange={handleChange} value={fullName} />

                                <label htmlFor="email">Add Email: </label>
                                <input name= "email" onChange={handleChange} value={email} />

                                <label htmlFor="address">Add Address: </label>
                                <input name= "address" onChange={handleChange} value={address} />

                                <label htmlFor="dob">Add DOB: </label>
                                <input name= "dob" onChange={handleChange} value={dob} type="date" />
                            </div>
                            <label htmlFor="isAdmin">Is Admin? </label>
                                <select
                                    onChange={this.handleSelectChange}
                                    name="isAdmin"
                                    value={isAdmin}
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    )}
                    
                </div>

        )
    }
 }

const mapDispatchToProps = (dispatch) => ({
         addUser: (user) => dispatch(addUser(user))
})


 export default connect(null, mapDispatchToProps)(AddUserByAdminForm)


