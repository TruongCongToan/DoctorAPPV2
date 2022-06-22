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
  Button
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectDropdown from 'react-native-select-dropdown'
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";


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

  const [chooseData, setchooseData] = useState('Giới tính')

  const [full_name, setfull_name] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [phone_number, setphone_number] = useState('')
  const [role, setrole] = useState('')
  const [address, setaddress] = useState('')
  const [gender, setgender] = useState('')

  const genders = ["Nam", "Nữ", "Khác"]
  const roles = ["Quản trị viên", "Bác sĩ", "Bệnh nhân"]
  useEffect(() => {
    toggleModal();
  }, [visible]);
  useEffect(() => {

    setfull_name(dataUser.full_name)
    setemail(dataUser.email)
    setphone_number(dataUser.phone_number),
      setrole(dataUser.role)
    setaddress(dataUser.address)
    setgender(dataUser.gender)
    // validateBlank()
  }, [dataUser])

  useEffect(() => {
    validateBlank()
    setdataUpdate({
      full_name:full_name,
      email:email,
      gender:gender,
      role:role,
      phone_number:phone_number,
      address:address
    })
  }, [full_name, email, gender, role, phone_number, address])

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
      errors["full_name"] = "Không được bỏ trống họ và tên !";
    } else if (!email) {
      formIsValid = false;
      errors["email"] = "Không được bỏ trống email!";
    } else {
      if (!validateEmail(email)) {
        formIsValid = false;
        errors["email"] = " Email không đúng định dạng! VD: xxx@yyy.com";
        seterror(errors);
      } else {
        if (!gender) {
          formIsValid = false;
          errors["gender"] = "Không được bỏ trống giới tính !";
        } else {
          if (!role) {
            formIsValid = false;
            errors["role"] = "Không được bỏ trống: loại tài khoản !";
          } else {
            if (!phone_number) {
              formIsValid = false;
              errors["phone_number"] = "Không được bỏ trống số điện thoại !";
            } else {
              if (!validatePhoneNumber(phone_number)) {
                formIsValid = false;
                errors["phone_number"] = "Số điện thoại phải là số và có 10 chữ số!";
              } else {
                if (!address) {
                  formIsValid = false;
                  errors["address"] = "Không được bỏ trống địa chỉ!";
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


  const handleChoosePhoto = () => {
    alert("ok")
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
  const [dataUpdate, setdataUpdate] = useState({
    email:'',
    password:'',
    full_name:'',
    gender:'',
    role:'',
    phone_number:'',
    address:''
  })

  const updateUser = (email,data) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTU4OTQ0OTMsIm5iZiI6MTY1NTg5Mzg5MywiaWQiOjE5MSwgInJvbGUiOiJVU0VSIn0.qHD6jGpSxXs6upKSvPF0CfxAJ-68BAeO0Z6CcPS3YwE");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "role": "R3",
      "gender": "O"
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://api-truongcongtoan-login.herokuapp.com/api/user/trang@gmail.com`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  const handleSave = () => {
    console.log("du lieu thu duoc ", full_name);
    console.log("check ", validateBlank(), error["email"]);
    if (validateBlank() === false) {
      if (error["full_name"]) {
        showMessage({
          message: `${error["full_name"]}`,
          type: "danger",
        });
      } else {
        if (error["email"]) {
          showMessage({
            message: `${error["email"]}`,
            type: "danger",
          });
        } else {
          if (error["gender"]) {
            showMessage({
              message: `${error["gender"]}`,
              type: "danger",
            });
          } else {
            if (error["role"]) {
              showMessage({
                message: `${error["role"]}`,
                type: "danger",
              });
            } else {
              if (error["phone_number"]) {
                showMessage({
                  message: `${error["phone_number"]}`,
                  type: "danger",
                });
              } else {
                if (error["address"]) {
                  showMessage({
                    message: `${error["address"]}`,
                    type: "danger",
                  });
                } else {
                 
                 try {
                  updateUser(email)
                  showMessage({
                    message: `Chỉnh sửa thành công !`,
                    type: "success",
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
      showMessage({
        message: `Thanh cong`,
        type: "success",
      });
    }
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

            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity onPress={handleChoosePhoto}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    marginTop: 5,
                    marginLeft: 15
                  }}
                  source={{
                    uri: "https://images.unsplash.com/photo-1655453421065-20c9655a229d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                  }}
                />
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
      <FlashMessage position="top" />
    </Modal>
  );
};
const TableTwo = () => {
  const [dataGet, setDataGet] = useState([]);
  const [showBox, setShowBox] = useState(true);
  const [visible, setvisible] = useState(false);
  const [count, setcount] = useState(1)

  const [dataUser, setdataUser] = useState({})


  var url = "https://api-truongcongtoan.herokuapp.com/api/users";
  var url_User = "https://api-truongcongtoan.herokuapp.com/api/users/";


  const showConfirmDialog = (item, index) => {
    handleLogin(`${url_User}${item.email}`, setdataUser)
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
  const deleteUser = (email) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(`https://api-truongcongtoan.herokuapp.com/api/users/${email}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const onDeletePress = (input) => {
    return Alert.alert(
      "Thông báo",
      `Bạn có chắc chắn muốn xóa: ${input.email}`,
      [
        // The "Yes" button
        {
          text: "Có",
          onPress: () => {
            deleteUser(input.email);
            setcount(count + 1);
            showMessage({
              message: `Thanh cong`,
              type: "success",
            });
            setShowBox(false);
          },
        },

        {
          text: "Không",
        },
      ]
    );
  };

  useEffect(() => {
    handleLogin(url, setDataGet);
    // console.log("xin chao ");
  }, [count]);

  const handleLogin = async (url, setData) => {
    // console.log("calling data ...");

    var requestOptions = {
      method: "GET",
      transparentirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setData(JSON.parse(result))
      })
      .catch((error) => console.log("error", error));
  };

  // console.log("data get " ,dataGet);
  const formatGender = (input) => {
    if (input === "M") {
      return "Nam";
    } else if (input === "F") {
      return "Nữ";
    } else if (input === "O") {
      return " Khác";
    } else {
      return null;
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
              onPress={() => { }}
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
          }}
        >
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
                    {item.allCodeRole ? item.allCodeRole.valuevi : null}
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
