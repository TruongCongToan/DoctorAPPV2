import { View, Text,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'

const option = ['red','blue','yellow','green']
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;
const ModalPicker = (props) => {
  return (
   <TouchableOpacity
   onPress={() => props.changeModalVisibility(false)}
   style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',

   }}
   >
    <View style ={{

        backgroundColor:'green',
        borderRadius:10
    }}>

    </View>
   </TouchableOpacity>
  )
}

export default ModalPicker