

import {ADD_ONE_SPECIALTIES} from '../constant'

const initialState = {
    oneSpecialties:{}
}
const specialtiesReducer =(state= initialState,action)=>{
    switch(action.type){
    case ADD_ONE_SPECIALTIES:
        return {
            ...state,
            oneSpecialties:action.payload,
        }
  
    default: return state
    }
    
}

export default specialtiesReducer