import {ADD_USER,ADD_LIST_USER,ADD_DOCTORINFO,ADD_SIGN_IN,ADD_LOADING_PAGE,ADD_MARKDOWN} from '../constant'

const initialState = {
   listUser:[],
    doctorInfo:{},
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

    case ADD_DOCTORINFO:
        return{
            ...state,
            doctorInfo:action.payload
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