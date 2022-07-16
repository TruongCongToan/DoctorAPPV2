import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SearchBar } from "react-native-elements";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import ModalPopup from "../../components/TableTwo/ModalPopup";
import { useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [visible, setvisible] = useState(false);
  var url_User = "https://api-truongcongtoan.herokuapp.com/api/users/";

  var checkLoadingPage = useSelector((state) => state.user);

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let check = false;
    if (!check) {
      fetch(url_User)
        .then((response) => response.json())
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return () => {
      check = true;
    };
  }, [checkLoadingPage]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.full_name
          ? item.full_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => getItem(item)}>
        <View style={{ flex: 1, flexDirection: "row", height: 80 }}>
          {item.image ? (
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                marginTop: 10,
                marginLeft: 10,
                borderWidth: 0.3,
                borderColor: "black",
              }}
              source={{ uri: item.image }}
            />
          ) : (
            <EvilIcons name="user" size={70} color="black" />
          )}

          <View style={{ flexDirection: "column", marginLeft: 15 }}>
            <Text style={styles.itemStyle}>Tài khoản: {item.full_name}</Text>
            <Text style={{ paddingLeft: 10 }}>
              Loại tài khoản:{" "}
              {item.allCodeRole ? item.allCodeRole.valuevi : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#0092c5",
        }}
      />
    );
  };
  const [dataUser, setdataUser] = useState([]);

  const getItem = (item) => {
    // Function for click on an item
    setvisible(true);
    // alert('Id : ' + item.id + ' full_name : ' + item.email);
    fetchData(`${url_User}${item.user_id}`, setdataUser);
  };
  //   console.log("gia tri lay duoc la ",dataUser.len);

  const fetchData = (url, setData) => {
    // console.log("calling data ...");

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
  return (
    <>
      <ModalPopup
        visible={visible}
        setvisible={setvisible}
        dataUser={dataUser}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <HeaderLogo />
          <SearchBar
            round
            searchIcon={{ size: 24, color: "white" }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction("")}
            placeholder="Tìm kiếm thông tin..."
            style={{ color: "white" }}
            value={search}
            inputContainerStyle={{ backgroundColor: "#0092c5" }}
            placeholderTextColor={"white"}
            containerStyle={{
              backgroundColor: "white",
              borderWidth: 1,
              borderTopColor: "white",
              corlor: "white",
              borderBottomColor: "white",
              elevation: 0,
              borderRadius: 5,
            }}
          />
        </ScrollView>
         
      </View>
      <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            contentContainerStyle={{ flexGrow: 1 }}
          />
      {filteredDataSource.length === 0 ? <AppLoader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default SearchScreen;
