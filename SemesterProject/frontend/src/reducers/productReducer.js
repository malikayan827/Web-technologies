import axios from 'axios';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,CLEAR_ERROR } from '../constants/productConstants';
export const getProduct = () => async (dispatch) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products, productsCount: action.payload.productsCount }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        case CLEAR_ERROR:
            return { ...state, error: null }
        default:
            return state

}
}

