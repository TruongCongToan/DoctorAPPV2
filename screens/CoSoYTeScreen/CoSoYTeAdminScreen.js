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
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import AppLoader from "../AppLoader/AppLoader";
import MultipleSelect from "../../components/MultipleSelect/MultipleSelect";

const CoSoYTeAdminScreen = () => {
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
  const [themanhchuyenkhoa, setthemanhchuyenkhoa] = useState("");
  const [address, setaddress] = useState("");

  const [listSpecialtiesClinic, setlistSpecialtiesClinic] = useState([])
  const [CKData, setCKData] = useState({
    name: "",
    image: "",
    contentMarkDown: "",
  });

  const [error, seterror] = useState({});
  const url_Clinic = "https://api-truongcongtoan.herokuapp.com/api/Clinic/";
  const url_Specialties = "https://api-truongcongtoan.herokuapp.com/api/specialties"

  const [listSpecialies, setlistSpecialies] = useState([]);
  const [listSpecialtiesClinicData, setlistSpecialtiesClinicData] = useState([])

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
    themanhchuyenkhoa: "",
    address: "",
  });
  useEffect(() => {
    let check = false;
    if (!check) {
      validateBlank();
      setdataSpecialties({
        name: name,
        image: image,
        contentMarkDown: contentMarkDown,
        themanhchuyenkhoa: themanhchuyenkhoa,
        address: address,
      });
    }
    return () => {
      check = true;
    };
  }, [name, image, contentMarkDown, themanhchuyenkhoa, address]);

  const handleSave = () => {
    // console.log("gia tri check ",validateBlank());
    if (validateBlank() === false) {
      if (error["name"]) {
        pushError(error["name"]);
      } else if (error["image"]) {
        pushError(error["image"]);
      } else if (error["contentMarkDown"]) {
        pushError(error["contentMarkDown"]);
      } else if (error["themanhchuyenkhoa"]) {
        pushError(error["themanhchuyenkhoa"]);
      }
    } else {
      return Alert.alert("Thông báo", `Xác nhận lưu thông tin ?`, [
        {
          text: "Có",
          onPress: () => {
            addCK(url_Clinic, dataSpecialties,selectedCSYT);
            setcheck("loading");
          },
        },

        {
          text: "Không",
        },
      ]);
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
  const [selectedCSYT, setselectedCSYT] = useState([])

  const addCK = (url, data,listSpecialiesId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    
    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${url}${listSpecialiesId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).errorCode) {

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
          console.log(result);
          // Toast.show({
          //   type: "success",
          //   text1: "Thông báo",
          //   text2: 'Đã thêm thông tin cơ sở y tế thành công !',
          // });
          setcheck("done");
          setname("");
          setContentMarkDown("");
          setImage(null);
          setthemanhchuyenkhoa("");
          setlistSpecialtiesClinic([])
          setaddress('')
          Toast.show({
            type: "success",
            text1: "Thông báo",
            text2: "Đã thêm thông tin cơ sở y tế thành công !",
          });
          // return Alert.alert(
          //   "Thông báo",
          //   `Đã thêm thông tin cơ sở y tế thành công !`,
          //   [
          //     {
          //       text: "OK",
          //     },
          //   ]
          // );
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
      fetchData(url_Clinic, setlistSpecialies);
      fetchData(url_Specialties,setlistSpecialtiesClinicData)
    }
    return () => {
      check = true;
    };
  }, [check]);
  useEffect(() => {
    let check = false;
    let listSpecialies= []
    if (!check) {
      if (listSpecialtiesClinicData && listSpecialtiesClinicData.length > 0) {
        listSpecialtiesClinicData.map((item) => {
          listSpecialies.push(buildDataInput(item));
        });
      }
      setlistSpecialtiesClinic(listSpecialies);
    }
    return () => {
      check = true;
    };
  }, [listSpecialtiesClinicData]);

  const buildDataInput = (inputData) => {
    let object = {};
      if (inputData) {
        object.value = inputData.id;
        object.label = `${inputData.name}`;
      }

    return object;
  };

  const validateBlank = () => {
    let errors = {};
    let formIsValid = true;
    if (!name) {
      formIsValid = false;
      errors["name"] = "Không được bỏ  trống ô: tên cơ sở y tế !";
    } else {
      if (listSpecialies.length === 0) {
        if (!image) {
          formIsValid = false;
          errors["image"] = "Không được bỏ trống : ảnh cơ sở y tế !";
        } else {
          if (!contentMarkDown) {
            formIsValid = false;
            errors["contentMarkDown"] =
              "Không được bỏ trống : chi tiết thông tin cơ sở y tế !";
          }
        }
      } else {
        
        listSpecialies.length > 0 &&
          listSpecialies.map((item, index) => {
            if (
              item && item.name.toUpperCase().replace(/ /g,'') === name.toUpperCase().replace(/ /g,'')
            ) {
              formIsValid = false;
              errors["name"] =
                "Đã tồn tại cơ sở y tế này trong hệ thống ! Vui lòng kiểm tra lại";
            } else {
              {
                if (!image) {
                  formIsValid = false;
                  errors["image"] = "Không được bỏ trống : ảnh cơ sở y tế !";
                } else {
                  if (!contentMarkDown) {
                    formIsValid = false;
                    errors["contentMarkDown"] =
                      "Không được bỏ trống : chi tiết thông tin cơ sở y tế !";
                  } else {
                    if (!themanhchuyenkhoa) {
                      formIsValid = false;
                      errors["themanhchuyenkhoa"] =
                        "Không được bỏ trống ô: thế mạnh chuyên môn cơ sở y tế!";
                    }
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
const onchangeSelectedItem = (item) =>{
  let itemList = []
  if (item.length > 0) {
    item.map( eachitem =>{
      itemList.push(eachitem.value)
    })
    setselectedCSYT(itemList)
  }
}
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
      <ScrollView  >
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
          Quản lý cơ sở y tế
        </Text>

        <View style={{ flexDirection: "column" }}>
          <Text
            style={[
              styles.text,
              error["name"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            1. Nhập tên cơ sở y tế
          </Text>
          <TextInput
            style={[
              styles.inputColor,
              error["name"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
            placeholder="Nhập tên cơ sở y tế (bắt buộc)"
            onChangeText={setname}
            value={name}
          />
        </View>

        <View style={{ width: "86%", marginLeft: 15 }}>
          <Text style={[error["image"] ? styles.errorBorder : styles.text]}>
            2. Ảnh cơ sở y tế
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
        <View style={{ flexDirection: "column" }}>
          <Text
            style={[
              styles.text,
              error["contentMarkDown"]
                ? styles.errorBorder
                : styles.nonErrorBorder,
            ]}
          >
            3. Nhập thông tin giới thiệu
          </Text>

          <View style={{ height: 100, borderRadius: 20 }}>
            <TextInput
              placeholder="Nhập thông tin giới thiệu về cơ sở y tế (bắt buộc)"
              multiline={true}
              scrollEnabled={true}
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
          </View>

          <Text
            style={[
              styles.text,
              { marginTop: 30 },
              error["themanhchuyenkhoa"]
                ? styles.errorBorder
                : styles.nonErrorBorder,
            ]}
          >
            4. Thế mạnh chuyên môn
          </Text>
          <View style={{ height: 120, borderRadius: 20 }}>
            <TextInput
              placeholder="Nhập thông tin thế mạnh chuyên môn (bắt buộc)"
              multiline={true}
              scrollEnabled={true}
              numberOfLines={4}
              style={{
                height: "100%",

                textAlignVertical: "top",
                borderWidth: 0.3,
                borderRadius: 10,
                margin: 15,
                borderColor: "gray",
                marginTop: 15,
                padding: 10,

                width: "90%",
              }}
              onChangeText={setthemanhchuyenkhoa}
              value={themanhchuyenkhoa}
            />
          </View>

          <Text
            style={[
              styles.text,
              { marginTop: 30 },
              error["themanhchuyenkhoa"]
                ? styles.errorBorder
                : styles.nonErrorBorder,
            ]}
          >
            5. Chọn chuyên khoa 
          </Text>
          <SafeAreaView style={{flex: 1}}>
             
              <MultipleSelect listSpecialies = {listSpecialtiesClinic} onchangeSelectedItem = {onchangeSelectedItem}/>
         </SafeAreaView>
          <Text
            style={[
              styles.text,
              { marginTop: 30 },
              error["address"] ? styles.errorBorder : styles.nonErrorBorder,
            ]}
          >
            6. Địa chỉ cơ sở y tế
          </Text>
          <TextInput
            value={address ? address : null}
            style={[
              {
                height: 40,
                marginTop: 10,
                width: "100%",
                borderWidth: 0.5,
                padding: 10,
                borderRadius: 10,
                marginRight: 10,
              },
            ]}
            onChangeText={setaddress}
            underlineColorAndroid="transparent"
            placeholder="Địa chỉ cơ sở y tế (bắt buộc)"
            placeholderTextColor="#babfc3"
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              height: 100,
              // backgroundColor: 'red',
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
          <View style={{ height: 50 }}></View>
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
export default CoSoYTeAdminScreen;
