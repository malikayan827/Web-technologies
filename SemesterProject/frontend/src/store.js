import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productReducer,productDetailsReducer} from './/reducers//productReducer';
import searchReducer from './/reducers//SearchReducer'


const reducer=combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    search: searchReducer,

})
const initialState={};
const middleware=[thunk];
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;