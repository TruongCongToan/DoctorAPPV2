import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useSelector } from "react-redux";
const CutomDrawer = (props) => {


  var dataLogin = useSelector(state => state.user.signInPerson)
  // console.log("gia tri cua nguoi dang login ",dataLogin);

  return (
    <>
      <DrawerContentScrollView {...props}>
        {dataLogin ?
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
              {dataLogin ? <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {dataLogin.full_name}
              </Text> : null}
              {dataLogin ? <Text style={{ fontSize: 13 }}> {dataLogin.email}</Text> : null}
            </View>

           {
            dataLogin ? 
             <View style={{ width: 40, height: 40, borderRadius: 30 }}>
            {dataLogin.image ?
              <Image
                style={{ width: 40, height: 40, borderRadius: 30 }}
                source={
                  { uri: dataLogin.image }
                }
              />
              :
              <EvilIcons name="user" size={45} color="black" />
            }

          </View>
          : null
           }

          </View> : null
        }
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};

export default CutomDrawer;
