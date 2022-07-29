import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";
import "moment/locale/vi";
import Toast from "react-native-toast-message";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";
import allAction from "../../components/redux/action/allAction";

const UserInfo = () => {
  const [full_name, setfull_name] = useState("");
  const [email, setemail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [image, setimage] = useState("");
  const [gender, setgender] = useState("");
  const [address, setaddress] = useState("");

  const [checkLoading, setcheckLoading] = useState("");
  const [error, seterror] = useState([]);
  const [dataUser, setdataUser] = useState({});
  const dispatch = useDispatch();

  const signInPerson = useSelector((state) => state.user.signInPerson);

  const url_user = "http://api-truongcongtoan.herokuapp.com/api/users/";

  const fetchDataById = (url, email, setData) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${url}${email}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).user_id) {
          setData(JSON.parse(result));
        } else {
          setData(null);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    let check = false;
    if (!check) {
      fetchDataById(url_user, signInPerson.user_id, setdataUser);
    }
    return () => {
      check = true;
    };
  }, [signInPerson.user_id]);

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setimage(`data:image/jpeg;base64, ${result.base64}`);
    }
  };

  useEffect(() => {
    setfull_name(dataUser.full_name);
    setemail(dataUser.email);
    setphone_number(dataUser.phone_number), setaddress(dataUser.address);
    setgender(dataUser.gender);
    setimage(dataUser.image);
  }, [dataUser]);

  const [dataUpdate, setdataUpdate] = useState({
    email: "",
    full_name: "",
    gender: "",
    phone_number: "",
    address: "",
    image: "",
  });

  useEffect(() => {
    validateBlank();
    setdataUpdate({
      full_name: full_name,
      email: email,
      gender: gender,
      phone_number: phone_number,
      address: address,
      image: image,
    });
  }, [full_name, email, gender, phone_number, address, image]);

  const updateUser = (id, data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://api-truongcongtoan.herokuapp.com/api/users/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log("result : ", result);
        if (result) {
          setcheckLoading("done");
          dispatch(allAction.userAction.addSignIn(JSON.parse(result)));

          return Alert.alert(
            "Thông báo",
            "Cập nhật thông tin tài khoản thành công !"
          );
        } else {
          setcheckLoading("done");
          return Alert.alert(
            "Thông báo",
            "Cập nhật thông tin tài khoản thất bại !"
          );
        }
      })
      .catch((error) => console.log("error", error));
  };

  function validatePhoneNumber(email) {
    let errors = {};
    var check = true;
    var result = String(email)
      .toLowerCase()
      .match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
    if (result === null) {
      check = false;
    } else {
      errors["phone_number"] = null;
      seterror(errors);
    }
    return check;
  }
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
      if (
        !/[~`!#$%()\^&*+=\-\[\]\\';@_,/{}|\\":<>\?]/g.test(stringToValidate)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const validateBlank = () => {
    var pattern = /^[\d\s]+$/;
    let errors = {};
    let formIsValid = true;
    if (!full_name) {
      formIsValid = false;
      errors["full_name"] = "Bạn không được bỏ  trống ô: họ và tên !";
    } else {
      if (!validateStr(full_name)) {
        formIsValid = false;
        errors["full_name"] = "Họ và tên không chứa chữ số và các ký tự khác!";
      } else {
        if (!gender) {
          formIsValid = false;
          errors["gender"] = "Bạn không được bỏ  trống ô: Giới tính!";
        } else {
          if (!email) {
            formIsValid = false;
            errors["email"] = "Bạn không được bỏ  trống ô: Email!";
          } else {
            if (!validateEmail(email)) {
              formIsValid = false;
              errors["email"] = "Email không đúng định dạng! VD: xxx@yyy.com!";
            } else {
              if (!phone_number) {
                formIsValid = false;
                errors["phone_number"] =
                  "Bạn không được bỏ  trống ô: Số điện thoại!";
              } else {
                if (!validatePhoneNumber(phone_number)) {
                  formIsValid = false;
                  errors["phone_number"] = "Ô số điện thoại cần phải là số";
                } else {
                  if (!address) {
                    formIsValid = false;
                    errors["address"] = "Bạn không được bỏ  trống ô: Địa chỉ!";
                  } else {
                    if (!image) {
                      formIsValid = false;
                      errors["image"] =
                        "Bạn không được bỏ  trống ảnh đại diện !";
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
  const pushError = (input) => {
    return Alert.alert("Error!", `${input}`, [
      {
        text: "Ok",
      },
    ]);
  };
  const handleSave = () => {
    if (!validateBlank()) {
      if (error["full_name"]) {
        pushError(error["full_name"]);
      } else if (error["gender"]) {
        pushError(error["gender"]);
      } else if (error["email"]) {
        pushError(error["email"]);
      } else if (error["phone_number"]) {
        pushError(error["phone_number"]);
      } else if (error["address"]) {
        pushError(error["address"]);
      } else if (error["image"]) {
        pushError(error["image"]);
      }
    } else {
      updateUser(signInPerson.user_id, dataUpdate);
      setcheckLoading("loading");
      console.log("du lieu gui d ", dataUpdate);
    }
  };

  const onSavePress = (input) => {
    return Alert.alert("Thông báo", `Xác nhận lưu thông tin ?`, [
      {
        text: "Có",
        onPress: () => {
          handleSave();
          setcheckLoading("loading");
        },
      },

      {
        text: "Không",
      },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      {checkLoading === "loading" ? <AppLoader /> : null}
    
      <HeaderLogo />
      <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={handleChoosePhoto}>
            {image ? (
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  marginTop: 0,
                  marginLeft: 0,
                }}
                source={{
                  uri: image,
                }}
              />
            ) : (
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    backgroundColor: "orange",
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <FontAwesome5 name="user-plus" size={23} color="white" />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Ảnh đại diện
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Text
          style={[
            {
              paddingLeft: 20,
              fontSize: 16,
              fontWeight: "600",
              paddingTop: 15,
            },
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
            { flexDirection: "column" },
            error["gender"] ? styles.errorBorder : styles.nonErrorBorder,
          ]}
        >
          <Text
            style={[
              { paddingLeft: 20, fontSize: 16, fontWeight: "600" },
              error["gender"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            Giới tính
          </Text>
          <View
            style={{
              width: "auto",
              height: 40,
              borderWidth: 0.3,
              borderColor: "gray",
              margin: 20,
              flexDirection: "row",
            }}
          >
            <FontAwesome5
              style={{ marginLeft: 10, marginTop: 10 }}
              name="transgender-alt"
              size={17}
              color="black"
            />
            <View
              style={{
                backgroundColor: "transparent",
                height: 39,
                marginLeft: 12,
                width: "88%",
                borderColor: "gray",
                borderTopColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: "transparent",
                borderWidth: 0.3,
                paddingLeft: 10,
                paddingHorizontal: 0,
                borderRightColor: "transparent",
                // marginVertical: 10,
              }}
            >
              <RNPickerSelect
                onValueChange={setgender}
                placeholder={{
                  label: "Chọn giới tính",
                  value: null,
                }}
                value={gender}
                items={[
                  { label: "Nam", value: "M" },
                  { label: "Nữ", value: "F" },
                  { label: "Khác", value: "O" },
                ]}
              />
            </View>
          </View>
        </View>

        <>
          <Text
            style={[
              {
                paddingLeft: 20,
                fontSize: 16,
                fontWeight: "600",
                paddingTop: 10,
              },
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
            <Feather
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
              {
                paddingLeft: 20,
                fontSize: 16,
                fontWeight: "600",
                paddingTop: 10,
              },
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
              {
                paddingLeft: 20,
                fontSize: 16,
                fontWeight: "600",
                paddingTop: 10,
              },
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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "80%",
              height: 40,
              backgroundColor: "#189AB4",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={onSavePress}
          >
            <Text style={{ color: "white" }}>Lưu thông tin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputColor: {
    // backgroundColor: "white",
    height: 40,
    marginLeft: 12,
    width: "100%",
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
export default UserInfo;
