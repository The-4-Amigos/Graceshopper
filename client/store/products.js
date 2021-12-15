import axios from 'axios';

//action types
const SET_PRODUCTS = 'SET_PRODUCTS';
const UPDATE_INVENTORY = 'UPDATE_INVENTORY';
const SET_PRODUCTS_ADMIN = 'SET_PRODUCTS_ADMIN';

//action creators
export const setProducts = (products) => {
	return {
		type: SET_PRODUCTS,
		products,
	};
};

export const setProductsAdmin = (productsAdmin) => {
	return {
		type: SET_PRODUCTS_ADMIN,
		productsAdmin,
	};
};

const updateInventoryStore = (productId, updatedStockAmount) => ({
	type: UPDATE_INVENTORY,
	productId,
	updatedStockAmount,
});

//thunk creators
export const fetchProducts = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('api/products');
			dispatch(setProducts(data));
		} catch (error) {
			console.log(error);
		}
	};
};

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

export const updateInventory = (itemProductId, stockAmount) => (dispatch) => {
	axios
		.put(`/api/products/${itemProductId}`, {
			stockAmount: stockAmount,
		})
		.then((res) => res.data)
		.then(() => {
			dispatch(updateInventoryStore(itemProductId, stockAmount));
		})
		.catch((err) => console.log(err));
};

const initialState = [];

export default function productsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PRODUCTS:
			return action.products;
		case SET_PRODUCTS_ADMIN:
			return action.productsAdmin
		case UPDATE_INVENTORY:
			state.filter(
				(product) => product.id === action.productId
			)[0].stackAmount = action.updatedStockAmount;
			return state;
		default:
			return state;
	}
}
