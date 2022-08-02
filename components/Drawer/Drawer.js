import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

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
import { useSelector } from 'react-redux';
import ScheduleManage from '../../screens/ScheduleManage/ScheduleManage';
import MarkdownScreen from '../../screens/MarkdownScreen/MarkdownScreen';
import ChuyenKhoaScreen from '../../screens/ChuyenKhoaScreen/ChuyenKhoaScreen';
import CoSoYTeAdminScreen from '../../screens/CoSoYTeScreen/CoSoYTeAdminScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [signInPerson, setsignInPerson] = useState({})
  var personDataLogin = useSelector(state => state.user.signInPerson)
  useEffect(() => {
    setsignInPerson(personDataLogin)
  }, [personDataLogin])

  return (

    // <NavigationConßtainer>
    <Drawer.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0.1,
          shadowOpacity: 0,

        },
        headerShown: false
        ,
        headerTitle: '',

      }}
      drawerContent={(props) => <CutomDrawer {...props} />}
    >
      <Drawer.Screen name="Trang chủ" component={BottomTabNavigator} />
      {
        signInPerson && signInPerson.role && (signInPerson.role === "R3")
          ?
          <>
            {
              personDataLogin ?
                <>
                  <Drawer.Screen name="Giành cho bệnh nhân" component={ForVictim} />
                  <Drawer.Screen name="Về chúng tôi" component={AboutUs} />
                  <Drawer.Screen name="Liên hệ" component={ContactUs} />
                  <Drawer.Screen name="Câu hỏi thường gặp" component={CommonQuestion} />
                  <Drawer.Screen name="Điều khoản" component={PrivacyScreen} />
                  <Drawer.Screen name="Đăng xuất" component={Logout} />
                </>
                :
                <>
                  <Drawer.Screen name="Giành cho bệnh nhân" component={ForVictim} />
                  <Drawer.Screen name="Về chúng tôi" component={AboutUs} />
                  <Drawer.Screen name="Liên hệ" component={ContactUs} />
                  <Drawer.Screen name="Câu hỏi thường gặp" component={CommonQuestion} />
                  <Drawer.Screen name="Điều khoản" component={PrivacyScreen} />
                </>
            }
          </>
          :
          <>
            {
              signInPerson && signInPerson.role && (signInPerson.role === "R1")
                ?
                <>
                  <Drawer.Screen name="Quản lý lịch khám bệnh" component={ScheduleManage} />
                  <Drawer.Screen name="Quản lý thông tin của bác sĩ" component={MarkdownScreen} />
                  <Drawer.Screen name="Quản lý chuyên khoa" component={ChuyenKhoaScreen} />
                  <Drawer.Screen name="Quản lý cơ sở y tế" component={CoSoYTeAdminScreen} />
                  <Drawer.Screen name="Đăng xuất" component={Logout} />
                </>
                :
                <>
                  {
                    signInPerson && signInPerson.role && (signInPerson.role === "R2")
                      ?
                      <>
                        <Drawer.Screen name="Về chúng tôi" component={AboutUs} />
                        <Drawer.Screen name="Liên hệ" component={ContactUs} />
                        <Drawer.Screen name="Đăng xuất" component={Logout} />
                      </>
                      : null
                  }
                </>
            }
          </>


      }


    </Drawer.Navigator>
    // </NavigationConßtainer>
  )
}

export default DrawerNavigator