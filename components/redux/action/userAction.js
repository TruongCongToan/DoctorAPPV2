import {ADD_USER,ADD_SIGN_IN,ADD_LIST_USER,ADD_LOADING_PAGE,ADD_MARKDOWN,ADD_DOCTORINFO,ADD_BOOKING_INFO} from '../constant'

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
const addDoctorInfo = (obj) =>{
    return{
        type:ADD_DOCTORINFO,
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
const addBookingInfo = (obj) =>{
    return{
        type:ADD_BOOKING_INFO,
        payload:obj
    }
}
 export default{addDoctorInfo,addSignIn,addUser,addListUser,addCheckLoadingPage,addMarkDown,addBookingInfo}