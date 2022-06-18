import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from '../../screens/SignInScreen/SignInScreen'
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen'
import ForgotPassWord from '../../screens/ForgotPassWord/ForgotPassWord'
import NewPassWord from '../../screens/NewPassWord/NewPassWord'
import HomeScreen from "../../screens/HomeScreen";

const Stack = createStackNavigator();

const  MainStackNavigator = () =>{
    return(
        <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      
      </Stack.Navigator>
    )
}

  
  export { MainStackNavigator };
