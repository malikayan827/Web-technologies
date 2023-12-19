import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productReducer,productDetailsReducer} from './/reducers//productReducer';
import searchReducer from './/reducers//SearchReducer'
import { profileReducer, userReducer,forgotReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    search: searchReducer,
    profile: profileReducer,
    forgotPassword: forgotReducer,
    cart: cartReducer,

})

let initialState={
    cart:{
        cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    }
};

const middleware=[thunk];
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;