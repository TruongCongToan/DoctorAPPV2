import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from '../../assets/image/bkhcare1.png'
const HeaderScreen = ({navigation}) => {
  return (
     <View
        style={{
          backgroundColor: "#ffffff",
          flexDirection: "row",
          // justifyContent: "space-between",
          // borderColor:'red's
          borderBottomWidth:0.2,
          borderBottomColor:'gray'
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
            name="menu"
            size={30}
            color="black"
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </TouchableOpacity>
        <View style={{flexDirection:'row',marginLeft:30}}>
        <Image
        style={{width:70,height:60}}
          source={Logo}
          resizeMode="contain"
        />
          <Text
            style={{
              marginTop: 16,
              fontSize: 25,
              fontWeight: "bold",
              elevation: 1,
              textTransform: "uppercase",
            }}
          >
            BKH CARE
          </Text>
        </View>
        <Ionicons
          name="search"
          size={30}
          color="black"
          style={{ margin: 16 }}
          onPress={() => {
            navigation.navigate("Search");
          }}
        />
      </View>
  )
}

export default HeaderScreen