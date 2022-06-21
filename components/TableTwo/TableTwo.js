import { View, Text, Alert , ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const TableTwo = () => {

  const [dataGet, setDataGet] = useState([]);
  const [showBox, setShowBox] = useState(true);

  var url = "https://api-truongcongtoan.herokuapp.com/api/users";

  const handleLogin = async (url) => {
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
  const showConfirmDialog = (item,index) => {
   
    return Alert.alert(
      "Thao tác với tài khoản",
      `Email :  ${item.email}`,
      [
        // The "Yes" button
        {
          text: "Xóa",
          onPress: () => {
            onDeletePress(item)
          },
        },
        {
          text: "Sửa",
          onPress: () => {
           
          },
        },
       
        {
          text: "Thoát",
        },
      ]
    );
  };

  const onDeletePress = (input) =>{
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
  }
  useEffect(() => {
    handleLogin(url);
  }, []);

  const formatGender = (input) => {
    if (input === "M") {
      return "Nam"
    } else if (input === 'F') {
      return "Nữ"
    } else if (input === "O") {
      return " Khác"
    } else {
      return ''
    }
  }

  const rowPress = (item,index) => {
    showConfirmDialog(item,index)

  }

  return (

    <ScrollView horizontal>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: '100%',
          height: '50%',
          // borderWidth:1,

        }}
      >
        {/* <View style={{ backgroundColor: 'red' ,justifyContent:'center',alignItems:'center'}}> */}
        <Text style={{ fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 20 }}>Quản lý tài khoản</Text>

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
                textAlign: 'center',
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
                textAlign: 'center',
                marginBottom: 0
              }}
            >
              Địa chỉ
            </Text>
          </View>
        </View>

        {

          dataGet && dataGet.map(
            (item, index) => (

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
                  <Text style={{ width: 150, height: 30, backgroundColor: "transparent" }} onPress={() => rowPress(item,index)}>
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
                  <Text style={{ width: 100, backgroundColor: "transparent" }} onPress={() => rowPress(item,index)}>
                    {
                      item.allCodeRole ? item.allCodeRole.valuevi : ''
                    }
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
                  <Text style={{ width: 100, backgroundColor: "transparent" }} onPress={() => rowPress(item,index)}>{formatGender(item.gender)}</Text>
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
                  <Text style={{ width: 150, backgroundColor: "transparent" }} onPress={() => rowPress(item,index)}>
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
                    marginBottom: 0
                  }}
                >
                  <Text style={{ width: 100, backgroundColor: "transparent" }} onPress={() => rowPress(item,index)}>
                    {item.address}
                  </Text>
                </View>

              </View>

            )
          )
        }

        {/* </View> */}
      </View>
    </ScrollView>
  );
};

export default TableTwo;
