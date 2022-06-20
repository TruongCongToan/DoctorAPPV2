// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, ScrollView, Text } from "react-native";
// import { DataTable } from "react-native-paper";

// export default function TableTwo() {
//   const optionsPerPage = [2, 3, 4];

//   const [dataGet, setDataGet] = useState([]);
//   var url = "https://api-truongcongtoan.herokuapp.com/api/users";

//   const handleLogin = async (url) => {
//     console.log("calling data ...");

//     var requestOptions = {
//       method: "GET",
//       transparentirect: "follow",
//     };

//     fetch("https://api-truongcongtoan.herokuapp.com/api/users", requestOptions)
//       .then((response) => response.text())
//       .then((result) => setDataGet(JSON.parse(result)))
//       .catch((error) => console.log("error", error));
//   };

//   useEffect(() => {
//     handleLogin();
//   }, []);

//   return (
//     <ScrollView horizontal>
//       <DataTable style={styles.table}>
//         <DataTable.Header>
//           <DataTable.Title style={{flex:1, alignItems: "center" }}>

//             <Text style={styles.tableHeading}>Họ và tên</Text>
//           </DataTable.Title>
//           <DataTable.Title style={{flex:2, width: 180 }}>

//             <Text style={styles.tableHeading}>Ngày sinh</Text>
//           </DataTable.Title>
//           <DataTable.Title style={{ flex:2}}>

//             <Text style={styles.tableHeading}>Email</Text>
//           </DataTable.Title>
//           <DataTable.Title style={{flex:1, width: 150 }}>

//             <Text style={styles.tableHeading}>Số điện thoại</Text>
//           </DataTable.Title>
//           <DataTable.Title style={{ width: 150 }}>

//             <Text style={styles.tableHeading}>Địa chỉ</Text>
//           </DataTable.Title>
//         </DataTable.Header>
//         {dataGet &&
//           dataGet.map((item, key) => {
//             return (
//               <DataTable.Row key={key}>
//                 <DataTable.Cell style={{ width:100,alignContent:'center'}}>
//                   <Text>{item.full_name}</Text>
//                 </DataTable.Cell>
//                 <DataTable.Cell style={{ width:'10%' }}>
//                   <Text >26-11-1999</Text>
//                 </DataTable.Cell>
//                 <DataTable.Cell style={{width:'auto'}}>{item.email}</DataTable.Cell>
//                 <DataTable.Cell>{item.phone_number}</DataTable.Cell>
//                 <DataTable.Cell>{item.address}</DataTable.Cell>
//               </DataTable.Row>
//             );
//           })}
//         <DataTable.Pagination
//           page={1}
//           numberOfPages={3}
//           onPageChange={(page) => {
//             console.log(page);
//           }}
//           label="1-2 of 6"
//         />
//       </DataTable>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   table: {},
//   headSection: {
//     borderBottomWidth: 2,
//     borderColor: "black",
//     paddingBottom: 15,
//   },
//   titleHeading: {
//     marginTop: 50,
//     fontWeight: "bold",
//     marginHorizontal: 167,
//   },
//   tableHeading: {
//     fontWeight: "bold",
//     color: "black",
//     textAlign:'center'
//   },
//   header: {
//     paddingLeft: 0,
//   },
// });

import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";

const TableTwo = () => {
  const data = [
    {
      full_name: "truong cong toan",
      email: "toan@gmail.com",
      address: "thanh hoa",
    },
    {
      full_name: "truong cong nam",
      email: "toan@gmail.com",
      address: "thanh hoa",
    },
    {
      full_name: "truong cong tien",
      email: "toan@gmail.com",
      address: "thanh hoa",
    },
    {
      full_name: "truong cong nam",
      email: "toan@gmail.com",
      address: "thanh hoa",
    },
    {
      full_name: "truong cong tien",
      email: "toan@gmail.com",
      address: "thanh hoa",
    },
  ];

  const item = ({ item }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 8,
          }}
        >
          <Text style={{ width: 150, backgroundColor: "white" }}>
            {item.full_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 8,
          }}
        >
          <Text style={{ width: 100, backgroundColor: "white" }}>
            {"26/11/1999"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 8,
          }}
        >
          <Text style={{ width: 100, backgroundColor: "white" }}>{"Nam"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 8,
          }}
        >
          <Text style={{ width: 150, backgroundColor: "white" }}>
            {item.email}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 8,
          }}
        >
          <Text style={{ width: 100, backgroundColor: "white" }}>
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
          marginTop: "10%",
          width:'100%'
        }}
      >
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                width: 150,
                backgroundColor: "transparent",
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 0.2,
                borderTopColor: "transparent",
                fontWeight: "bold",
                fontSize: 15,
                marginBottom:5,
                
              }}
            >
              Họ và tên
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
              Ngày sinh
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
          data={data}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default TableTwo;
