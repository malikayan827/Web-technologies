import axios
 from "axios";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,CLEAR_ERROR
,REVIEW_FAIL,
REVIEW_REQUEST,
REVIEW_SUCCESS,
REVIEW_RESET,
ADMIN_PRODUCT_FAIL,
ADMIN_PRODUCT_REQUEST,
ADMIN_PRODUCT_SUCCESS,
NEW_PRODUCT_REQUEST,
NEW_PRODUCT_FAIL,
NEW_PRODUCT_RESET,
NEW_PRODUCT_SUCCESS,
UPDATE_PRODUCT_FAIL,
UPDATE_PRODUCT_REQUEST,
UPDATE_PRODUCT_RESET,
UPDATE_PRODUCT_SUCCESS,
DELETE_PRODUCT_FAIL,
DELETE_PRODUCT_REQUEST,
DELETE_PRODUCT_RESET,
DELETE_PRODUCT_SUCCESS } from '..//Constants//productConstants';
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from '..//Constants//productConstants';
export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/v1/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response.data.message })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product })
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response.data.message })
    }
}
//review action
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(`/api/v1/review`, reviewData, config);
  
      dispatch({
        type: REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
 // Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}; 
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })}