import React, { useState, useEffect } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import { useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import allAction from "../../components/redux/action/allAction";

const ListAllDoctorScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const url_User_Doctor =
    "https://api-truongcongtoan.herokuapp.com/api/users/doctors";
  const url_User = "https://api-truongcongtoan.herokuapp.com/api/users/";
  const url_markdown =
    "https://api-truongcongtoan.herokuapp.com/api/markdowns/";
  const url_Info = "https://api-truongcongtoan.herokuapp.com/api/doctorinfo/";

  const [doctorInfo, setdoctorInfo] = useState({});
  const dispatch = useDispatch();

  var checkLoadingPage = useSelector((state) => state.user);

  useEffect(() => {
    fetch(url_User_Doctor)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
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
    // console.log("gia tri chuyen khoa ",item);
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
            <Text style={styles.itemStyle}>Bác sĩ {item.full_name}</Text>
            <Text style={{ paddingLeft: 10 }}>Khoa thần kinh</Text>
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

  const getItem = (item) => {
    dispatch(allAction.userAction.addUser(item.user_id));
// console.log("gia tri item co dc la ",item.user_id);
    navigation.navigate("Chitietbacsi");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
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
        <Text
          style={{
            fontWeight: "700",
            fontSize: 15,
            textTransform: "uppercase",
            padding: 10,
          }}
        >
          Bác sĩ nổi bật
        </Text>
      </View>
      <FlatList
        data={filteredDataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />

      {/* {!dataUser ? <AppLoader /> : null} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
});

export default ListAllDoctorScreen;
