import { View, Text, StyleSheet } from "react-native";
import React, { useState,useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";

const NewOTP = () => {
  const [error, seterror] = useState({});
  const navigation = new useNavigation();
  const [otp, setotp] = useState("");
const [checkLoading, setcheckLoading] = useState('');

  const url_OTP = "https://api-truongcongtoan.herokuapp.com/api/users/getOTP/";
  const user_id = useSelector((state) => state.user.signInPerson);

  console.log("user_id ",user_id);
  const onConfirmPresses = () => {
    console.log(validateBlank());
    if (!validateBlank()) {
      if (error["otp"]) {
        pushError(error["otp"]);
      } 
    }else {
      fetchData(url_OTP, user_id,otp);
      setcheckLoading("loading")
    }
  };

  //back to sign in
  const onSignInPressed = () => {
    navigation.goBack();
  };
  const pushError = (input) => {
    Toast.show({
      type: "error",
      text1: "Thông báo",
      text2: `${input}`,
    });
  };
useEffect(() => {
  let check = false
  if (!check) {
    validateBlank();
  }
  return () => {
    check = true
  }
}, [otp])

  const validateNumber = (input) => {
   return !isNaN(+input)
  };
  const validateBlank = () => {
    let errors = {};
    let formIsValid = true;
    if (!otp) {
      formIsValid = false;
      errors["otp"] = "Không được bỏ trống OTP!";
    } else {
      if (!validateNumber(otp)) {
        formIsValid = false;
        errors["otp"] = " OTP nhập vào phải là số";
        seterror(errors);
      }
    }
    seterror(errors);
    return formIsValid;
  };
  const fetchData = (url, user_id,otp) => {
    console.log("get data ...", `${url}${user_id}/${otp}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${user_id}/${otp}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          setcheckLoading("done");
          if (JSON.parse(result).status === "NOT_FOUND") {
           
            Toast.show({
              type: "error",
              text1: "Thông báo",
              text2: "Xác thực OTP thất bại !",
            });
          } else {
            console.log("result la ",result);
            Toast.show({
              type: "success",
              text1: "Thông báo",
              text2: "Xác thực OTP thành công !",
            });
            navigation.navigate("NewPass");
          }
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
  <View style={{width:'100%',height:'100%'}}>
    {
      checkLoading === "loading" ? <AppLoader /> :null
    }
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Nhập mã OTP</Text>
        <CustomInput placeholder="Nhập mã OTP" value={otp} setValue={setotp} />
        <CustomButton
          text="Xác nhận"
          onPress={onConfirmPresses}
          type="PRIMARY"
        />

        <CustomButton
          text="Quay trở lại "
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

export default NewOTP;
