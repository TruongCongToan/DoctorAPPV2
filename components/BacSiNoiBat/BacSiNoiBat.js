import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import allAction from '../redux/action/allAction'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const url_User = "https://api-truongcongtoan.herokuapp.com/api/users/"
const url_markdown = "https://api-truongcongtoan.herokuapp.com/api/markdowns/"
const url_Info = "https://api-truongcongtoan.herokuapp.com/api/doctorinfo/"

const BacSiNoiBat = (props) => {

  let listUsers = props.listUsers
  const navigation = useNavigation();
  const [SelectedUser, setSelectedUser] = useState({})
  const [markDownGet, setmarkDownGet] = useState({})
  const [doctorInfo, setdoctorInfo] = useState({})

  const dispatch = useDispatch();

  const onchange = (nativeEvent) => {
  }
const fetchData = (url,user_id,setData) =>{
  console.log("id la ",user_id);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'  
  };
  
  fetch(`${url}${user_id}`, requestOptions)
    .then(response => response.text())
    .then(result => setData(JSON.parse(result)))
    .catch(error => console.log('error', error));
}


  const onPressImg = (value) => {
    fetchData(url_User,value.email,setSelectedUser)
    fetchData(url_markdown,value.user_id,setmarkDownGet)
    fetchData(url_Info,value.user_id,setdoctorInfo)
    navigation.navigate("Chitietbacsi")
  }
  useEffect(() => {
    let check = false ;
    if (!check) {
     dispatch(allAction.userAction.addUser(SelectedUser))
     dispatch(allAction.userAction.addMarkDown(markDownGet))
     dispatch(allAction.userAction.addDoctorInfo(doctorInfo))
    }
    return () => {
      check = true
    }
  }, [SelectedUser])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', width: WIDTH,height:300}}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          horizontal
          style={{
            width: WIDTH, height: HEIGHT * 0.25
          }}
        >
         {
           listUsers&&listUsers.length >0 && listUsers.map((item, index) =>
              <TouchableOpacity key={index} onPress={() => onPressImg(item)}>
                <View style={{width:150,height:200,alignItems:'center',borderColor:'gray',backgroundColor:'white',marginTop:10,borderRadius:10,borderWidth:0.5, marginLeft: 20}}>
                <Image
                  key={index}
                  source={ {uri: item.image}}
                  resizeMethod='auto'
                  // HEIGHT * 0.15
                  style={{ width: 100, borderRadius:100,marginTop: 10, height: 100 }}
                />
                <Text style={{width:100,textAlign:'center',marginTop:20}}>Bác sĩ {`${item.full_name}`}</Text>
                </View>
              </TouchableOpacity>
            )
          }
         {/* </View> */}
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default BacSiNoiBat