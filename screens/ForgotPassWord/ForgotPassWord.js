import { 
    View, 
    Text,
    StyleSheet 
} from 'react-native'
import React,{useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useNavigation } from '@react-navigation/native'

const ForgotPassWord = () => {


   const [email, setemail] = useState('');

   const navigation = useNavigation();

    //onConfirmPresses
    const onSendPresses = () =>{
        console.warn("email thu duoc la ",email);
    }
    //back to sign in
    const onSignInPressed = () =>{
      navigation.navigate('SignIn')
    }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
            <Text style = {styles.title}>Đặt lại mật khẩu</Text>
            <CustomInput
            placeholder="Nhập địa chỉ mail đã đăng ký tài khoản"
            value={email}
            setValue= {setemail}
            />
            <CustomButton
            text="Gửi"
            onPress={onSendPresses}
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

export default ForgotPassWord