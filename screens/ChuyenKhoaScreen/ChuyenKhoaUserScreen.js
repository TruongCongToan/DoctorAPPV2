import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import allAction from '../../components/redux/action/allAction'
import PropTypes from 'prop-types';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const url_Specialties = "https://api-truongcongtoan.herokuapp.com/api/specialties/"
const url_markdown = "https://api-truongcongtoan.herokuapp.com/api/markdowns/"
const url_Info = "https://api-truongcongtoan.herokuapp.com/api/doctorinfo/specialties/"

const ChuyenKhoaUserScreen = (props) => {

  let listSpecialties = props.listSpecialties
  const navigation = useNavigation();
  const [SelectedUser, setSelectedUser] = useState({})
  const [selectedSpecialties, setselectedSpecialties] = useState({})
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
    // fetchData(url_Specialties,value.id,setselectedSpecialties)
    dispatch(allAction.specialtiesAction.addOneSpecialties(value.id))
    // fetchData(url_markdown,value.user_id,setmarkDownGet)
    // fetchData(url_Info,value.user_id,setdoctorInfo)
    navigation.navigate("Chitietchuyenkhoa")
    // console.log("gia tr la ",value.id);
  }

  // useEffect(() => {
  //   let check = false ;
  //   if (!check) {
  //    dispatch(allAction.specialtiesAction.addOneSpecialties(selectedSpecialties))
   
  //   }
  //   return () => {
  //     check = true
  //   }
  // }, [selectedSpecialties])

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
           listSpecialties&&listSpecialties.length >0 && listSpecialties.map((item, index) =>
              <TouchableOpacity key={index} onPress={() => onPressImg(item)}>
                <View style={{width:200,height:200,alignItems:'center',borderColor:'gray',backgroundColor:'white',marginTop:10,borderRadius:10,borderWidth:0.5, marginLeft: 20}}>
                <Image
                  key={index}
                  source={ {uri: item.image}}
                  resizeMethod='auto'
                  // HEIGHT * 0.15
                  style={{ width: '100%', height: 150 ,borderRadius:10}}
                />
                <Text style={{width:100,textAlign:'center',marginTop:20}}>{`${item.name}`}</Text>
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
ChuyenKhoaUserScreen.propTypes = {
  name: PropTypes.array
};
export default ChuyenKhoaUserScreen