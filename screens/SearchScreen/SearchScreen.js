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
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import allAction from "../../components/redux/action/allAction";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [visible, setvisible] = useState(false);

  const signInPerson = useSelector((state) => state.user.signInPerson);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  var url_User = "https://api-truongcongtoan.herokuapp.com/api/users/";
  var url_Special = "http://api-truongcongtoan.herokuapp.com/api/specialties/"
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
      if (signInPerson && signInPerson.role === "R1") {
        fetch(url_User)
        .then((response) => response.json())
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
      }else{
        fetch(url_Special)
        .then((response) => response.json())
        .then((responseJson) => {
          setFilteredDataSource(responseJson);
          setMasterDataSource(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }
    return () => {
      check = true;
    };
  }, [checkLoadingPage]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
     if (signInPerson && signInPerson.role === "R1") {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.full_name
          ? item.full_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
     }else{
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
     }
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <>
      { signInPerson && signInPerson.role === "R1" ?
      <TouchableOpacity  onPress={() => getItem(item)}>
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
      :
      <>
      <TouchableOpacity onPress={() => getItem(item)}> 
    <View style={{ flex: 1, flexDirection: "row",height:120 ,marginLeft:20}}>
      {item.image ?
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
      :
      <EvilIcons name="user" size={100} color="black" />}

      <View style={{ flexDirection: "column", marginLeft: 20 }}>
        <Text style={[styles.itemStyle,{padding:25,}]}>
           {item.name}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
    <View style={{height:20}}>

    </View>
     </>
      }
      <View style={{height:20}}>

      </View>
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
  const [dataUser, setdataUser] = useState([]);

  const getItem = (item) => {
    if (signInPerson && signInPerson.role === "R1") {
      setvisible(true);
      fetchData(`${url_User}${item.user_id}`, setdataUser);
    }else{
      dispatch(allAction.specialtiesAction.addOneSpecialties(item.id))
      dispatch(allAction.clinicAction.addClinicSpecialtiesCheck("specialties"))
      navigation.navigate("Chitietchuyenkhoa")
    }
  };

  const fetchData = (url, setData) => {
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
      {masterDataSource.length === 0 ? <AppLoader /> : null}
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
