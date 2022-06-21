import { View, Text, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const TableTwo = () => {

  const [dataGet, setDataGet] = useState([]);
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

  const item = ({ item, index }) => {

    return (
      <View style={{ flexDirection: "row" }}>
       
        <View
          style={{
            flexDirection: "row",
            borderWidth: 0.4,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 8,
          }}
        >
          <Text onPress={console.log(index)} style={{ width: 150, backgroundColor: "transparent" }}>
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
          <Text style={{ width: 100, backgroundColor: "transparent" }}>
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
          <Text style={{ width: 100, backgroundColor: "transparent" }}>{formatGender(item.gender)}</Text>
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
          <Text style={{ width: 150, backgroundColor: "transparent" }}>
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
          <Text style={{ width: 100, backgroundColor: "transparent" }}>
            {item.address}
          </Text>
        </View>
  
      </View>
    );
  };

  return (

    <ScrollView horizontal>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2%",
          width: '100%'
        }}
      >
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
              }}
            >
              Địa chỉ
            </Text>
          </View>
        </View>
        <FlatList
          data={dataGet}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}

        />
      {/* {console.log()} */}
      </View>
    </ScrollView>
  );
};

export default TableTwo;
