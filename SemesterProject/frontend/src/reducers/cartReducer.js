import e from "cors";
import { ADD_TO_CART,REMOVE_CART_ITEM, SAVE_SHIPPING_INFO,REMOVE_ALL_CART_ITEMS } from "../Constants/cartConstant";

export const cartReducer = (state = {cartItems:[],shippingInfo:{}},action) => {

    switch(action.type){
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find((x)=>x.product === item.product);
            if(existItem){
                return{
                    ...state,
                    cartItems:state.cartItems.map((x)=>x.product === existItem.product ? item : x)
                }
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        case REMOVE_CART_ITEM:
            return{
                ...state,
               
                cartItems:state.cartItems.filter((x)=>x.product !== action.payload)
            }
        case REMOVE_ALL_CART_ITEMS:
            return{
                ...state,
                cartItems:[]
            }
            case SAVE_SHIPPING_INFO:
                return{
                    ...state,
                    shippingInfo:action.payload
                }
        default:
            return state;
    }
}