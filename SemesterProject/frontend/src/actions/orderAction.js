import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    CLEAR_ERRORS,
} from "../Constants/orderConstants";
import axios from "axios";
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/new", order, config);
        // dispatch({
        //     type: ORDER_CREATE_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response.data.message,
        });
    }
};
//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
