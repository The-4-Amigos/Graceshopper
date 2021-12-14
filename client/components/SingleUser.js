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
        // this.handleRemoveRelation = this.handleRemoveRelation.bind(this)
    }

    // // handleRemoveRelation (robotId, projectId) {
    // //     this.props.removeRelation(robotId, projectId)
    // // }

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
        // const { handleRemoveRelation } = this
        return (
            <div>
                <h1>User Info:</h1>
                <div className="single-user-info">
                    <div>
                        <h2>fullName: {user.fullName}</h2>
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
                    <button onClick={() => this.handleEditButtonClick()} className="edit-button" type="submit">Edit This User</button>
                </div>
                {/* <div>
                    <h3>List of Assigned Projects:</h3>
                    {(robot.projects === undefined || robot.projects.length < 1) ? <h1>No Assigned Projects at the moment.</h1> :
                    <ul>{robot.projects.map(project =>
                    <li key={project.id}><Link to={`/projects/${project.id}`}>{project.title}</Link><button type="submit" onClick={() => handleRemoveRelation(robot.id, project.id)}>Unassign Project</button></li>)}
                    </ul>}
                </div> */}
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
        // removeRelation: (robotId, projectId) => dispatch(removeRelation(robotId, projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
