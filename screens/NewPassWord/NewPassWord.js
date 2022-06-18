import { 
  View, 
  Text,
  StyleSheet 
} from 'react-native'
import React,{useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

const NewPassWord = () => {
 const [password, setpassword] = useState('');
  //onConfirmPresses
  const onConfirmPresses = () =>{
      console.warn("onConfirmPresses");
  }
  //back to sign in
  const onSignInPressed = () =>{
      console.warn("onSignInPressed");
  }
return (
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
          <Text style = {styles.title}>Đặt lại mật khẩu</Text>
          <CustomInput
          placeholder="Nhập địa chỉ mail"
          value={password}
          setValue= {setpassword}
          />
          <CustomButton
          text="Gửi"
          onPress={onConfirmPresses}
          type = "PRIMARY"
          />
          
           {/* <CustomButton
          text="Gửi lại mã"
          onPress={onSendPresses}
          type = "SECONDARY"
          /> */}
           <CustomButton
          text="Quay lại trang đăng nhập"
          onPress={onSignInPressed}
          type = "TERTIARY"
          />
    </View>
  </ScrollView>
)
}

const styles = StyleSheet.create({
  root:{
      alignItems: "center",
      padding: 20,
  },
  title:{
      fontSize: 24,
      fontWeight: 'bold',
      color: '#051C60',
      margin: 10,
  }

})

export default NewPassWord