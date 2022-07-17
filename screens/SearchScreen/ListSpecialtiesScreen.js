import React, { useState, useEffect } from "react";

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, Image,FlatList ,TouchableOpacity} from "react-native";
import { SearchBar } from "react-native-elements";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import { useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux'
import allAction from "../../components/redux/action/allAction";


const ListSpecialtiesScreen = () => {

    const navigation = useNavigation()

    
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const url_Specialties = "https://api-truongcongtoan.herokuapp.com/api/specialties/";
  const url_User = "https://api-truongcongtoan.herokuapp.com/api/users/"
  const url_markdown = "https://api-truongcongtoan.herokuapp.com/api/markdowns/"
  const url_Info = "https://api-truongcongtoan.herokuapp.com/api/doctorinfo/"
  
  const [SelectedUser, setSelectedUser] = useState({})
  const [SelectedSpecialties, setSelectedSpecialties] = useState({})
  const [markDownGet, setmarkDownGet] = useState({})
  const [doctorInfo, setdoctorInfo] = useState({})
  const dispatch = useDispatch();


  var checkLoadingPage = useSelector((state) => state.user);

  useEffect(() => {
   let check = false
   if (!check) {
    fetch(url_Specialties)
    .then((response) => response.json())
    .then((responseJson) => {
      setFilteredDataSource(responseJson);
      setMasterDataSource(responseJson);0
    })
    .catch((error) => {
      console.error(error);
    });
   }
   return () => {
    check = true
  }

  }, [checkLoadingPage]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
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
       <>
        <TouchableOpacity onPress={() => getItem(item)}> 
      <View style={{ flex: 1, flexDirection: "row",height:120 }}>
        {item.image ?
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
            marginTop: 10,
            marginLeft: 10,
            borderWidth: 0.3,
            borderColor: "black",
          }}
          source={{ uri: item.image }}
        />
        :
        <EvilIcons name="user" size={70} color="black" />}

        <View style={{ flexDirection: "column", marginLeft: 20 }}>
          <Text style={styles.itemStyle}>
             {item.name}
          </Text>
        </View>
      </View>
      </TouchableOpacity>
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
  const [dataUser, setdataUser] = useState({});

  const getItem = (item) => {
      console.log("item ",item.id);
    navigation.navigate("Chitietchuyenkhoa")
    fetchData(url_Specialties,item.id,setSelectedSpecialties)
    // fetchData(url_markdown,item.user_id,setmarkDownGet)
    // fetchData(url_Info,item.user_id,setdoctorInfo)
  };
  useEffect(() => {
    let check = false ;
    if (!check) {

     dispatch(allAction.specialtiesAction.addOneSpecialties(SelectedSpecialties))
    //  dispatch(allAction.userAction.addMarkDown(markDownGet))
    //  dispatch(allAction.userAction.addDoctorInfo(doctorInfo))
    }
    return () => {
      check = true
    }
  }, [SelectedSpecialties])

 const fetchData = (url,user_id,setData) =>{
  console.log("id la ",user_id);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'  
  };
  
  fetch(`${url}${user_id}`, requestOptions)
    .then(response => response.text())
    .then(result => setData(JSON.parse(result)))
    .catch(error => console.log('error', error));
}
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
          Chuyên khoa nổi bật
        </Text>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        
      </View>
      {!dataUser ? <AppLoader /> : null}
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

export default ListSpecialtiesScreen;
