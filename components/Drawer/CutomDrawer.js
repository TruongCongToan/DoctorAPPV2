import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import EvilIcons from "@expo/vector-icons/EvilIcons";


import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const CutomDrawer = (props) => {

  const navigation = useNavigation();
  const LogoutPress = () => {
    navigation.navigate("")
  }
  var dataLogin = useSelector(state => state.user.signInPerson)
  // console.log("gia tri cua nguoi dang login ",dataLogin);

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
                (dataLogin.full_name)
              }
            </Text>
            <Text style={{ fontSize: 13 }}> {(useSelector(state => state.user.signInPerson.email))}</Text>
          </View>
          <View style={{ width: 40, height: 40, borderRadius: 30}}>
            {dataLogin.image ?
              <Image
                style={{ width: 40, height: 40, borderRadius: 30 }}
                source={
                  dataLogin.image
                }
              />
              :
              <EvilIcons name="user" size={45} color="black" />
            }
          </View>

        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};

export default CutomDrawer;
