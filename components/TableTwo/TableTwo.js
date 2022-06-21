//dang dung o 118
import {
  View,
  Text,
  Alert,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker'

const styles = StyleSheet.create({
  inputColor: {
    height: 40,
    margin: 12,
    width: "80%",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  inputColorEmail: {
    height: 40,
    marginTop: 10,
    width: "50%",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  errorBorder: {
    borderColor: "red",
  },
  nonErrorBorder: {
    borderColor: "black",
  },
});
const ModalPopup = ({ visible, setvisible ,dataUser}) => {
  const [showModal, setshowModal] = useState(visible);
  const [error, seterror] = useState({});


  const [state, setstate] = useState({
    full_name:'',
    email:'',
    password:'',
    phone_number:'',
    role:'',
    address:''
  })

 
  useEffect(() => {
    toggleModal();
  }, [visible]);
  useEffect(() => {
      setstate({
        full_name:dataUser.full_name,
        email:dataUser.email,
        password:dataUser.password,
        phone_number:dataUser.phone_number,
        role:dataUser.role,
        address:dataUser.address
      })
  }, [dataUser])
  
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
  const toggleModal = () => {
    if (visible) {
      setshowModal(true);
    } else {
      setshowModal(false);
    }
  };

  
  const handleChoosePhoto = () =>{
    // alert("xin chao")
    // const options = {
    //   noData:true
    // }
    // ImagePicker.launchImageLibrary( options, response =>{
    //   console.log("response",response);
    // })
  }

  return (
    <Modal transparent setvisible={setvisible} visible={showModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 40,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity onPress={() => setvisible(false)}>
              <Ionicons name="close-sharp" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: 300,
              // backgroundColor: "purple",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textTransform: "uppercase",
                fontWeight: "bold",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 20,
              }}
            >
              Thông tin người dùng
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress = {handleChoosePhoto}
>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  marginTop: 5,
                }}
                source={{
                  uri: "https://images.unsplash.com/photo-1655453421065-20c9655a229d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                }}
              />
              </TouchableOpacity>
              <TextInput
                style={[
                  styles.inputColor,
                  error["full_name"]
                    ? styles.errorBorder
                    : styles.nonErrorBorder,
                ]}
                value={state.full_name ? state.full_name :"  "}
                underlineColorAndroid="transparent"
                placeholder="Nhập họ và tên"
                placeholderTextColor="gray"
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TextInput
               value={state.email ? state.email :"  "}
                style={[
                  styles.inputColorEmail,
                  error["email"] ? styles.errorBorder : styles.nonErrorBorder,
                ]}
                underlineColorAndroid="transparent"
                placeholder="Nhập email"
                placeholderTextColor="gray"
              />

              <TextInput
               value={state.gender ? state.gender :"  "}
                style={[
                  {
                    height: 40,
                    marginTop: 10,
                    width: "50%",
                    borderWidth: 0.5,
                    padding: 10,
                    borderRadius: 10,
                  },
                  error["gender"]
                    ? styles.errorBorder
                    : styles.nonErrorBorder,
                ]}
                underlineColorAndroid="transparent"
                placeholder="Nhập giới tính"
                placeholderTextColor="gray"
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TextInput
               value={state.phone_number ? state.phone_number :"  "}
                style={[
                  {
                    height: 40,
                    marginTop: 10,
                    width: "50%",
                    borderWidth: 0.5,
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 10,
                  },
                  error["phone_number"]
                    ? styles.errorBorder
                    : styles.nonErrorBorder,
                ]}
                underlineColorAndroid="transparent"
                placeholder="Số điện thoại"
                placeholderTextColor="gray"
              />
              <TextInput
               value={state.role ? state.role :"  "}
                style={[
                  {
                    height: 40,
                    marginTop: 10,
                    width: "50%",
                    borderWidth: 0.5,
                    padding: 10,
                    borderRadius: 10,
                  },
                  error["role"] ? styles.errorBorder : styles.nonErrorBorder,
                ]}
                underlineColorAndroid="transparent"
                placeholder="Loại tài khoản"
                placeholderTextColor="gray"
              />
            </View>
            <TextInput
             value={state.address ? state.address :"  "}
              style={[
                {
                  height: 40,
                  marginTop: 10,
                  width: "105%",
                  borderWidth: 0.5,
                  padding: 10,
                  borderRadius: 10,
                },
                error["address"]
                  ? styles.errorBorder
                  : styles.nonErrorBorder,
              ]}
              underlineColorAndroid="transparent"
              placeholder="Địa chỉ"
              placeholderTextColor="gray"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 40,
                  backgroundColor: "blue",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "white" }}>Gửi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 40,
                  backgroundColor: "red",
                  marginLeft: 20,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setvisible(false);
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const TableTwo = () => {
  const [dataGet, setDataGet] = useState([]);
  const [showBox, setShowBox] = useState(true);
  const [visible, setvisible] = useState(false);

  const [dataUser, setdataUser] = useState({})


  var url = "https://api-truongcongtoan.herokuapp.com/api/users";
  var url_User = "https://api-truongcongtoan.herokuapp.com/api/users/";

  const handleLogin = async (url,setDataGet) => {
    console.log("calling data ...");

    var requestOptions = {
      method: "GET",
      transparentirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => setDataGet(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };
  const showConfirmDialog = (item, index) => {
    handleLogin(`${url_User}${item.email}`,setdataUser)
    return Alert.alert(
      "Thao tác với tài khoản",
      `Email:  ${item.email}`,

      [
        {
          text: "Thoát",
        },
        {
          text: "Xóa",
          onPress: () => {
            onDeletePress(item);
          },
        },
        {
          text: "Sửa",
          onPress: () => {
            setvisible(true);
          },
        },
      ]
    );
  };

  const onDeletePress = (input) => {
    return Alert.alert(
      "Thông báo",
      `Bạn có chắc chắn muốn xóa: ${input.email}`,
      [
        // The "Yes" button
        {
          text: "Có",
          onPress: () => {
            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Không",
        },
      ]
    );
  };
  useEffect(() => {
    handleLogin(url,setDataGet);
  }, []);

  const formatGender = (input) => {
    if (input === "M") {
      return "Nam";
    } else if (input === "F") {
      return "Nữ";
    } else if (input === "O") {
      return " Khác";
    } else {
      return "";
    }
  };

  const rowPress = (item, index) => {
    showConfirmDialog(item, index);
  };

  return (
    <>
      <ModalPopup visible={visible} setvisible={setvisible} dataUser={dataUser}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: "100%",
              height: 40,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="close-sharp"
              size={30}
              color="black"
              onPress={() => {}}
            />
          </View>
          <View
            style={{ width: 150, height: "150", marginVertical: 10 }}
          ></View>
        </View>
      </ModalPopup>
      <ScrollView horizontal>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50%",
            // borderWidth:1,
          }}
        >
          {/* <View style={{ backgroundColor: 'red' ,justifyContent:'center',alignItems:'center'}}> */}
          <Text
            style={{
              fontSize: 20,
              textTransform: "uppercase",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Quản lý tài khoản
          </Text>

          <View style={{ flexDirection: "row", marginLeft: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: 120,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopWidth: 0.2,
                  borderTopColor: "transparent",
                  fontWeight: "bold",
                  fontSize: 15,
                  marginBottom: 5,
                }}
              >
                Họ và tên
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: 120,
                  backgroundColor: "transparent",
                  borderTopWidth: 0.2,
                  borderTopColor: "transparent",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Loại tài khoản
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: 100,
                  backgroundColor: "transparent",
                  borderTopWidth: 0.2,
                  borderTopColor: "transparent",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Giới tính
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: 150,
                  backgroundColor: "transparent",
                  borderTopWidth: 0.2,
                  borderTopColor: "transparent",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                email
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: 100,
                  backgroundColor: "transparent",
                  borderTopWidth: 0.2,
                  borderTopColor: "transparent",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                  marginBottom: 0,
                }}
              >
                Số điện thoại
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  width: 100,
                  backgroundColor: "transparent",
                  borderTopWidth: 0.2,
                  borderTopColor: "transparent",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                  marginBottom: 0,
                }}
              >
                Địa chỉ
              </Text>
            </View>
          </View>

          {dataGet &&
            dataGet.map((item, index) => (
              <View style={{ flexDirection: "row" }} key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <Text
                    style={{
                      width: 150,
                      height: 30,
                      backgroundColor: "transparent",
                    }}
                    onPress={() => rowPress(item, index)}
                  >
                    {item.full_name}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <Text
                    style={{ width: 100, backgroundColor: "transparent" }}
                    onPress={() => rowPress(item, index)}
                  >
                    {item.allCodeRole ? item.allCodeRole.valuevi : ""}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <Text
                    style={{ width: 100, backgroundColor: "transparent" }}
                    onPress={() => rowPress(item, index)}
                  >
                    {formatGender(item.gender)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <Text
                    style={{ width: 150, backgroundColor: "transparent" }}
                    onPress={() => rowPress(item, index)}
                  >
                    {item.email}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <Text
                    style={{ width: 100, backgroundColor: "transparent" }}
                    onPress={() => rowPress(item, index)}
                  >
                    {item.phone_number}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 0.4,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 8,
                    marginBottom: 0,
                  }}
                >
                  <Text
                    style={{ width: 100, backgroundColor: "transparent" }}
                    onPress={() => rowPress(item, index)}
                  >
                    {item.address}
                  </Text>
                </View>
              </View>
            ))}

          {/* </View> */}
        </View>
      </ScrollView>
    </>
  );
};

export default TableTwo;
