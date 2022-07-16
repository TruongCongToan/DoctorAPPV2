import {ADD_ONE_SPECIALTIES} from '../constant'

const addOneSpecialties = ( obj) =>{
    return{
        type:ADD_ONE_SPECIALTIES,
        payload:obj
    }
}

 export default{addOneSpecialties}