import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
const HomeScreen = ({ navigation }) => {
  return (
  <SafeAreaView style={{flex:1}}>
    <TouchableOpacity style={{alignContent:'flex-end',margin:16}}>

    <Ionicons name="menu" size={30} color="black"  onPress={() => {navigation.goBack()}}
    />
    </TouchableOpacity>
   
  </SafeAreaView>
  )
}

export default HomeScreen