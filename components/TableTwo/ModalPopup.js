


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
  import SelectDropdown from 'react-native-select-dropdown'
  // import FlashMessage from "react-native-flash-message";
  import { showMessage, hideMessage } from "react-native-flash-message";
  import * as ImagePicker from 'expo-image-picker';
  import { useDispatch,  } from "react-redux";
  import allAction from "../redux/action/allAction";
  import AppLoader from "../../screens/AppLoader/AppLoader";
  import Toast from "react-native-toast-message";
  
  
  const styles = StyleSheet.create({
    inputColor: {
      height: 40,
      marginLeft: 12,
      width: "80%",
      borderWidth: 0.5,
      padding: 10,
      borderRadius: 10,
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
    },
    nonErrorBorder: {
      borderColor: "black",
    },
  
  });
const ModalPopup = ({ visible, setvisible, dataUser }) => {

  
    const [showModal, setshowModal] = useState(visible);
    const [error, seterror] = useState({});
    const [loginPending, setloginPending] = useState(false)
  
    const [full_name, setfull_name] = useState('')
    const [email, setemail] = useState('')
    const [user_id, setuser_id] = useState('')
    const [phone_number, setphone_number] = useState('')
    const [role, setrole] = useState('')
    const [address, setaddress] = useState('')
    const [gender, setgender] = useState('')
    const [image, setImage] = useState(null);
  
  
    const genders = ["Nam", "Nữ", "Khác"]
    const roles = ["Quản trị viên", "Bác sĩ", "Bệnh nhân"]
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      toggleModal();
    }, [visible]);

    useEffect(() => {
      setfull_name(dataUser.full_name)
      setemail(dataUser.email)
      setuser_id(dataUser.user_id)
      setphone_number(dataUser.phone_number),
      setrole(dataUser.role)
      setaddress(dataUser.address)
      setgender(dataUser.gender)
      setImage(dataUser.image)
    }, [dataUser])

    const [dataUpdate, setdataUpdate] = useState({
      email: '',
      password: '',
      full_name: '',
      gender: '',
      role: '',
      phone_number: '',
      address: '',
      image: '',
      doctorid: ''
    })
    useEffect(() => {
      var RandomNumber = Math.floor(Math.random() * 200) + 1 ;
  
      validateBlank()
      setdataUpdate({
        full_name: full_name,
        email: email,
        gender: gender,
        role: role,
        phone_number: phone_number,
        address: address,
        image: image,
        doctorid:RandomNumber
      })
    }, [full_name, email, gender, role, phone_number, address, image])
  
  
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
        errors["email"] = null;
        seterror(errors);
      }
      return check;
    };
  
    //validate phone_number
    function validatePhoneNumber(email) {
      let errors = {};
      var check = true;
      var result = String(email)
        .toLowerCase()
        .match(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        );
      if (result === null) {
        check = false;
      } else {
        errors["phone_number"] = null;
        seterror(errors);
      }
      return check;
    }
  
    //check not input
    const validateBlank = () => {
      let errors = {};
      let formIsValid = true;
      if (!full_name) {
        formIsValid = false;
        errors["full_name"] = "Không được bỏ  trống ô: họ và tên !";
      } else if (!email) {
        formIsValid = false;
        errors["email"] = "Không được bỏ  trống ô: email!";
      } else {
        if (!validateEmail(email)) {
          formIsValid = false;
          errors["email"] = " Email không đúng định dạng! VD: xxx@yyy.com";
          seterror(errors);
        } else {
          if (!gender) {
            formIsValid = false;
            errors["gender"] = "Không được bỏ  trống ô: giới tính !";
          } else {
            if (!role) {
              formIsValid = false;
              errors["role"] = "Không được bỏ  trống ô: loại tài khoản !";
            } else {
              if (!phone_number) {
                formIsValid = false;
                errors["phone_number"] = "Không được bỏ  trống ô: số điện thoại !";
              } else {
                if (!validatePhoneNumber(phone_number)) {
                  formIsValid = false;
                  errors["phone_number"] = "Số điện thoại phải là số và có 10 chữ số!";
                } else {
                  if (!address) {
                    formIsValid = false;
                    errors["address"] = "Không được bỏ  trống ô: địa chỉ!";
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
    const toggleModal = () => {
      if (visible) {
        setshowModal(true);
      } else {
        setshowModal(false);
      }
    };
  
    const handleChoosePhoto = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
  
      // console.log((result));
  
      if (!result.cancelled) {
        setImage(`data:image/jpeg;base64, ${result.base64}`);
      }
    }
    const formatT = (input, flag) => {
      if (flag === "gender") {
        if (input === "Nam") {
          return "M"
        } else if (input === "Nữ") {
          return "F"
        } else {
          return "O"
        }
      } else if (flag === "role") {
        if (input === "Quản trị viên") {
          return "R1"
        } else if (input === "Bác sĩ") {
          return "R2"
        } else {
          return "R3"
        }
      }
    }
    const formatV = (input, flag) => {
      if (flag === "gender") {
        if (input === "M") {
          return 0
        } else if (input === "F") {
          return 1
        } else if (input === "O") {
          return 2
        } else {
          return null
        }
      } else if (flag === "role") {
        if (input === "R1") {
          return 0
        } else if (input === "R2") {
          return 1
        } else if (input === "R3") {
          return 2
        } else {
          return null
        }
      }
    }
 
  
    const updateUser = (id, data) => {
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify(
       data
      );
  
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let count = 0;
  
      fetch(`http://api-truongcongtoan.herokuapp.com/api/users/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result) {
            dispatch(allAction.userAction.addCheckLoadingPage(count + 1));
            Toast.show({
              type: "success",
              text1: "Thông báo",
              text2: "Cập nhật thông tin tài khoản thành công !",
            });
          }
          setloginPending(false)
            setvisible(false);
          
  
        })
        .catch(error => console.log('error', error));
    }
    const pushError = (input) => {
      return Alert.alert(
        "Error!",
        `${input}`,
        [
          {
            text: "Ok",
          },
        ]
      );
    }
    const handleSave = () => {
      
      if (validateBlank() === false) {
        if (error["full_name"]) {
          pushError(error["full_name"])
        } else {
          if (error["email"]) {
            pushError(error["email"])
          } else {
            if (error["gender"]) {
              pushError(error["gender"])
            } else {
              if (error["role"]) {
                pushError(error["role"])
              } else {
                if (error["phone_number"]) {
                  pushError(error["phone_number"])
                } else {
                  if (error["address"]) {
                    pushError(error["address"])
                  } else {
                    try {
                      updateUser(email, dataUpdate)
                      setloginPending(true)
                      Toast.show({
                        type: "success",
                        text1: "Thông báo",
                        text2: "Đã tạo tài khoản thành công !",
                      });
                    } catch (error) {
                      showMessage({
                        message: `${error["address"]}`,
                        type: "danger",
                      });
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        try {
          updateUser(user_id, dataUpdate)
          setloginPending(true)
        } catch (error) {
          console.log(error);
          showMessage({
            message: `${error["address"]}`,
            type: "danger",
          });
        }
      }
    }
  
    return (
      <>
  
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
                width: "95%",
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
                  height: 450,
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
  
                {/* {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />} */}
                <View style={{ flexDirection: "row", marginTop: 20 }}>
  
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 30,
                      marginTop: 10,
                      marginLeft: 15,
                      borderWidth: 0.5,
                      borderColor: 'black'
                    }}
                    onPress={handleChoosePhoto}
                  >
                    <Ionicons
                      name="image-outline"
                      size={25}
                      color="black"
                      style={{
                        position: 'absolute',
                        left: 15,
                        top: 10
                      }}
  
                    />
                    {
                      image &&
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 30,
                          marginTop: 0,
                          marginLeft: 0,
  
                        }}
                        source={{
                          uri: image
                        }}
                      />
                    }
                  </TouchableOpacity>
                  <View style={{ width: '90%' }}>
                    <Text style={{ marginLeft: 12, fontWeight: '500' }}>Họ và tên</Text>
                    <TextInput
                      style={[
                        styles.inputColor,
                        error["full_name"]
                          ? styles.errorBorder
                          : styles.nonErrorBorder,
                      ]}
                      value={full_name ? full_name : null}
                      onChangeText={setfull_name}
                      underlineColorAndroid="transparent"
                      placeholder="Nhập họ và tên"
                      placeholderTextColor="#babfc3"
                    />
                  </View>
                </View>
                <View style={{ width: '123%', marginTop: 10, flexDirection: 'column' }}>
                  <Text style={{ fontWeight: '500' }}>Email</Text>
                  <TextInput
                    value={email ? email : null}
                    style={[
                      styles.inputColorEmail,
                      error["email"] ? styles.errorBorder : styles.nonErrorBorder,
                    ]}
                    onChangeText={setemail}
                    underlineColorAndroid="transparent"
                    placeholder="Nhập email"
                    placeholderTextColor="#babfc3"
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
  
  
                  <View style={{ marginTop: 10, width: '22%' }}>
                    <Text style={{ fontWeight: '500' }}
                    >Giới tính</Text>
                    <TouchableOpacity style={{ width: 100, height: 40, borderRadius: 10 }}>
                      <Ionicons
                        name="chevron-down-sharp"
                        size={22}
                        color="black"
  
                      />
                      <SelectDropdown
                        buttonStyle={{ position: 'absolute', width: 120, height: 30, backgroundColor: 'transparent', top: 5, color: 'white' }}
                        buttonTextStyle={{ height: 30, fontSize: 13 }}
                        selectedRowTextStyle={{ color: 'white', backgroundColor: 'blue' }}
                        dropdownStyle={{ width: 100, height: 100, backgroundColor: 'white' }}
                        data={genders}
                        defaultValue={genders[formatV(gender, "gender")]}
                        onSelect={(selectedItem, index) => {
                          setgender(formatT(selectedItem, "gender"))
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                          return item
                        }}
                      />
  
                    </TouchableOpacity>
  
                  </View>
                  <View style={{ marginTop: 10, width: '22%', marginLeft: 100 }}>
                    <Text style={{ fontWeight: '500', width: 100 }}
                    >Loại tài khoản</Text>
                    <TouchableOpacity style={{ width: 100, height: 40, borderRadius: 10 }}>
                      <Ionicons
                        name="chevron-down-sharp"
                        size={22}
                        color="black"
  
                      />
                      <SelectDropdown
                        buttonStyle={{ position: 'absolute', width: 120, height: 30, backgroundColor: 'transparent', top: 5, color: 'white' }}
                        buttonTextStyle={{ height: 30, fontSize: 13 }}
                        selectedRowTextStyle={{ color: 'white', backgroundColor: 'blue' }}
                        dropdownStyle={{ width: 100, height: 100, backgroundColor: 'white' }}
                        data={roles}
                        defaultValue={roles[formatV(role, "role")]}
                        onSelect={(selectedItem, index) => {
                          setrole(formatT(selectedItem, "role"))
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return item
                        }}
                      />
  
                    </TouchableOpacity>
  
                  </View>
  
                </View>
  
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontWeight: '500', width: 100 }}
                  >Số điện thoại</Text>
                  <TextInput
                    value={phone_number ? phone_number : null}
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
                      error["phone_number"]
                        ? styles.errorBorder
                        : styles.nonErrorBorder,
                    ]}
                    onChangeText={setphone_number}
                    underlineColorAndroid="transparent"
                    placeholder="Số điện thoại"
                    placeholderTextColor="#babfc3"
                  />
  
                </View>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                  <Text style={{ fontWeight: '500', width: 100 }}
                  >Địa chỉ</Text>
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
                      },
                      error["address"]
                        ? styles.errorBorder
                        : styles.nonErrorBorder,
                    ]}
                    onChangeText={setaddress}
                    underlineColorAndroid="transparent"
                    placeholder="Địa chỉ"
                    placeholderTextColor="#babfc3"
                  />
                </View>
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
                    onPress={handleSave}
  
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
         
          {/* <FlashMessage position="top" /> */}
          {loginPending ?  <AppLoader /> : null}
        </Modal>
  
      </>
    );
  };

  export default ModalPopup;