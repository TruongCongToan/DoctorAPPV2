import { View, Text } from 'react-native'
import React from 'react'
import HeaderScreen from "../HeaderScreen/HeaderScreen";

const NotifyScreen = ({navigation}) => {
  return (
    <View style ={{flex:1}}>
   <HeaderScreen navigation={navigation} />
      <Text style={{ padding: 20, fontWeight: '300' }}>Hiện tại bạn không có thông báo nào </Text>
    </View>
  )
}

export default NotifyScreen