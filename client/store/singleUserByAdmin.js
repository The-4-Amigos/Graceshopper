import axios from 'axios'

//action types
const SET_USER = 'SET_USER'
const UPDATE_USER = 'UPDATE_USER'

//action creators
const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const _updateUser = (user) => {
    return {
      type: UPDATE_USER,
      user
    }
  }

//thunk creators
export const fetchUser = (userId) => {
    return async (dispatch) => {
        try {
        const token = window.localStorage.getItem('token')    
        const { data } = await axios.get(`/api/users/${userId}`, {
            headers: {
                authorization: token
            }
        })
        dispatch(setUser(data))
        } catch (error) {
            console.log(error) 
        }
    }
}

export const updateUser = (user) => {
    return async (dispatch) => {
      try {
      const token = window.localStorage.getItem('token') 
      const { data: updated } = await axios.put(`/api/users/${user.id}`, user, {
        headers: {
            authorization: token
        }
      })
      dispatch(_updateUser(updated))
      } catch (error) {
        console.log(error)
    }
    }
  }

// export const removeRelation = (robotId, projectId) => {
//     return async (dispatch) => {
//         try {
//         await axios.put(`/api/relations/${robotId}/${projectId}`)
//         dispatch(fetchRobot(robotId))
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

//initalState & reducer

const initialState = {}

export default function singleUserReducer (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return action.user
        case UPDATE_USER:
            return action.user
        default:
            return state
    }
}
