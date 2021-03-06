import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const SignUpcreen = () => {
  const [fullname, setfullname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [passwordRepeate, setpasswordRepeate] = useState("");

  const [registerData, setregisterData] = useState("");
  const [error, seterror] = useState({});

  const navigation = useNavigation();

  var url = "https://api-truongcongtoan-login.herokuapp.com/api/user/register";

  //onSignUpPress
  const onSignUpPress = () => {
    if (validateBlank()) {
      try {
        handleRegister(url, registerData);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: "Đăng ký tài khoản không thành công,vui lòng thử lại sau!",
        });
      }
    }
  };

  useEffect(() => {
    setregisterData({
      full_name: fullname,
      email: email,
      password: password,
    });
  }, [fullname, email, password]);

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
        if (JSON.parse(result).token) {
          Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Đăng ký tài khoản thành công!",
          });
          console.log(JSON.parse(result).token);
          navigation.navigate("SignIn");
        } else {
          Toast.show({
            type: "error",
            text1: "Thông báo",
            text2: "Email đăng ký tài khoản đã tồn tại!",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  //register Press
  const onSignInPress = () => {
    navigation.navigate("SignIn")
  };
  //onPrivicyPress
  const onPrivicyPress = () => {
    console.warn("onPrivicyPress");
  };
  const onTermOfUsePressed = () => {
    console.warn("onTermOfUsePressed");
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
  //validate password
  const validPassword = (pass) => {
    let check = true;
    var regularExpression =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (regularExpression.test(pass) === false) {
      check = false;
    }
    return check;
  };

  //check not input
  const validateBlank = () => {
    let errors = {};
    let formIsValid = true;
    if (!fullname) {
      formIsValid = false;
      errors["fullname"] = "Không được bỏ trống họ và tên !";
    } else if (!email) {
      formIsValid = false;
      errors["email"] = "Không được bỏ trống email!";
    } else {
      if (!validateEmail(email)) {
        errors["email"] = " Email không đúng định dạng! VD: xxx@yyy.com";
        seterror(errors);
      } else if (!password) {
        formIsValid = false;
        errors["password"] = "Không được bỏ trống mật khẩu !";
      } else {
        if (!validPassword(password)) {
          errors["password"] =
            "Mật khẩu phải trên 8 ký tự,1 ký tự số,1 chữ cái viêt hoa,1 ký tự đặc biệt!";
          seterror(errors);
        } else if (!passwordRepeate) {
          formIsValid = false;
          errors["passwordRepeate"] = "Không được bỏ trống !";
        } else if (password != passwordRepeate) {
          formIsValid = false;
          errors["passwordRepeate"] =
            "Mật khẩu nhập không khớp, vui lòng kiểm tra lại !";
        }
      }
    }

    seterror(errors);
    return formIsValid;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Đăng ký tài khoản</Text>

        <CustomInput
          placeholder="Họ và tên "
          value={fullname}
          setValue={setfullname}
        />
        <Text style={styles.error}> {error["fullname"]}</Text>

        <CustomInput placeholder="Email" value={email} setValue={setemail} />
        <Text style={styles.error}> {error["email"]}</Text>
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setpassword}
          secureTextEntry
        />
        <Text style={styles.error}> {error["password"]}</Text>

        <CustomInput
          placeholder="Confirm Password"
          value={passwordRepeate}
          setValue={setpasswordRepeate}
          secureTextEntry
        />
        <Text style={styles.error}> {error["passwordRepeate"]}</Text>

        <CustomButton
          onPress={onSignUpPress}
          text="Đăng ký tài khoản"
          type="PRIMARY"
        />
        <Text style={styles.text}>
          Bằng cách nhấp vào Đăng ký, bạn đồng ý với
          <Text style={styles.link} onPress={onTermOfUsePressed}>
            {" "}
            Điều khoản
          </Text>
          ,
          <Text style={styles.link} onPress={onPrivicyPress}>
            Chính sách
          </Text>{" "}
          của chúng tôi.
        </Text>

        <SocialSignInButton />
        <CustomButton
          onPress={onSignInPress}
          text="Bạn đã có tài khoản? Đăng nhập"
          type="TERTIARY"
        />
      </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
    // textTransform:'uppercase'
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginLeft: 15,
    marginBottom: 10,
    width: "100%",
  },
});

export default SignUpcreen;
