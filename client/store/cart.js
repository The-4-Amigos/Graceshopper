import axios from 'axios';
import { fetchOrderId } from './order';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const REMOVE_ITEM = 'REMOVE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const GET_NEW_CART = 'GET_NEW_CART';

/**
 * ACTION CREATORS
 */

const getCart = (cart) => ({ type: GET_CART, cart });
const removeItem = (item) => ({ type: REMOVE_ITEM, item });
const updateCart = (item) => ({ type: UPDATE_CART, item });
const addItem = (item) => ({ type: ADD_ITEM, item });
const getNewCart = (cart) => ({ type: GET_NEW_CART, cart });

/**
 * THUNK CREATORS
 */

export const addItemThunk = (item) => {
	return async (dispatch) => {
		const res = await axios.post(`/api/cart`, item);
		var newPro = res.data.product;
		newPro.product_Order = res.data.newProductOrder;

		dispatch(addItem(newPro));
	};
};

export const removeItemThunk = (item) => {
	return async (dispatch) => {
		const res = await axios.delete(`/api/cart/${item.id}`);

		dispatch(removeItem(item));
	};
};

export const getCartThunk = (userId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/cart/${userId}`);
		dispatch(getCart(res.data));
	} catch (err) {
		console.error(err);
	}
};

export const updateItemThunk = (id, item) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/cart/${id}`, item);
		var newProduct = res.data.product;
		newProduct.productOrders = res.data.productOrder;

		dispatch(updateCart(newProduct));
	} catch (err) {
		console.error(err);
	}
};

export const getNewCartThunk = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/cart/newCart');
		dispatch(getNewCart(res.data));
	} catch (err) {
		console.error(err);
	}
};

/**
 * REDUCER
 */

export default function (state = { products: [] }, action) {

	switch (action.type) {
		case GET_CART:
			return action.cart;
		case ADD_ITEM:
			const newProductArr = state.products.filter(
				(product) => product.id !== action.item.id
			);
			newProductArr.push(action.item);

			return { ...state, products: newProductArr };

		case REMOVE_ITEM:
			const newProducts = state.products.filter(
				(product) => product.id !== action.item.id
			);
			return { ...state, products: newProducts };

		case UPDATE_CART:
			var newProductsArr = state.products.map((product) => {
				if (product.id === action.item.id) {
					product = action.item;
				}
				return product;
			});
			return { ...state, products: newProductsArr };
		case GET_NEW_CART:
			return action.cart;
		default:
			return state;
	}
}
