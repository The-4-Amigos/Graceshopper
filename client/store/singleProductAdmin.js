import axios from 'axios'

//action types
const SET_PRODUCT_ADMIN = 'SET_PRODUCT_ADMIN'
const UPDATE_PRODUCT_ADMIN = 'UPDATE_PRODUCT_ADMIN'

//action creators
const setProductAdmin = (product) => {
    return {
        type: SET_PRODUCT_ADMIN,
        product
    }
}

const _updateProductAdmin = (product) => {
    return {
      type: UPDATE_PRODUCT_ADMIN,
      product
    }
  }

//thunk creators
export const fetchProductAdmin = (productId) => {
    return async (dispatch) => {
        try {
        const token = window.localStorage.getItem('token')    
        const { data } = await axios.get(`/api/products/admin/${productId}`, {
            headers: {
                authorization: token
            }
        })
        dispatch(setProductAdmin(data))
        } catch (error) {
            console.log(error) 
        }
    }
}

export const updateProductAdmin = (product) => {
    return async (dispatch) => {
      try {
      const token = window.localStorage.getItem('token') 
      const { data: updated } = await axios.put(`/api/products/${product.id}`, product, {
        headers: {
            authorization: token
        }
      })
      dispatch(_updateProductAdmin(updated))
      } catch (error) {
        console.log(error)
    }
    }
  }


//initalState & reducer

const initialState = {}

export default function singleProductAdminReducer (state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCT_ADMIN:
            return action.product
        case UPDATE_PRODUCT_ADMIN:
            return action.product
        default:
            return state
    }
}
