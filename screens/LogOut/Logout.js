import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import HeaderLogo from '../HeaderScreen/HeaderLogo'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import allAction from '../../components/redux/action/allAction';

const Logout = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const loginPerson = useSelector( state => state.user.signInPerson)

  const onPressLogout = () =>{
    dispatch(allAction.userAction.addSignIn(null));
    navigation.navigate("SignIn")
  }
  return (
    <View style={{flex:1}}>
      <HeaderLogo />
     <View style={{flexDirection:'row'}}>
       <Text style={{marginTop:20,marginLeft:10,fontSize:15}}> Đăng xuất khỏi tài khoản: </Text> 
       <Text style={{marginTop:15,marginLeft:13,fontSize:15,borderWidth:0.3,padding:5,width:150,backgroundColor:'white',fontWeight:'bold',textAlign:'center'}}>{loginPerson ? loginPerson.email: null}</Text>
       </View>
      <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>
      <TouchableOpacity 
      style={{
        width: '80%',
        height: 40,
        backgroundColor: "blue",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress ={onPressLogout}
      >
        <Text style={{color:'white'}}>Đăng xuất</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Logout