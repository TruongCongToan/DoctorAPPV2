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

const ListClinicScreen = () => {
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const url_Clinic =
    "https://api-truongcongtoan.herokuapp.com/api/Clinic/";

  const dispatch = useDispatch();

  var checkLoadingPage = useSelector((state) => state.user);

  useEffect(() => {
    let check = false;
    if (!check) {
      fetch(url_Clinic)
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
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
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
      <>
        <TouchableOpacity onPress={() => getItem(item)}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              height: 120,
              marginLeft: 20,
            }}
          >
            {item.image ? (
              <Image
                style={{
                  width: 100,
                  height: 110,
                  borderRadius: 5,
                  marginTop: 20,
                  marginLeft: 10,
                  borderWidth: 0.3,
                  borderColor: "black",
                }}
                source={{ uri: item.image }}
              />
            ) : (
              <EvilIcons name="user" size={100} color="black" />
            )}

            <View style={{ flexDirection: "column", marginLeft: 20 }}>
              <Text style={[styles.itemStyle, { paddingLeft:10,paddingTop:20 }]}>
                {item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ height: 20 }}></View>
      </>
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
    console.log("item ", item.id);
    dispatch(allAction.clinicAction.addOneClinic(item.id));
    navigation.navigate("ChitietCSYT");
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
           Cơ sở y tế nổi bật
        </Text>
      </View>
      <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        {
          masterDataSource.length === 0 ? <AppLoader /> :null
        }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 20,
  },
});

export default ListClinicScreen;
