import { View, Text, ScrollView, FlatList,RefreshControl, StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderLogo from '../HeaderScreen/HeaderLogo'
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import _ from 'lodash';
import Toast from "react-native-toast-message";
import moment from "moment";
import "moment/locale/vi";

const ScheduleManage = () => {
  const [selectedStartDate, setselectedStartDate] = useState(null)
  const [ScheduleTime, setScheduleTime] = useState([])
  const [selectTime, setselectTime] = useState(ScheduleTime)
  const [selectTimeDataCheck, setselectTimeDataCheck] = useState([])
  const [listDoctors, setlistDoctors] = useState([])
  const [selectedDoctorId, setselectedDoctorId] = useState(0)
  const [scheduleList, setscheduleList] = useState([])
  const [listUsersData, setlistUsersData] = useState([])
  const [eror, seteror] = useState({})
  const MAX_NUMBER = 10;
  let result = [];

  var url_Time = "https://api-truongcongtoan.herokuapp.com/api/allcode/TIME"
  var url_Schedule = "https://api-truongcongtoan.herokuapp.com/api/schedules/"
  var url_User = "https://api-truongcongtoan.herokuapp.com/api/users/doctors"

  const fetchDataTime = (url, setData) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => { setData(JSON.parse(result)) })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    fetchDataTime(url_Time, setScheduleTime)
    fetchDataTime(url_Schedule, setscheduleList)
    fetchDataTime(url_User, setlistUsersData)
  }, [])
  const fetchDataById = (url, setData,id) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`${url}${id}`, requestOptions)
      .then(response => response.text())
      .then(result => { 
        setData(JSON.parse(result))
       })
      .catch(error => console.log('error', error));
  }
  useEffect(() => {
    fetchDataTime(url_Time, setScheduleTime)
    fetchDataTime(url_Schedule, setscheduleList)
    fetchDataTime(url_User, setlistUsersData)
  }, [])
  useEffect(() => {
    setselectTime(ScheduleTime)

  }, [ScheduleTime])
  const [addDataResponse, setaddDataResponse] = useState([])
  const handleLogin = async (url, data = {}) => {
    console.log("calling data ...");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setaddDataResponse(JSON.parse(result))
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchDataById(url_Schedule,setscheduleList,selectedDoctorId)
  }, [addDataResponse])

  useEffect(() => {
    let listdoctor = []
    if (listUsersData && listUsersData.length > 0) {

      listUsersData.map(item => {
        listdoctor.push(buildDataInput(item))
      })
    }
    setlistDoctors(listdoctor)
  }, [listUsersData]);
  
  const onDateChange = (date) => {
    let d = new Date(date);
    let e = new Date(d.getTime() + 3.6e6);
    let change = e.toISOString().replace("Z", "+07:00");
    let changeCopy = change.toString()
    let timestamp = changeCopy.replace("T06","T00")
    setselectedStartDate(timestamp)
  }
  const handleChangeDoctor = (value) => {
    setselectedDoctorId(value)
  }
  const buildDataInput = (inputData) => {
    let object = {};
    if (inputData) {

      object.value = inputData.user_id;
      object.label = `${inputData.full_name}`;
    }
    return object;
  }
  const validateBlank = () => {
    selectTimeCheck()
    let errors = {};
    let formIsValid = true;
    if (!selectedDoctorId) {
      formIsValid = false;
      errors["doctor"] = "Bạn cần phải chọn bác sỹ khám!";
    } else {
      if (!selectedStartDate) {
        formIsValid = false;
        errors["date"] = "Bạn cần phải chọn ngày đăng ký khám!";
      } else {
        if (selectTimeDataCheck.length === 0 ) {
          formIsValid = false;
          errors["time"] = "Bạn cần phải chọn khung thời gian khám!";
        }
      }
    }
    seteror(errors);
    return formIsValid;
  }
 
  useEffect(() => {
    validateBlank()
  }, [selectedDoctorId, selectedStartDate, selectTime])

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
  const selectTimeCheck = () =>{
    let selectedTimeArr =[]
    selectTime.map( item =>{
      if (item.selected) {
        selectedTimeArr.push(item)
      }
    })
    setselectTimeDataCheck(selectedTimeArr)
  }
  const handleSave = () => {

    if (!validateBlank()) {

      if (eror["doctor"]) {
        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: `${eror['doctor']}`,
        });
      } else {
        if (eror['date']) {
          Toast.show({
            type: "error",
            text1: "Thông báo",
            text2: `${eror["date"]}`,
          });
        } else {
          if (eror['time']) {
            console.log("gia tri ",eror["time"]);
            Toast.show({
              type: "error",
              text1: "Thông báo",
              text2: `${eror['time']}`,
            });
          } 
        }
      }
    }else {
        // let formatedDateDataPush = moment(selectedStartDate).unix() * 1000;
      let formatedDateDataPush = new Date(selectedStartDate).getTime();
      let selectedTimeDataPush = selectTime.filter(item => item.selected === true);
      if (selectedTimeDataPush && selectedTimeDataPush.length > 0) {
        selectedTimeDataPush.map(item => {
          let object = {};
          object.maxnumber = MAX_NUMBER;
          object.date = formatedDateDataPush.toString();
          object.doctorid = selectedDoctorId;
          object.timetype = item.key;
          result.push(object);
        });
        //check exist
        const myDifferences = _.differenceWith(result, scheduleList, (a, b) => {
          return a.timetype === b.timetype && a.date === b.date;
        });
        if (myDifferences && myDifferences.length > 0) {
          let payload = {
            "bulkSchedules": myDifferences
          }
     
          console.log("payload",payload);
          handleLogin(url_Schedule, payload)
          Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Đã cập nhật lịch khám thành công!",
          });
          // alert("Đã cập nhật lịch khám thành công!")
        }
      }
    }
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
     
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);
  
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <HeaderLogo />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Text style={{
          fontSize: 20,
          textTransform: "uppercase",
          fontWeight: "bold",
          marginTop: 40,
          marginBottom: 10,
          textAlign: 'center'
          
        }}> Quản lý kế hoạch khám bệnh</Text>

        <Text style={{ fontSize: 13, fontWeight: '400', marginLeft: 10 }}> *Xin mời quản trị viên và bác sĩ lựa chọn kế hoạch khám bệnh trong tương lai</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10 ,color:eror["doctor"] ? "red":"black"}}>1. Chọn bác sĩ</Text>
        <RNPickerSelect
          onValueChange={handleChangeDoctor}
          placeholder={{
            label: 'Chọn bác sĩ ... ',
            value: null,
          }}
          items={listDoctors}
        />
        <View>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 10, marginTop: 10,color:eror["date"] ? "red":"black" }}>2. Chọn ngày đăng ký khám</Text>
          <CalendarPicker
            onDateChange={onDateChange}
          />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10,color:eror["time"] ? "red":"black" }}>3. Chọn khung thời gian khám</Text>
          <ScrollView horizontal={true} style={{ width: 500 }}>
            <FlatList
              data={selectTime}
              keyExtractor={item => item.id}
              style={{ width: 350, marginLeft: 5 }}
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
          <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});

export default ScheduleManage