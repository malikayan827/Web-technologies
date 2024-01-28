import axios from 'axios';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,CLEAR_ERROR } from '..//Constants//productConstants';
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    REVIEW_FAIL,
    REVIEW_REQUEST,
    REVIEW_SUCCESS,
    REVIEW_RESET } from '..//Constants//productConstants';
export const productReducer = (state={products:[]},action) => {
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
export const productDetailsReducer = (state={product:{}},action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state,}
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case CLEAR_ERROR:
            return { ...state, error: null }
        default:
            return state
    }

}
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_REQUEST:
            return {
                ...state, loading: true }
        case REVIEW_SUCCESS:
            return { loading: false, success: action.payload }
        case REVIEW_FAIL:
            return {...state, loading: false, error: action.payload }
        case REVIEW_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return { ...state, error: null }
        default:
            return state
    }
}

