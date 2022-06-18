import {ADD_USER,GET_RESPONSE,ADD_SIGN_IN,ADD_LIST_USER} from '../constant'

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
 export default{getResponse,addSignIn,addUser,addListUser}