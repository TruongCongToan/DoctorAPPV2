import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import { useSelector } from "react-redux";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import "moment/locale/vi";
import RadioGroup from "react-native-radio-buttons-group";
import Toast from "react-native-toast-message";
import { showMessage, hideMessage } from "react-native-flash-message";


const BookingScheduleScreen = () => {
  var bookingInfoGet = useSelector((state) => state.user.bookingInfo);
  var dataOneUser = useSelector((state) => state.user.getoneuser);
  var doctorInfo = useSelector((state) => state.user.doctorInfo);
  var signInPerson = useSelector(state => state.user.signInPerson);


  const [full_name, setfull_name] = useState(null);
  const [email, setemail] = useState(null);
  const [phone_number, setphone_number] = useState(null);
  const [address, setaddress] = useState(null);
  const [birth_year, setbirth_year] = useState(0);
  const [gender, setgender] = useState(null);
  const [reason, setreason] = useState(null);

  const [error, seterror] = useState({});
const url_Email = "https://api-truongcongtoan.herokuapp.com/api/sendEmail"
const url_Booking = "https://api-truongcongtoan.herokuapp.com/api/bookings"
  const radioButtonsData = [
    {
      id: "1",
      label: "Nam",
      value: "M",
    },
    {
      id: "2",
      label: "Nữ",
      value: "F",
    },
  ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
  
    setRadioButtons(radioButtonsArray);
  }


  useEffect(() => {
    // console.log(radioButtons);
    let check = false;
    if (!check) {
      radioButtons.map((item) => {
        if (item.selected) {
          setgender(item.label);
        }
      });
    }
    return () => {
      check = true;
    };
  }, [radioButtons]);

useEffect(() => {
  let check = false
  if (!check) {
    validateBlank()
    setdataToEmail({
      full_name:full_name,
      gender:gender,
      birth_year:birth_year,
      email:email,
      phone_number:phone_number,
      address:address,
      reason:reason,
      ngaykham:`${bookingInfoGet.timetypeValue  ? bookingInfoGet.timetypeValue
        : null} , ${moment(new Date(bookingInfoGet.date))
          .locale("vi")
          .format("dddd - DD/MM/YYYY")}`,
          doctor_name:dataOneUser.full_name,
          price:`${doctorInfo.allCodePrice.valuevi} VNĐ`,
          doctorid:doctorInfo.user.user_id.toString(),
          patientid:signInPerson.user_id.toString(),
          date:bookingInfoGet.date,
          timetype:bookingInfoGet.timetype
       
    })
  }
  return () => {
    check = true
  }
}, [full_name,gender,birth_year,email,phone_number,address,reason])

console.log(dataToEmail);
let dataADD = {
  ...bookingInfoGet
}
const [dataToEmail, setdataToEmail] = useState({
  ...bookingInfoGet,
  full_name:'',
  doctor_name:'',
  price:'',
  reason,
  address,
  birth_year:'',
  gender:'',
  phone_number:'',
  email:'',
  ngaykham:'',

})

const [dataErrorBooking, setdataErrorBooking] = useState({})
const [dataErrorEmail, setdataErrorEmail] = useState({}
  )
const addNewBooking = (url,data,setData) =>{
console.log(data);
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(data);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => {
    if(!JSON.parse(result).errorCode){
      addDataEmail(dataToEmail)
      Toast.show({
         type: "success",
         text1: "Thông báo",
         text2: "Đặt lịch khám thành công. Vui lòng kiểm tra hộp thư đến !",
       });
    }else{
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Bạn đã đặt lịch khám trước đó rồi. Vui lòng kiểm tra lại email !",
      });
    }
    console.log("gia tri th duoc ",result);
  })
  .catch(error => console.log('error', error));
}
const addDataEmail = (data) =>{
  console.log("start");
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(
data
);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api-truongcongtoan.herokuapp.com/api/sendEmail", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

  const handleSave = () => {
   
     if (!validateBlank()) {
        if (error["full_name"]) {
          pushError(error["full_name"])
        }else if(error["gender"]){
          pushError(error["gender"])
        }else if(error["birth_year"]){
          pushError(error["birth_year"])
        }else if(error["email"]){
          pushError(error["email"])
        }else if (error["address"]) {
          pushError(error["address"])
        }else if (error["reason"]) {
          pushError(error["reason"])
        }else{
        alert("OK")
        }
     }else{
      try {
        addNewBooking(url_Booking,dataADD,setdataErrorBooking)
        // addNewBooking(url_Email,dataToEmail,setdataErrorEmail)
      //  setdataErrorBooking({});
      } catch (error) {
        console.log(error);
      }
     }
  };

//  useEffect(() => {
//    let check = false;
//   if (!check) {
//     if (dataErrorBooking.errorCode === 400) {
//        Toast.show({
//           type: "error",
//           text1: "Thông báo",
//           text2: "Bạn đã đặt lịch khám trước đó rồi. Vui lòng kiểm tra lại email!",
//         });
//     }
//     else if(dataErrorBooking.id){
//       addDataEmail(dataToEmail)
//       Toast.show({
//          type: "success",
//          text1: "Thông báo",
//          text2: "Đặt lịch khám thành công. Vui lòng kiểm tra hộp thư đến !",
//        });
//     }else{
//    showMessage({
//         message: "Thông báo !",
//         description: "Xin mời bạn điền các thông tin đặt khám !",
//         type: "success",
//       });
//     }
//   }
//    return () => {
//      check = true
//    }
//  }, [dataErrorBooking])
 
  const pushError = (input) => {
  
    Toast.show({
      type: "error",
      text1: "Thông báo",
      text2: `${input}`,
    });
  }
    //validate email
    const validateEmail = (email) => {
      let errors = {};
      var check = true;
      var result = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (result === null) {
        check = false;
      } else {
        errors["email"] = null;
        seterror(errors);
      }
      return check;
    };

    let validateStr = (stringToValidate) => {
      var pattern = /\d/g;
      if (!pattern.test(stringToValidate)) {
       if (!/[~`!#$%()\^&*+=\-\[\]\\';@_,/{}|\\":<>\?]/g.test(stringToValidate)) {
        return true
       }else{
         return false
       }
      } else {
        return false;
      }
     
    };
        //validate phone_number
        function validatePhoneNumber(email) {
          let errors = {};
          var check = true;
          var result = String(email)
            .toLowerCase()
            .match(
              /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
            );
          if (result === null) {
            check = false;
          } else {
            errors["phone_number"] = null;
            seterror(errors);
          }
          return check;
        }
  const validateBlank = () => {
    var pattern =/^[\d\s]+$/ ;
    let errors = {};
    let formIsValid = true;
    if (!full_name) {
      formIsValid = false;
      errors["full_name"] = "Không được bỏ  trống ô: họ và tên !";
    } else {
        if (!validateStr(full_name)) {
          formIsValid = false;
          errors["full_name"] = "Họ và tên không chứa chữ số và các ký tự khác!";
        }else{
          if (!gender) {
            formIsValid = false;
            errors["gender"] = "Không được bỏ  trống ô: Giới tính!";
          }else{
            if (!birth_year) {
              formIsValid = false;
              errors["birth_year"] = "Không được bỏ  trống ô: Giới tính!";
            }else{
              if (!pattern.test(birth_year)) {
              formIsValid = false;
              errors["birth_year"] = "Ô ngày sinh cần phải là số!";
              }else{
                if (!email) {
                  formIsValid = false;
                  errors["email"] = "Không được bỏ  trống ô: Email!";
                }else{
                  if (!validateEmail(email)) {
                    formIsValid = false;
                    errors["email"] = "Email không đúng định dạng! VD: xxx@yyy.com!";
                  }else{
                    if (!phone_number) {
                      formIsValid = false;
                      errors["phone_number"] = "Không được bỏ  trống ô: Số điện thoại!";
                    }else{
                      if (!validatePhoneNumber(phone_number)) {
                        formIsValid = false;
                      errors["phone_number"] = "Ô số điện thoại cần phải là số";
                      }else{
                        if (!address) {
                          formIsValid = false;
                          errors["address"] = "Không được bỏ  trống ô: Địa chỉ!";
                        }else{
                          if (!reason) {
                            formIsValid = false;
                            errors["reason"] = "Không được bỏ  trống ô: Lý do khám bệnh!";
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
     }
    
    seterror(errors);
    return formIsValid;
  };


  const onBookingPress = (input) => {
    return Alert.alert(
      "Thông báo",
      `Bạn có chắc chắn muốn đặt lịch khám hay không ?`,
      [
        {
          text: "Có",
          onPress: () => {
            handleSave()
            // Toast.show({
            //   type: "success",
            //   text1: "Thông báo",
            //   text2: "Cập nhật thông tin tài khoản thành công!",
            // });
          },
        },

        {
          text: "Không",
        },
      ]
    );
  };
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
            {doctorInfo.allCodePrice ? doctorInfo.allCodePrice.valuevi : null}{" "}
            VNĐ
          </Text>
        </View>
        <Text
          style={[
            { paddingLeft: 20 },
            error["full_name"] ? styles.errorBorder : styles.nonErrorBorder,
          ]}
        >
          Họ và tên
        </Text>
        <View
          style={[
            {
              width: "auto",
              height: 40,
              borderWidth: 0.3,
              borderColor: "gray",
              margin: 20,
              flexDirection: "row",
            },
            error["full_name"] ? styles.errorBorder : styles.nonErrorBorder,
          ]}
        >
          <FontAwesome5
            name="user-alt"
            size={15}
            style={{ marginLeft: 10, marginTop: 10 }}
            color="black"
          />

          <TextInput
            style={[styles.inputColor]}
            value={full_name ? full_name : null}
            onChangeText={setfull_name}
            underlineColorAndroid="transparent"
            placeholder="Nhập họ và tên (bắt buộc)"
            placeholderTextColor="#babfc3"
          />
        </View>
        <View
          style={[
            { flexDirection: "row" },
            error["gender"] ? styles.errorBorder : styles.nonErrorBorder,
          ]}
        >
          <Text
            style={[
              { paddingLeft: 20 },
              error["gender"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            Giới tính
          </Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            style={{ marginLeft: 20 }}
          />
        </View>
        <>
          <Text
            style={[
              { paddingLeft: 20, paddingTop: 10 },
              error["birth_year"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            Năm sinh
          </Text>
          <View
            style={[
              {
                width: "auto",
                height: 40,
                borderWidth: 0.3,
                borderColor: "gray",
                margin: 20,
                flexDirection: "row",
              },
              error["birth_year"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            <FontAwesome5
              style={{ marginLeft: 10, marginTop: 10 }}
              name="birthday-cake"
              size={17}
              color="black"
            />
            <TextInput
              style={[styles.inputColor]}
              value={birth_year ? birth_year : null}
              onChangeText={setbirth_year}
              underlineColorAndroid="transparent"
              placeholder="Nhập năm sinh bệnh nhân(bắt buộc)"
              placeholderTextColor="#babfc3"
            />
          </View>
        </>
        <>
          <Text
            style={[
              { paddingLeft: 20, paddingTop: 10 },
              error["email"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            Địa chỉ email
          </Text>
          <View
            style={[
              {
                width: "auto",
                height: 40,
                borderWidth: 0.3,
                borderColor: "gray",
                margin: 20,
                flexDirection: "row",
              },
              error["email"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            <Ionicons
              style={{ marginLeft: 10, marginTop: 10 }}
              name="mail"
              size={17}
              color="black"
            />
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
          <Text
            style={[
              { paddingLeft: 20, paddingTop: 10 },
              error["phone_number"]
                ? styles.errorBorder
                : styles.nonErrorBorder,
            ]}
          >
            Số điện thoại
          </Text>
          <View
            style={[
              {
                width: "auto",
                height: 40,
                borderWidth: 0.3,
                borderColor: "gray",
                margin: 20,
                flexDirection: "row",
              },
              error["phone_number"]
                ? styles.errorBorder
                : styles.nonErrorBorder,
            ]}
          >
            <FontAwesome5
              style={{ marginLeft: 10, marginTop: 10 }}
              name="phone"
              size={17}
              color="black"
            />
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
          <Text
            style={[
              { paddingLeft: 20, paddingTop: 10 },
              error["address"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            Địa chỉ
          </Text>
          <View
            style={[
              {
                width: "auto",
                height: 40,
                borderWidth: 0.3,
                borderColor: "gray",
                margin: 20,
                flexDirection: "row",
              },
              error["address"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            <FontAwesome5
              style={{ marginLeft: 10, marginTop: 10 }}
              name="address-card"
              size={17}
              color="black"
            />
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

        <Text
          style={[
            { paddingLeft: 20 },
            error[" bookFor"] ? styles.errorBorder : styles.nonErrorBorder,
          ]}
        >
          Lý do khám
        </Text>
        <View
          style={[
            {
              width: "auto",
              height: 40,
              borderWidth: 0.3,
              borderColor: "gray",
              margin: 20,
              flexDirection: "row",
            },
            error["reason"] ? styles.errorBorder : styles.nonErrorBorder,
          ]}
        >
          <FontAwesome5
            style={{ marginLeft: 10, marginTop: 10 }}
            name="bookmark"
            size={17}
            color="black"
          />
          <TextInput
            style={[styles.inputColor]}
            value={reason ? reason : null}
            onChangeText={setreason}
            underlineColorAndroid="transparent"
            placeholder="Nhập lý do khám (bắt buộc)"
            placeholderTextColor="#babfc3"
          />
        </View>
        <View style={{ width: "100%" }}>
          <Text style={{ padding: 10, fontWeight: "300" }}>
            Quý khách vui lòng điền đầy đủ thông tin để tiết kiệm thời gian làm
            thủ tục đăng ký khám bệnh
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <Ionicons name="radio-button-on" size={20} color="blue" />
          <Text>Thanh toán sau tại cơ sở y tế</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            backgroundColor: "transparent",
            margin: 10,
            backgroundColor: "#d9d7d7",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                textAlign: "left",
                alignItems: "flex-start",
                padding: 10,
                flex: 1,
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Giá khám
            </Text>
            <Text
              style={{
                textAlign: "right",
                alignItems: "flex-end",
                flex: 1,
                padding: 10,
                fontSize: 15,
                fontWeight: "400",
              }}
            >
             {doctorInfo.allCodePrice ? doctorInfo.allCodePrice.valuevi : null}{" "}VNĐ
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                textAlign: "left",
                alignItems: "flex-start",
                padding: 10,
                flex: 1,
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Phí đặt lịch
            </Text>
            <Text
              style={{
                textAlign: "right",
                alignItems: "flex-end",
                flex: 1,
                padding: 10,
                fontSize: 15,
                fontWeight: "400",
              }}
            >
              Miễn phí
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 0.3,
              borderTopColor: "gray",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                alignItems: "flex-start",
                padding: 10,
                flex: 1,
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Tổng cộng
            </Text>
            <Text
              style={{
                textAlign: "right",
                alignItems: "flex-end",
                flex: 1,
                padding: 10,
                fontSize: 15,
                fontWeight: "400",
                color: "red",
              }}
            >
              {doctorInfo.allCodePrice ? doctorInfo.allCodePrice.valuevi : null}{" "}VNĐ
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" ,backgroundColor: '#D4EFFC',margin:15}}>
          <Text
            style={{
              textTransform: "uppercase",
              fontSize: 18,
              fontWeight: "600",
              padding: 15,
            }}
          >
            Lưu ý
          </Text>
          <View style={{ marginLeft: 15 }}>
            <Text>
              1. Thông tin bạn cung cấp sẽ được sử dụng làm hồ sơ khám bệnh. Vì
              vậy khi điền thông tin, bạn vui lòng lưu ý:
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 13, paddingLeft: 15 }}>
              a. Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ:
              Trương Công Toàn{" "}
            </Text>
            <Text style={{ fontWeight: "500", fontSize: 13, paddingLeft: 15 }}>
              b. Điền đầy đủ, đúng và kiểm tra lại thông tin trước khi ấn "Xác
              nhận đặt khám"{" "}
            </Text>
            <Text>
              2. Tuân thủ quy định phòng chống dịch (đeo khẩu trang, khử khuẩn,
              khai báo dịch tễ) khi đến khám.
            </Text>
          </View>
        </View>
        <View>
          <View style ={{justifyContent: "center",
              alignItems: "center",marginTop:10}}>
            <TouchableOpacity
              style={{
                width: "80%",
                height: 40,
                backgroundColor: "blue",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
              onPress={onBookingPress}
            >
              <Text style={{ color: "white" }}>Xác nhận đặt khám</Text>
            </TouchableOpacity>
          </View> 
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
    color: "red",
  },
  nonErrorBorder: {
    borderColor: "black",
  },
});
export default BookingScheduleScreen;
