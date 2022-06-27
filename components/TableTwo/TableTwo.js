//dang dung o 118
import {
  View,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoader from "../../screens/AppLoader/AppLoader";
import ModalPopup from "./ModalPopup";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";


const TableTwo = () => {
  const [dataGet, setDataGet] = useState([]);
  const [showBox, setShowBox] = useState(true);
  const [visible, setvisible] = useState(false);
  const [count, setcount] = useState(1)
  const [dataUser, setdataUser] = useState([])
  const [doctorList, setdoctorList] = useState([])

  var url = "https://api-truongcongtoan.herokuapp.com/api/users";
  var url_User = "https://api-truongcongtoan.herokuapp.com/api/users/";
  var url_Doctor = "http://api-truongcongtoan.herokuapp.com/api/users/doctors"

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
        {
          text: "Có",
          onPress: () => {
            deleteUser(input.email);
            setcount(count + 1);
            Toast.show({
              type: "success",
              text1: "Thông báo",
              text2: "Cập nhật thông tin tài khoản thành công!",
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
  var checkLoadingPage = useSelector(state => state.user)
  useEffect(() => {
    handleLogin(url, setDataGet);
    handleLogin(url_Doctor,setdoctorList)
  }, [count, checkLoadingPage]);

  // useEffect(() => {
  //     dis
  // }, [doctorList])
  
  const handleLogin = async (url, setData) => {
    var requestOptions = {
      method: "GET",
      transparentirect: "follow",
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
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

          {dataGet
            ?
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
            ))
            :
            <AppLoader />
          }
        </View>
      </ScrollView>
      {dataGet.length === 0 ? <AppLoader /> : null}
    </>
  );
};

export default TableTwo;
