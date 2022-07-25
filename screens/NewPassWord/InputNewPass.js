import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";

const InputNewPass = () => {
  const navigation = useNavigation();
  const [password, setpassword] = useState("");
  const [error, seterror] = useState({});
  const [passwordRepeate, setpasswordRepeate] = useState("");

  const user_id = useSelector((state) => state.user.signInPerson);
  const [checkLoading, setcheckLoading] = useState("");

  const url_user = "https://api-truongcongtoan.herokuapp.com/api/resetpassword/";

  const fetchData = (url, user_id,newpass) => {
    console.log("get data ...", `${url}${user_id}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${user_id}/${newpass}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          setcheckLoading("done");
          if (JSON.parse(result).user_id) {
            Toast.show({
              type: "success",
              text1: "Thông báo",
              text2:
                "Đã thay đổi mật khẩu thành công !",
            });
            navigation.navigate("SignIn")
          } else {
            Toast.show({
              type: "error",
              text1: "Thông báo",
              text2: "Thay đổi mật khẩu thất bại !",
            });
          }

        }
      })
      .catch((error) => console.log("error", error));
  };

  const onConfirmPresses = () => {
    if (!validateBlank()) {
      if (error["password"]) {
        pushError(error["password"]);
      } else {
        if (error["passwordRepeate"]) {
          pushError(error["passwordRepeate"]);
        }
      }
    } else {
      fetchData(url_user,user_id,password);
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

  const validPassword = (pass) => {
    let check = true;
    var regularExpression =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (regularExpression.test(pass) === false) {
      check = false;
    }
    return check;
  };

  useEffect(() => {
    let check = false;
    if (!check) {
      validateBlank();
    }
    return () => {
      check = true;
    };
  }, [password, passwordRepeate]);

  const validateBlank = () => {
    let errors = {};
    let formIsValid = true;
    if (!password) {
      formIsValid = false;
      errors["password"] = "Không được bỏ trống: Nhập mật khẩu !";
    } else if (!validPassword(password)) {
      errors["password"] =
        "Mật khẩu phải trên 8 ký tự,1 ký tự số,1 chữ cái viêt hoa,1 ký tự đặc biệt!";
      seterror(errors);
      formIsValid = false;
    } else if (!passwordRepeate) {
      formIsValid = false;
      errors["passwordRepeate"] = "Không được bỏ trống: Nhập lại mật khẩu!";
    } else if (password != passwordRepeate) {
      formIsValid = false;
      errors["passwordRepeate"] =
        "Mật khẩu nhập lại không khớp với mật khẩu trước đó!";
    }
    seterror(errors);
    return formIsValid;
  };
  return (
  <View style ={{width:'100%',height:'100%'}}>
    {checkLoading === "loading" ? <AppLoader />:null}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Nhập mật khẩu mới</Text>

        <View style={{ width: "100%" }}>
          <Text
            style={[
              { padding: 10 },
              error["password"] ? { color: "red" } : { color: "black" },
            ]}
          >
            Nhập mật khẩu
          </Text>
          <CustomInput
            placeholder="Mật khẩu"
            value={password}
            setValue={setpassword}
          />
        </View>

        <View style={{ width: "100%" }}>
          <Text
            style={[
              { padding: 10 },
              error["passwordRepeate"] ? { color: "red" } : { color: "black" },
            ]}
          >
            Nhập lại mật khẩu
          </Text>
          <CustomInput
            placeholder="Nhập lại mật khẩu"
            value={passwordRepeate}
            setValue={setpasswordRepeate}
          />
        </View>

        <CustomButton
          text="Xác nhận"
          onPress={onConfirmPresses}
          type="PRIMARY"
        />

        <CustomButton
          text="Quay lại"
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
  error: {
    fontSize: 12,
    color: "red",
    marginLeft: 15,
    marginBottom: 10,
    width: "100%",
  },
});

export default InputNewPass;
