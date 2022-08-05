import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AppLoader from "../AppLoader/AppLoader";
import allAction from "../../components/redux/action/allAction";
import { useDispatch } from "react-redux";

const ForgotPassWord = () => {
  const url_forget =
    "https://api-truongcongtoan.herokuapp.com/api/users/forgotpassword/";
  const url_user = "https://api-truongcongtoan.herokuapp.com/api/users/email=";

  const [email, setemail] = useState("");
  const [checkloading, setcheckloading] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, seterror] = useState({});

  const fetchData = (url, user_id, setData) => {
    console.log("get data ...", `${url}${user_id}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${user_id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          setcheckloading("done");
          if (JSON.parse(result).user_id) {
            Toast.show({
              type: "success",
              text1: "Thông báo",
              text2:
                "Yêu cầu reset mật khẩu thành công .Bạn vui lòng kiểm tra Email!",
            });
            fetchDataUser(url_user,email)
            // navigation.navigate("NewOTP")
          } else {
            Toast.show({
              type: "error",
              text1: "Thông báo",
              text2: "Không thể yêu cầu reset mật khẩu người dùng!",
            });
          }
        }
      })
      .catch((error) => console.log("error", error));
  };
  const fetchDataUser = (url, email) => {
    console.log("get data ...", `${url}${email}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${email}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {

        if (result) {
          console.log("result", JSON.parse(result).user_id);
          // if (JSON.parse(result).statusId === "V1") {
            navigation.navigate("NewOTP");
            dispatch(allAction.userAction.addSignIn(JSON.parse(result).user_id));  
          // }
        }
      })
      .catch((error) => console.log("error", error));
  };
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
      }
    }
    seterror(errors);
    return formIsValid;
  };
  useEffect(() => {
    let check = false;
    if (!check) {
      validateBlank();
    }
    return () => {
      check = true;
    };
  }, [email]);

  const pushError = (input) => {
    Toast.show({
      type: "error",
      text1: "Thông báo",
      text2: `${input}`,
    });
  };
  const onSendPresses = () => {
    if (!validateBlank()) {
      if (error["email"]) {
        pushError(error["email"]);
      }
    } else {
      fetchData(url_forget, email);
      // fetchData(url)
      setcheckloading("loading");
    }
  };
  //back to sign in
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };
 

  return (
    <View style={{height:'100%',width:'100%'}}>
      {checkloading === "loading" ? <AppLoader /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Đặt lại mật khẩu</Text>
          <CustomInput
            placeholder="Nhập địa chỉ mail đã đăng ký tài khoản"
            value={email}
            setValue={setemail}
          />
          <CustomButton text="Gửi" onPress={onSendPresses} type="PRIMARY" />
          <CustomButton
            text="Quay lại trang đăng nhập"
            onPress={onSignInPressed}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
});

export default ForgotPassWord;
