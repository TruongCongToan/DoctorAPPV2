

import {ADD_ONE_CLINIC} from '../constant'

const initialState = {
    oneClinic:{}
}
const clinicReducer =(state= initialState,action)=>{
    switch(action.type){
    case ADD_ONE_CLINIC:
        return {
            ...state,
            oneClinic:action.payload,
        }
  
    default: return state
    }
    
}

export default clinicReducer