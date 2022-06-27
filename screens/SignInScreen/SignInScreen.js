import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";


import Logo from "../../assets/image/healthcare.jpg";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { useDispatch } from "react-redux";
import allAction from "../../components/redux/action/allAction";
import AppLoader from "../AppLoader/AppLoader";

const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginPending, setloginPending] = useState(false)

  
  var url = "https://api-truongcongtoan-login.herokuapp.com/api/user/login";
  var url_email = "https://api-truongcongtoan.herokuapp.com/api/users/";

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState({});

  
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //sign in press
  const onSignInPressed = () => {
    if (validateBlank()) {
      let errorsCheck = {};
      errorsCheck["email"] = "";
      seterror(errorsCheck);
      try {
        handleLogin(url, loginData);
        setloginPending(true)
        showMessage({
          message: "Health care xin chào !",
          description: "Chúc bạn một ngày tốt lành !",
          type: "success",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: "Đăng nhập không thành công,vui lòng thử lại sau!",
        });
      }
    }

    // console.log(validateBlank());
  };

  //add new data

  useEffect(() => {
    setloginData({
      email: email,
      password: password,
    });
  }, [email, password]);

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
        if (JSON.parse(result).access_token) {
          getLogInedPersonInfo(email);
          setloginPending(false)
        } else {
          setloginPending(false)
          Toast.show({
            type: "error",
            text1: "Thông báo",
            text2: "Thông tin email và mật khẩu không chính xác !",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getLogInedPersonInfo = async (url, email) => {
    await getDataByEmail(url, email);
    navigation.navigate("Drawer");
  };

  const getDataByEmail = async (email) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url_email}${email}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("email",`${url_email}${email}`);
          console.log(result);


        dispatch(allAction.userAction.addSignIn(JSON.parse(result)));
        // setdataResponse(JSON.parse(result));
        
      })
      .catch((error) => console.log("error", error));
  };
 
  const onForgotPassPressed = () => {
    navigation.navigate("ForgotPassWord");
  };

  //onSignUpPress
  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

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
      errors["email"] = "";
      seterror(errors);
    }
    return check;
  };
  //check not input
  const validateBlank = () => {
    let errors = {};
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      errors["email"] = "Không được bỏ trống email!";
    } else {
      if (!validateEmail(email)) {
        formIsValid = false;
        errors["email"] = " Email không đúng định dạng! VD: xxx@yyy.com";
        seterror(errors);
      } else if (!password) {
        formIsValid = false;
        errors["password"] = "Không được bỏ trống mật khẩu !";
      }
    }

    seterror(errors);
    return formIsValid;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.2 }]}
          resizeMode="contain"
        />

        <CustomInput placeholder="Email" value={email} setValue={setemail} />

        <Text style={styles.error}> {error["email"]}</Text>

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setpassword}
          secureTextEntry
        />
        <Text style={styles.error}> {error["password"]}</Text>
        <CustomButton
          onPress={onSignInPressed}
          text="Đăng nhập"
          type="PRIMARY"
        />
        <SocialSignInButton />
        <CustomButton
          onPress={onForgotPassPressed}
          text="Quên mật khẩu?"
          type="TERTIARY"
        />

        <CustomButton
          onPress={onSignUpPress}
          text="Bạn chưa có tài khoản? Tạo mới ngay"
          type="TERTIARY"
        />
      </View>
      <FlashMessage position="top" />
    {loginPending ?  <AppLoader /> : null}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "100%",
    maxWidth: 300,
    maxHeight: 200,
    borderRadius: 10,
    borderWidth: 0,
    marginTop:20
  },
  error: {
    fontSize: 12,
    color: "red",
    marginLeft: 15,
    marginBottom: 10,
    width: "100%",
  },
});

export default SignInScreen;
