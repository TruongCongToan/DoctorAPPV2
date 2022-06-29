import {ADD_USER,GET_RESPONSE,ADD_SIGN_IN,ADD_LIST_USER,ADD_LOADING_PAGE,ADD_MARKDOWN} from '../constant'

const addUser = ( obj) =>{
    return{
        type:ADD_USER,
        payload:obj
    }
}
const addListUser = ( obj) =>{
    return{
        type:ADD_LIST_USER,
        payload:obj
    }
}
const getResponse = (obj) =>{
    return{
        type:GET_RESPONSE,
        payload:obj
    }
}
const addSignIn = (obj) =>{
    return{
        type:ADD_SIGN_IN,
        payload:obj
    }
}
const addCheckLoadingPage = (obj) =>{
    return{
        type:ADD_LOADING_PAGE,
        payload:obj
    }
}
const addMarkDown = (obj) =>{
    return{
        type:ADD_MARKDOWN,
        payload:obj
    }
}
 export default{getResponse,addSignIn,addUser,addListUser,addCheckLoadingPage,addMarkDown}