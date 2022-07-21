import {ADD_ONE_CLINIC,ADD_CLINIC_SPECIALTIES_CHECK} from '../constant'

const addOneClinic = ( obj) =>{
    console.log("Object Redux Action ",obj);
    return{
        type:ADD_ONE_CLINIC,
        payload:obj
    }
}

const addClinicSpecialtiesCheck = ( obj) =>{
    console.log("Object Redux Action ",obj);
    return{
        type:ADD_CLINIC_SPECIALTIES_CHECK,
        payload:obj
    }
}
 export default{addOneClinic,addClinicSpecialtiesCheck}