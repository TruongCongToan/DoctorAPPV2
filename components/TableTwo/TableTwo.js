import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { DataTable } from "react-native-paper";

export default function TableTwo() {
  const [dataGet, setDataGet] = useState([]);
  var url = "https://api-truongcongtoan.herokuapp.com/api/users";

  const handleLogin = async (url) => {
    console.log("calling data ...");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://api-truongcongtoan.herokuapp.com/api/users", requestOptions)
      .then((response) => response.text())
      .then((result) => setDataGet(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    handleLogin();
  }, []);

  console.log("du lieu thu duoc", dataGet);

  return (
    <ScrollView horizontal>
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title style={{ width: 250, alignItems: "center" }}>
       
            <Text style={styles.tableHeading}>Họ và tên</Text>
          </DataTable.Title>
          <DataTable.Title style={{ width: 150 }}>
       
            <Text style={styles.tableHeading}>Ngày sinh</Text>
          </DataTable.Title>
          <DataTable.Title style={{ width: 250 }}>
       
            <Text style={styles.tableHeading}>Email</Text>
          </DataTable.Title>
          <DataTable.Title style={{ width: 150 }}>
       
            <Text style={styles.tableHeading}>Số điện thoại</Text>
          </DataTable.Title>
          <DataTable.Title style={{ width: 150 }}>
       
            <Text style={styles.tableHeading}>Địa chỉ</Text>
          </DataTable.Title>
        </DataTable.Header>
        {dataGet &&
          dataGet.map((item, key) => {
            return (
              <DataTable.Row key={key}>
                <DataTable.Cell style={{ width: 80}}>
                  <Text>{item.full_name}</Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 40 }}>
                  <Text>26/11/1999</Text>
                </DataTable.Cell>
                <DataTable.Cell>{item.email}</DataTable.Cell>
                <DataTable.Cell>{item.phone_number}</DataTable.Cell>
                <DataTable.Cell>{item.address}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {},
  headSection: {
    borderBottomWidth: 2,
    borderColor: "black",
    paddingBottom: 15,
  },
  titleHeading: {
    marginTop: 50,
    fontWeight: "bold",
    marginHorizontal: 167,
  },
  tableHeading: {
    fontWeight: "bold",
    color: "black",
  },
  header: {
    paddingLeft: 0,
  },
});
