import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-native-qrcode-svg";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import uuid from "react-native-uuid";
import { Svg } from "react-native-svg";
import Toast from "react-native-toast-message";
import AppLoader from '../../screens/AppLoader/AppLoader'
import HeaderLogo from '../../screens/HeaderScreen/HeaderLogo'
const QRCodeGenerator = () => {

  const [qrvalue, setQrvalue] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [checkLoad, setcheckLoad] = useState('')

  let svg = useRef < Svg > null;
  const url_User = "http://api-truongcongtoan.herokuapp.com/api/user/registerQR";
  const url_SendQREmail = "http://api-truongcongtoan.herokuapp.com/api/users/sendQRCodeEmail/"



  const getDataURL = () => {
    svg?.toDataURL(callback);
  };


  const [dataToEmail, setdataToEmail] = useState({
    email: "",
    full_name: "",
    qrcode: "",
    role: "R3",
    uuid: "",
  })

  const fetchDataById = (url,email) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${url}${email}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
          if (JSON.parse(result).user_id) {
            Toast.show({
              type: "success",
              text1: "Thông báo",
              text2: "Đăng ký tài khoản thành công!",
            });
            setcheckLoad("done");
            navigation.navigate("SignIn");
          }else{
            setcheckLoad("done");
            Toast.show({
              type: "error",
              text1: "Thông báo",
              text2: "Có lỗi xảy ra khi đăng ký tài khoản!",
            });
          }
      })
      .catch((error) => console.log("error", error));
  };

  const handleRegister = async (url, data = {}) => {
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
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("gia tri thu duic ", result);
        setcheckLoad("done")
        if (JSON.parse(result).user_id) {

          fetchDataById(url_SendQREmail,JSON.parse(result).email)
          
        } else {
          setcheckLoad("done");
          Toast.show({
            type: "error",
            text1: "Thông báo",
            text2: "Email đăng ký tài khoản đã tồn tại!",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    let check = false
    if (!check) {
     setdataToEmail({
      email: email,
      full_name: name,
      uuid: uuid.v4(),
      role:"R3"
     })
    }
    return () => {
      check = true
    }
  }, [email,name])

  useEffect(() => {
    let check = false
    if (!check) {
    setQrvalue(dataToEmail.uuid)
    }
    return () => {
      check = true
    }
  }, [dataToEmail.uuid])
  
  
  function callback(dataURL) {
 
   dataToEmail.qrcode=`data:image/jpeg;base64, ${dataURL}`;
  handleRegister(url_User,dataToEmail)
  setcheckLoad("loading")
  }
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderLogo />
      {
        checkLoad === "loading" ? <AppLoader /> :null
      }
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Tạo mã QR cho người dùng</Text>
        <Text style={styles.titleStyle}>
          Bệnh nhân có thể dùng mã này để đăng nhập vào hệ thống
        </Text>
        <QRCode
          value={qrvalue ? qrvalue : "NA"}
          size={250}
          color="black"
          backgroundColor="white"
          logo={{
            url: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png",
          }}
          logoSize={30}
          logoMargin={2}
          logoBorderRadius={15}
          logoBackgroundColor="yellow"
          getRef={(c) => (svg = c)}
        />
        <Text style={styles.textStyle}>
          Bạn hãy điền đầy đủ thông tin để tạo mã QR
        </Text>

        <TextInput
          style={styles.textInputStyle}
          onChangeText={setemail}
          placeholder="Nhập email đăng ký"
          value={email}
        />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={setname}
          placeholder="Nhập tên người dùng"
          value={name}
        />
        <TouchableOpacity style={styles.buttonStyle} 
        
        onPress={getDataURL}
        >
          <Text style={styles.buttonTextStyle}>Tạo mã QR ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  textStyle: {
    textAlign: "center",
    margin: 10,
  },
  textInputStyle: {
    flexDirection: "row",
    height: 40,
    width: "90%",
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    borderWidth: 0.3,
    borderColor: "gray",
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: "#51D8C7",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#51D8C7",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});
export default QRCodeGenerator;
