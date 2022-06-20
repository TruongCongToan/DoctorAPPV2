import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
useNavigation
const HeaderScreen = () => {
    const navigation = useNavigation();

  return (
     <View
        style={{
          backgroundColor: "#ffffff",
          flexDirection: "row",
          justifyContent: "space-between",
          // borderColor:'red's
        }}
      >
        <TouchableOpacity
          style={{
            margin: 16,
            width: "10%",
            height: "100%",
          }}
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color="black"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <View>
          {/* <Image
            style={{width:100,height:40,top:10, borderRadius:10}}
            source={{
              uri: "https://images.unsplash.com/photo-1602934445884-da0fa1c9d3b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
            }}
          /> */}
          <Text
            style={{
              marginTop: 16,
              fontSize: 25,
              fontWeight: "bold",
              elevation: 1,
              textTransform: "uppercase",
            }}
          >
            Health Care
          </Text>
        </View>
        <Ionicons
          name=""
          size={30}
          color="black"
          style={{ margin: 20 }}
          onPress={() => {
            navigation.navigate("Search");
          }}
        />
      </View>
  )
}

export default HeaderScreen