//tong hop cac reducers con lai

import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    whitelist:['user']
  }
// combineReducers Sde tong hop lai tat ca ca reducer 
const rootReducers = combineReducers({
   
  user:userReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducers)

const  store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;

