import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import { MarkdownEditor } from "react-native-markdown-editor";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import AppLoader from "../AppLoader/AppLoader";

const ChuyenKhoaScreen = () => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [name, setname] = useState("");
  const [image, setImage] = useState(null);
  const [contentMarkDown, setContentMarkDown] = useState("");

  const [CKData, setCKData] = useState({
    name: "",
    image: "",
    contentMarkDown: "",
  });

  const [error, seterror] = useState({});
  const url_Specialties =
    "https://api-truongcongtoan.herokuapp.com/api/specialties";

  const [listSpecialies, setlistSpecialies] = useState([]);
  const handleEditorChange = (value) => {
    setContentMarkDown(value);
  };
  useEffect(() => {
    let check = false;
    if (!check) {
      setCKData({
        name: name,
        image: image,
        contentMarkDown: contentMarkDown,
      });
    }
    return () => {
      check = true;
    };
  }, [name, image, contentMarkDown]);

  const handleChoosePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(`data:image/jpeg;base64, ${result.base64}`);
    }
  };

  const [dataSpecialties, setdataSpecialties] = useState({
    name: "",
    image: "",
    contentMarkDown: "",
  });
  useEffect(() => {
    let check = false;
    if (!check) {
      validateBlank();
      setdataSpecialties({
        name: name,
        image: image,
        contentMarkDown: contentMarkDown,
      });
    }
    return () => {
      check = true;
    };
  }, [name, image, contentMarkDown]);

  const handleSave = () => {
    // console.log("gia tri check ",validateBlank());
    if (validateBlank() === false) {
      if (error["name"]) {
        pushError(error["name"]);
      } else if (error["image"]) {
        pushError(error["image"]);
      } else if (error["contentMarkDown"]) {
        pushError(error["contentMarkDown"]);
      }
    } else {
      addCK(url_Specialties, dataSpecialties);
      setcheck("loading");
      // console.log(dataSpecialties.name);
    }
  };

  const pushError = (input) => {
    // Toast.show({
    //   type: "error",
    //   text1: "Thông báo",
    //   text2: `${input}`,
    // });
    return Alert.alert("Thông báo", `${input}`, [
      {
        text: "Ok",
      },
    ]);
  };
  const fetchData = async (url, setData) => {
    var requestOptions = {
      method: "GET",
      transparentirect: "follow",
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };

  const [check, setcheck] = useState("");

  const addCK = (url, data) => {
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
        if (JSON.parse(result).errorCode) {
          console.log("ket qua thu duoc", result);
          // Toast.show({
          //   type: "error",
          //   text1: "Thông báo",
          //   text2: 'Thêm thông tin thất bại , vui lòng kiểm tra lại !',
          // });
          return Alert.alert(
            "Thông báo",
            `Thêm thông tin thất bại , vui lòng kiểm tra lại !`,
            [
              {
                text: "OK",
              },
            ]
          );
        } else {
          // console.log(result);
          // Toast.show({
          //   type: "success",
          //   text1: "Thông báo",
          //   text2: 'Đã thêm thông tin chuyên khoa thành công !',
          // });
          setcheck("ok");
          setname("");
          setContentMarkDown("");
          setImage(null)

          return Alert.alert(
            "Thông báo",
            `Đã thêm thông tin chuyên khoa thành công !`,
            [
              {
                text: "OK",
              },
            ]
          );
        }
      })
      .catch((error) => {
        console.log("error", error);
        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: "Thêm thông tin thất bại , vui lòng kiểm tra lại !",
        });
      });
  };
  useEffect(() => {
    let check = false;
    if (!check) {
      fetchData(url_Specialties, setlistSpecialies);
    }
    return () => {
      check = true;
    };
  }, [check]);

  const validateBlank = () => {
    let errors = {};
    let formIsValid = true;
    if (!name) {
      formIsValid = false;
      errors["name"] = "Không được bỏ  trống ô: tên chuyên khoa !";
    } else {
      if (listSpecialies.length === 0) {
        if (!image) {
          formIsValid = false;
          errors["image"] = "Không được bỏ trống : ảnh chuyên khoa !";
        } else {
          if (!contentMarkDown) {
            formIsValid = false;
            errors["contentMarkDown"] =
              "Không được bỏ trống : chi tiết thông tin chuyên khoa !";
          }
        }
      } else {
        listSpecialies.length > 0 &&
          listSpecialies.map((item, index) => {
            if (
              item.name.toUpperCase() === name.toUpperCase() ||
              name.endsWith(" ")
            ) {
              formIsValid = false;
              errors["name"] =
                "Đã tồn tại chuyên khoa này trong hệ thống ! Vui lòng kiểm tra lại";
            } else {
              {
                if (!image) {
                  formIsValid = false;
                  errors["image"] = "Không được bỏ trống : ảnh chuyên khoa !";
                } else {
                  if (!contentMarkDown) {
                    formIsValid = false;
                    errors["contentMarkDown"] =
                      "Không được bỏ trống : chi tiết thông tin chuyên khoa !";
                  }
                }
              }
            }
          });
      }
    }

    seterror(errors);
    return formIsValid;
  };
  console.log("check la ", check);
  return (
    <View>
      {check === "loading" ? <AppLoader /> : null}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderLogo />
      </ScrollView>
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            fontWeight: "bold",
            marginTop: 10,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {" "}
          Quản lý chuyên khoa
        </Text>

        <View style={{ flexDirection: "column" }}>
          <Text
            style={[
              styles.text,
              error["name"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            1. Nhập tên chuyên khoa
          </Text>
          <TextInput
            style={[
              styles.inputColor,
              error["name"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
            placeholder="Nhập tên chuyên khoa (bắt buộc)"
            onChangeText={setname}
            value={name}
          />
        </View>

        <View style={{ width: "86%" ,marginLeft:15 }}>
          <Text style={[error["image"] ? styles.errorBorder : styles.text]}>
            2. Ảnh chuyên khoa
          </Text>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 200,
              borderRadius: 10,
              marginTop: 10,
              marginLeft: 15,
              borderWidth: 0.5,
              borderColor: "gray",
            }}
            onPress={handleChoosePhoto}
          >
            <Ionicons
              name="image-outline"
              size={100}
              color="gray"
              style={{
                position: "absolute",
                left: 15,
                top: 10,
              }}
            />
            {image && (
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  marginTop: 0,
                  marginLeft: 0,
                }}
                source={{
                  uri: image,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View >
          <Text
            style={[
              styles.text,
              error["contentMarkDown"]
                ? styles.errorBorder
                : styles.nonErrorBorder,
            ]}
          >
            3. Nhập thông tin chi tiết chuyên khoa
          </Text>


          <View style={{ height: 200, borderRadius: 20 }}>
            <TextInput
              placeholder="Nhập thông tin chi tiết chuyên khoa"
              multiline={true}
              numberOfLines={4}
              style={{
                height: 100,

                textAlignVertical: "top",
                borderWidth: 0.3,
                borderRadius: 10,
                margin: 15,
                borderColor: "gray",
                marginTop: 15,
                padding: 10,

                width: "90%",
              }}
              onChangeText={handleEditorChange}
              value={contentMarkDown}
            />
             <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,

            // backgroundColor: 'red',
          }}
        >
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
            onPress={handleSave}
          >
            <Text style={{ color: "white" }}>Lưu thông tin</Text>
          </TouchableOpacity>
        </View>
          </View>
          
        </View>

      
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    padding: 15,
  },
  inputColor: {
    height: 40,
    textAlignVertical: "top",
    borderWidth: 0.3,
    borderRadius: 10,
    padding: 10,
    borderColor: "gray",
    marginTop: 15,
    width: "90%",
    margin: 20,
  },
  errorBorder: {
    borderColor: "red",
    color: "red",
  },
  nonErrorBorder: {
    borderColor: "black",
  },
});
export default ChuyenKhoaScreen;
