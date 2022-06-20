import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const CutomDrawer = (props) => {

  const navigation = useNavigation();
  const LogoutPress = () => {
    navigation.navigate("")
  }
  return (
    <>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
            backgroundColor: "#f6f6f6",
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {
                (useSelector(state => state.user.signInPerson.full_name))
              }
            </Text>
            <Text style={{ fontSize: 13 }}> {(useSelector(state => state.user.signInPerson.email))}</Text>
          </View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 30 }}
            source={{
              uri: "https://images.unsplash.com/photo-1655453421065-20c9655a229d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
            }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 50,
          right: 0,
          left: 0,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
      >
        <Text style={{}} onPress={LogoutPress}>Đăng xuất</Text>
      </TouchableOpacity>
    </>
  );
};

export default CutomDrawer;
