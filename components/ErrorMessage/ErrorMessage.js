import { View, Text,StyleSheet } from 'react-native'
import React,{useState} from 'react'

const ErrorMessage = ({type}) => {

    const [error, seterror] = useState({})

  return (
    <View>
     
     <Text style={styles.error}> {error[type]}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
 
    error: {
      fontSize: 12,
      color: 'red',
      marginLeft:15,
      marginBottom:10,
      width:"100%"
    }
  });

export default ErrorMessage