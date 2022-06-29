import {ADD_USER,ADD_LIST_USER,GET_RESPONSE,ADD_SIGN_IN,ADD_LOADING_PAGE,ADD_MARKDOWN} from '../constant'

const initialState = {
   listUser:[],
    response:{},
    signInPerson:{},
    getoneuser:{},
    checkLoadingPage:{},
    markdown:{}
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
            getoneuser:action.payload
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
    case ADD_LOADING_PAGE:
        return{
            ...state,
            checkLoadingPage:action.payload
        }
    case ADD_MARKDOWN:
            return{
                ...state,
                markdown:action.payload
            }
     
    default: return state
    }
    
}

export default userReducer