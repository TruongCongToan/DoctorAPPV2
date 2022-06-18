import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'

import { createDrawerNavigator } from "@react-navigation/drawer";

// import HomeScreen from '../../screens/HomeScreen';
import AboutUs from '../../screens/AboutUsScreen/AboutUs';
import ContactUs from '../../screens/ContactUsScreen/ContactUs'
import ForVictim from '../../screens/ForVictimScreen/ForVictim'
import CommonQuestion from '../../screens/CommonQuestionScreen/CommonQuestion';
import PrivacyScreen from '../../screens/PrivacyScreen/PrivacyScreen';

import Logout from '../../screens/LogOut/Logout';
import { BottomTabNavigator } from '../BottomTabNavigator/BottomTabNavigator';
import CutomDrawer from './CutomDrawer';

const Drawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  }
  ,
  headerTintColor: "white",
  headerBackTitle: "Back",
  
};

const DrawerNavigator = () => {

  return (
    
    // <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" 
      screenOptions={{
        headerStyle:{
          backgroundColor:'transparent',
          elevation:0.1,
          shadowOpacity:0,
           
        },
        headerShown:false
        ,
        headerTitle:'',
      
      }}
        drawerContent={(props) => <CutomDrawer {...props}/>}
      >
         <Drawer.Screen name="Trang chủ" component={BottomTabNavigator} />
        <Drawer.Screen name="Giành cho bệnh nhân" component={ForVictim} />
        <Drawer.Screen name="Về chúng tôi" component={AboutUs} />
        <Drawer.Screen name="Liên hệ" component={ContactUs} />
        <Drawer.Screen name="Câu hỏi thường gặp" component={CommonQuestion} />
        <Drawer.Screen name="Điều khoản" component={PrivacyScreen} />
        {/* <Drawer.Screen name="Đăng xuất" component={Logout} /> */}

      </Drawer.Navigator>
    // </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  root:{
    textAlign:'center'
  }
})
export default DrawerNavigator