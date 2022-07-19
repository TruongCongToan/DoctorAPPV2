import {ADD_ONE_CLINIC} from '../constant'

const addOneClinic = ( obj) =>{
    console.log("Object Redux Action ",obj);
    return{
        type:ADD_ONE_CLINIC,
        payload:obj
    }
}

 export default{addOneClinic}