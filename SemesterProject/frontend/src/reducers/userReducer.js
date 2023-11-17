import { LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS } from "../Constants/userConstants"
export const userReducer=(state={user:{} }, action)=>{
switch (action.type){
    case LOGIN_REQUEST:
        return {loading:true
        }
    case LOGIN_FAIL:
    case LOGIN_SUCCESS:

}
}