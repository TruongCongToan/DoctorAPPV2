import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderLogo from '../HeaderScreen/HeaderLogo'
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from "react-redux";
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';

import { set } from 'lodash';

const ScheduleManage = () => {
  const navigation = useNavigation();

  const useLoginRole = useSelector(state => state.user.signInPerson.role);
  const [selectedStartDate, setselectedStartDate] = useState(null)
  const [ScheduleTime, setScheduleTime] = useState([])
  const [selectTime, setselectTime] = useState(ScheduleTime)

const [listDoctors, setlistDoctors] = useState([])  
const listDoctorRedux =  useSelector(state => state.user.listUser)
  const [selectedDoctorId, setselectedDoctorId] = useState(0)


  
  var url_Time = "https://api-truongcongtoan.herokuapp.com/api/allcode/TIME"



  const fetchDataTime = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(url_Time, requestOptions)
      .then(response => response.text())
      .then(result => { setScheduleTime(JSON.parse(result)) })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    fetchDataTime()
    setselectTime(ScheduleTime)
  }, [listDoctorRedux])

  useEffect(() => {
    let listdoctor = []
   if (listDoctorRedux && listDoctorRedux.length > 0) {
   
    listDoctorRedux.map(item =>{
    listdoctor.push(buildDataInput(item))
    })
   }
   setlistDoctors(listdoctor)
  }, [selectedDoctorId,listDoctorRedux]);

  const onDateChange = (date) => {
    setselectedStartDate(date)
  }
  console.log("ngay chon la ",selectedStartDate);
  const handleChangeDoctor = (value) => {
    setselectedDoctorId(value)
  }

  const handleOnpress = (item) => {
    const newItem = selectTime.map((val) => {
      if (val.id === item.id) {
        return { ...val, selected: !val.selected }
      } else {
        return val;
      }
    })
    setselectTime(newItem)
  }

  const buildDataInput = (inputData) => {
    let object = {};
    if (inputData) {

      object.value = inputData.user_id;
      object.label = `${inputData.full_name}`;
    }
    return object;
  }
const handleSave = () =>{
  let formatedDate = new Date(selectedStartDate).getTime();
  console.log("gia tri la ",formatedDate);
}


  return (
    <View style={{width:'100%',height:'100%'}}>
      <HeaderLogo />
      <ScrollView>
        <Text style={{
          fontSize: 20,
          textTransform: "uppercase",
          fontWeight: "bold",
          marginTop: 40,
          marginBottom: 10,
          textAlign: 'center'
        }}> Quản lý kế hoạch khám bệnh</Text>

        <Text style={{ fontSize: 13, fontWeight: '400', marginLeft: 10 }}> *Xin mời quản trị viên và bác sĩ lựa chọn kế hoạch khám bệnh trong tương lai</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Chọn bác sĩ</Text>
        {
          useLoginRole === "R1" ?
            <RNPickerSelect
              onValueChange={handleChangeDoctor}
              placeholder={{
                label: 'Chọn bác sĩ ... ',
                value: null,
              }}
              items={listDoctors}
            />
            : null
        }
        <View>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Chọn ngày đăng ký khám</Text>
          <CalendarPicker
            onDateChange={onDateChange}
          />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>Chọn khung thời gian khám</Text>
         <ScrollView horizontal={true} style={{ width: 500}}>
         <FlatList
            data={selectTime}
            keyExtractor={item => item.id}
            style={{width:350,marginLeft:5}}
            renderItem={({ item }) => {
              return (

                <TouchableOpacity onPress={() => handleOnpress(item)}  >
                  <View style={{ backgroundColor: item.selected ? 'green' : 'gray', marginTop: 10, padding: 10, width: '100%', borderRadius: 10 }} >
                    <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{item.valuevi}</Text>
                  </View>

                </TouchableOpacity>)
            }}
          />
         </ScrollView>
         <View style={{marginTop:20,marginBottom:20,justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity
            style={{
              width: '80%',
              height: 40,
              backgroundColor: "blue",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          onPress={handleSave}

          >
            <Text style={{ color: "white" }}>Lưu thông tin</Text>
          </TouchableOpacity>
        
         </View>
        </View>

      </ScrollView>


    </View>
  )
}

export default ScheduleManage