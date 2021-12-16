import axios from 'axios';

//action types
const SET_PRODUCTS_ADMIN = 'SET_PRODUCTS_ADMIN';
const ADD_PRODUCT_ADMIN = 'ADD_PRODUCT_ADMIN';
const DELETE_PRODUCT_ADMIN = 'DELETE_PRODUCT_ADMIN'

//action creators
const setProductsAdmin = (productsAdmin) => {
	return {
		type: SET_PRODUCTS_ADMIN,
		productsAdmin,
	};
};

const _addProductAdmin = (productAdmin) => {
	return {
		type: ADD_PRODUCT_ADMIN,
		productAdmin,
	};
};

const _deleteProductAdmin = (productAdmin) => {
	return {
		type: DELETE_PRODUCT_ADMIN,
		productAdmin
	}
}

//thunk creators
export const fetchProductsAdmin = () => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token')    
			const { data } = await axios.get('api/products/admin', {
				headers: {
					authorization: token
				}
			})
			dispatch(setProductsAdmin(data));
		} catch (error) {
			console.log(error);
		}
	};
};

export const addProductAdmin = (productAdmin) => {
    return async (dispatch) => {
      try {
      const token = window.localStorage.getItem('token')
      const { data: added} = await axios.post('api/products/admin', productAdmin, {
          headers: {
              authorization: token
          }
      })
      dispatch(_addProductAdmin(added))
      } catch (error) {
        console.log(error)
      }
    }
  }

export const deleteProductAdmin = (id) => {
    return async (dispatch) => {
        try {
        const token = window.localStorage.getItem('token')    
        const { data:user } = await axios.delete(`api/products/${id}`, {
            headers: {
                authorization: token
            }
        })
        dispatch(_deleteProductAdmin(user))
        } catch (error) {
            console.log(error)
        }
    }
}

const initialState = [];

export default function productsAdminReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PRODUCTS_ADMIN:
			return action.productsAdmin
		case DELETE_PRODUCT_ADMIN:
			return state.filter((productAdmin) => productAdmin.id !== action.productAdmin.id)
        case ADD_PRODUCT_ADMIN:
            return [...state, action.productAdmin]
		default:
			return state;
	}
}
