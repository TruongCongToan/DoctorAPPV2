import { View, Text, Image, TextInput, StyleSheet,ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import { useSelector } from "react-redux";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import "moment/locale/vi";
import RadioGroup from 'react-native-radio-buttons-group';

const BookingScheduleScreen = () => {
  var bookingInfoGet = useSelector((state) => state.user.bookingInfo);
  var dataOneUser = useSelector((state) => state.user.getoneuser);
  var doctorInfo = useSelector((state) => state.user.doctorInfo);

     const [full_name, setfull_name] = useState('')
    const [email, setemail] = useState('')
    const [phone_number, setphone_number] = useState('')
    const [address, setaddress] = useState('')
    const [bookFor, setbookFor] = useState('')
    const [gender, setgender] = useState('')

  const [error, seterror] = useState({});

  const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Nam',
    value: 'M'
}, {
    id: '2',
    label: 'Nữ',
    value: 'F'
}]

const radioButtonsBookForData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Đặt cho mình',
    value: 'B1'
}, {
    id: '2',
    label: 'Đặt cho người thân',
    value: 'B2'
}]
const [radioButtons, setRadioButtons] = useState(radioButtonsData)
const [radioButtonsBookFor, setRadioButtonsBookFor] = useState(radioButtonsBookForData)
function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
}
const onPressRadioBookFor = (onPressRadioBookFor) =>{
    setRadioButtonsBookFor(onPressRadioBookFor)
}
useEffect(() => {
  let check = false
    if (!check) {
      radioButtons.map( item =>{
        if (item.selected) {
            setgender(item.value)
        }
      })
    }
  return () => {
    check =true
  }
}, [radioButtons])
useEffect(() => {
    let check = false
      if (!check) {
        radioButtonsBookFor.map( item =>{
          if (item.selected) {
              setbookFor(item.value)
          }
        })
      }
    return () => {
      check =true
    }
  }, [radioButtonsBookFor])

  console.log("bokk",bookFor);
  return (
    <View style={{ flex: 1 }}>
      <HeaderLogo />
        <ScrollView>
      <View style={{ flexDirection: "row" }}>
        {dataOneUser.image ? (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginTop: 20,
              marginLeft: 10,
              borderWidth: 0.3,
              borderColor: "black",
            }}
            source={{ uri: dataOneUser.image }}
          />
        ) : (
          <EvilIcons name="user" size={100} color="black" />
        )}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "column", margin: 20 }}>
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Đăng ký khám
            </Text>
            <Text style={{ paddingTop: 10, color: "#0092c5", fontSize: 15 }}>
              Bác sĩ {dataOneUser.full_name}
            </Text>
            <Text style={{ fontSize: 13, paddingTop: 5 }}>
              {bookingInfoGet.timetypeValue
                ? bookingInfoGet.timetypeValue
                : null}{" "}
              ,{" "}
              {moment(new Date(bookingInfoGet.date))
                .locale("vi")
                .format("dddd - DD/MM/YYYY")}
            </Text>
            <Text style={{ paddingTop: 5 }}>Miễn phí đặt lịch</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          margin: 20,
          height: 50,
          alignItems: "center",
          borderWidth: 0.3,
          borderColor: "orange",
        }}
      >
        <Ionicons name="radio-button-on" size={20} color="green" />
        <Text>
          Giá khám:{" "}
          {doctorInfo.allCodePrice ? doctorInfo.allCodePrice.valuevi : null} VNĐ
        </Text>
      </View>
      <Text style={[{paddingLeft:20},error["full_name"] ? styles.errorBorder : styles.nonErrorBorder]}>Họ và tên</Text>
      <View
        style={[
          {
            width: "auto",
            height: 40,
            borderWidth: 0.3,
            borderColor: "gray",
            margin: 20,
            flexDirection:'row'
          },
          error["full_name"] ? styles.errorBorder : styles.nonErrorBorder,
        ]}
      >
        <FontAwesome5 name="user-alt" size={15} style={{marginLeft:10,marginTop:10}} color="black" />

        <TextInput
          style={[styles.inputColor]}
          value={full_name ? full_name : null}
          onChangeText={setfull_name}
          underlineColorAndroid="transparent"
          placeholder="Nhập họ và tên (bắt buộc)"
          placeholderTextColor="#babfc3"
        />
      </View>
        <View style={[{flexDirection:'row'}, 
         error["gender"] ? styles.errorBorder : styles.nonErrorBorder]}>
            <Text style={[{paddingLeft:20}, error["gender"] ? styles.errorBorder : styles.nonErrorBorder]}>Giới tính</Text>
        <RadioGroup 
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            style={{marginLeft:20}}
        />
        </View>
        <>
        <Text style={[{paddingLeft:20,paddingTop:10}, error["email"] ? styles.errorBorder : styles.nonErrorBorder]}>Địa chỉ email</Text>
        <View
        style={[
          {
            width: "auto",
            height: 40,
            borderWidth: 0.3,
            borderColor: "gray",
            margin: 20,
            flexDirection:'row'
          },
          error["email"] ? styles.errorBorder : styles.nonErrorBorder,
        ]}
      >
        <Ionicons  style={{marginLeft:10,marginTop:10}}  name="mail" size={17} color="black" />
        <TextInput
          style={[styles.inputColor]}
          value={email ? email : null}
          onChangeText={setemail}
          underlineColorAndroid="transparent"
          placeholder="Nhập địa chỉ email (bắt buộc)"
          placeholderTextColor="#babfc3"
        />
      </View>
        </>
        <>
        <Text style={[{paddingLeft:20,paddingTop:10}, error["phone_number"] ? styles.errorBorder : styles.nonErrorBorder]}>Số điện thoại</Text>
        <View
        style={[
          {
            width: "auto",
            height: 40,
            borderWidth: 0.3,
            borderColor: "gray",
            margin: 20,
            flexDirection:'row'
          },
          error["phone_number"] ? styles.errorBorder : styles.nonErrorBorder,
        ]}
      >
        <FontAwesome5  style={{marginLeft:10,marginTop:10}}  name="phone" size={17} color="black" />
        <TextInput
          style={[styles.inputColor]}
          value={phone_number ? phone_number : null}
          onChangeText={setphone_number}
          underlineColorAndroid="transparent"
          placeholder="Nhập số điện thoại (bắt buộc)"
          placeholderTextColor="#babfc3"
        />
      </View>
        </>
        <>
        <Text style={[{paddingLeft:20,paddingTop:10}, error["address"] ? styles.errorBorder : styles.nonErrorBorder]}>Địa chỉ</Text>
        <View
        style={[
          {
            width: "auto",
            height: 40,
            borderWidth: 0.3,
            borderColor: "gray",
            margin: 20,
            flexDirection:'row'
          },
          error["address"] ? styles.errorBorder : styles.nonErrorBorder,
        ]}
      >
        <FontAwesome5  style={{marginLeft:10,marginTop:10}}  name="address-card" size={17} color="black" />
        <TextInput
          style={[styles.inputColor]}
          value={address ? address : null}
          onChangeText={setaddress}
          underlineColorAndroid="transparent"
          placeholder="Nhập địa chỉ (bắt buộc)"
          placeholderTextColor="#babfc3"
        />
      </View>
        </>
       
        <View style={[{flexDirection:'row'}, 
         error[" bookFor"] ? styles.errorBorder : styles.nonErrorBorder]}>
            <Text style={[{paddingLeft:20}, error[" bookFor"] ? styles.errorBorder : styles.nonErrorBorder]}>Đặt cho ai</Text>
        <RadioGroup 
            radioButtons={radioButtonsBookFor}
            onPress={onPressRadioBookFor}
            style={{marginLeft:20}}
        />
        </View>
       
        </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  inputColor: {
    height: 40,
    marginLeft: 12,
    width: "100%",
    // borderWidth: 0.5,
    padding: 10,
  },
  inputColorEmail: {
    height: 40,
    width: "80%",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    marginRight: 0,
  },
  errorBorder: {
    borderColor: "red",
    color:'red'
  },
  nonErrorBorder: {
    borderColor: "black",
  },
});
export default BookingScheduleScreen;
