import axios from 'axios';

export const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

export const getSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(getSingleProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//reducer
const initialState = {
  singleProduct: [],
};
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.product };
  }
}
