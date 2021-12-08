import axios from 'axios'

//action types
const SET_PRODUCTS = 'SET_PRODUCTS'

//action creators
export const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,     
        products
    }
}

//thunk creators
export const fetchProducts = () => {
    return async (dispatch) => {
        try {
        const { data } = await axios.get('api/products')
        dispatch(setProducts(data))
        } catch (error) {
            console.log(error)
        }
    }
}


const initialState = []

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return action.products
        default:
            return state
    }
}

