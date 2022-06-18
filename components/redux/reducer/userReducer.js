import {ADD_USER,ADD_LIST_USER,GET_RESPONSE,ADD_SIGN_IN} from '../constant'

const initialState = {
   listUser:[],
    response:{},
    signInPerson:{},
    user:{}
}
const userReducer =(state= initialState,action)=>{
    switch(action.type){
    case ADD_LIST_USER:
        return {
            ...state,
            listUser:action.payload,
        }
       
    case ADD_USER:
        return{
            ...state,
            user:action.payload
        }

    case GET_RESPONSE:
        return{
            ...state,
            response:action.payload
        }
    case ADD_SIGN_IN:
        return{
            ...state,
            signInPerson:action.payload
        }
     
    default: return state
    }
    
}

export default userReducer