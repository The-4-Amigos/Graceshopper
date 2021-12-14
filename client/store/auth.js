import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
	const token = window.localStorage.getItem(TOKEN);
	if (token) {
		const res = await axios.get('/auth/me', {
			headers: {
				authorization: token,
			},
		});
		return dispatch(setAuth(res.data));
	}
};

export const authenticate =
	(
		username,
		password,
		fullName = null,
		email = null,
		address = null,
		dob = null,
		method
	) =>
	async (dispatch) => {
		let res;
		try {
			if (method === 'signup') {
				res = await axios.post(`/auth/${method}`, {
					username,
					password,
					fullName,
					email,
					address,
					dob,
				});
			} else {
				res = await axios.post(`/auth/${method}`, { username, password });
				window.localStorage.setItem(TOKEN, res.data.token);
				console.log('This is res.data', res.data);
				dispatch(me());
				history.push('/user/:id');
			}
		} catch (authError) {
			return dispatch(setAuth({ error: authError }));
		}
	};

export const logout = () => {
	window.localStorage.removeItem(TOKEN);
	history.push('/products');
	return {
		type: SET_AUTH,
		auth: {},
	};
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
	switch (action.type) {
		case SET_AUTH:
			return action.auth;
		default:
			return state;
	}
}
