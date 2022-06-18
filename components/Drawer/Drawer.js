import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import AboutUs from '../../screens/AboutUsScreen/AboutUs';
import ContactUs from '../../screens/ContactUsScreen/ContactUs'
import ForVictim from '../../screens/ForVictimScreen/ForVictim'
import CommonQuestion from '../../screens/CommonQuestionScreen/CommonQuestion';
import PrivacyScreen from '../../screens/PrivacyScreen/PrivacyScreen';

import { NavigationContainer } from '@react-navigation/native';
import Logout from '../../screens/LogOut/Logout';


const Drawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    
    // <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" 
      screenOptions={{headerShown : false}}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="ForVictim" component={ForVictim} />
        <Drawer.Screen name="AboutUs" component={AboutUs} />
        <Drawer.Screen name="ContactUs" component={ContactUs} />
        <Drawer.Screen name="CommonQuestion" component={CommonQuestion} />
        <Drawer.Screen name="Privacy" component={PrivacyScreen} />
        <Drawer.Screen name="Logout" component={Logout} />

      </Drawer.Navigator>
    // </NavigationContainer>
  )
}

export default Drawer