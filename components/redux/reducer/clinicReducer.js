

import {ADD_ONE_CLINIC,ADD_CLINIC_SPECIALTIES_CHECK} from '../constant'

const initialState = {
    oneClinic:{},
    ClinicSpecialtiesCheck:{}
}
const clinicReducer =(state= initialState,action)=>{
    switch(action.type){
    case ADD_ONE_CLINIC:
        return {
            ...state,
            oneClinic:action.payload,
        }
    case ADD_CLINIC_SPECIALTIES_CHECK:
            return {
                ...state,
                ClinicSpecialtiesCheck:action.payload,
            }
    default: return state
    }
    
}

export default clinicReducer