import axios from 'axios';


/**
 * ACTION TYPES
 */

const ADD_ORDER_ID = 'ADD_ORDER_ID';
const GET_USER_ORDERS = 'GET_USER_ORDERS';

/**
 * ACTION CREATORS
 */

export const addOrderId = (orders) => ({ type: ADD_ORDER_ID, orders });
const getUserOrders = (orders) => ({ type: GET_USER_ORDERS, orders });


/**
 * THUNK CREATORS
 */

export const fetchOrderId = (userId) => (dispatch) => {
	const { data: order } = axios.get(`/api/orders/${userId}`);
	dispatch(addOrderId(order));
};

export const fetchUserOrders = (userId) => {
	return async (dispatch) => {
		const { data: orders } = await axios.get(`/api/orders/${userId}`);
		console.log('This is the order from the thunk to use userId', orders);
		dispatch(getUserOrders(orders));
	};
};


/**
 * REDUCER
 */

export default function (state = [], action) {
	switch (action.type) {
		case ADD_ORDER_ID:
			return action.orders;
		case GET_USER_ORDERS:
			return { ...state, orders: action.orders };
		default:
			return state;
	}
}
