import { View, Text,TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/image/bkhcare1.png'
const HeaderScreen = () => {
    const navigation = useNavigation();

  return (
     <View
        style={{
          backgroundColor: "#ffffff",
          flexDirection: "row",
          // justifyContent: "space-between",
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
            name="arrow-back"
            size={30}
            color="black"
            onPress={() => {
              navigation.goBack();
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
          name=""
          size={30}
          color="black"
          style={{ margin: 15 }}
          onPress={() => {
            navigation.navigate("Search");
          }}
        />
      </View>
  )
}

export default HeaderScreen