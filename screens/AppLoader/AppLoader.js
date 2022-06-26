import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const AppLoader = () => {
  return (
    <View style = {[StyleSheet.absoluteFillObject,styles.container]}>
      <LottieView source={require('../../assets/image/blueheart.json')} autoPlay loop style={{justifyContent:'center',alignItems:'center',marginBottom:'10%'}}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)',
        height:'100%',
        zIndex:1
    }
})

export default AppLoader