import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import NotifyScreen from "../../screens/NotifyScreen";
import ScheduleScreen from "../../screens/SchedulesScreen/SchedulesScreen";
import CommunityScreen from "../../screens/CommunityScreen";

import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import Toast from "react-native-toast-message";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#ffffff",
            borderRadius: 15,
            height: 80,
            shadowColor: "black",
          },
        }}
      >
        <Tab.Screen
          name="HomePage"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <>              
              <View style = {{alignItems:'center',justifyContent:'center',top:10}}>
              <FontAwesome5 name="home" size={30} color={focused?"#0092c5":"gray"} />
                <Text style = {{color: focused ? '#0092c5':'gray',fontSize:12}}>Trang chủ</Text>
              </View>
              </>
            ),
          }}
        />
        <Tab.Screen 
        name="Notify" 
        component={NotifyScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <>              
            <View style = {{alignItems:'center',justifyContent:'center',top:10}}>
            <MaterialIcons name="notifications-active" size={30} color={focused?"#0092c5":"gray"} />
              <Text style = {{color: focused ? '#0092c5':'gray',fontSize:12}}>Thông báo</Text>
            </View>
            </>
          ),
        }}
        />
        <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <>              
            <View style = {{alignItems:'center',justifyContent:'center',top:10}}>
            <MaterialCommunityIcons name="calendar-month-outline" size={30} color={focused?"#0092c5":"gray"} />
              <Text style = {{color: focused ? '#0092c5':'gray',fontSize:12}}>Lịch hẹn</Text>
            </View>
            </>
          ),
        }}
        />
        <Tab.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <>              
            <View style = {{alignItems:'center',justifyContent:'center',top:10}}>
            <Ionicons name="md-people" size={30} color={focused?"#0092c5":"gray"} />
              <Text style = {{color: focused ? '#0092c5':'gray',fontSize:12}}>Cộng đồng</Text>
            </View>
            </>
          ),
        }}
        />
      </Tab.Navigator>
      <Toast />
    </>
  );
};
const styles = StyleSheet.create({});

export default Tabs;
