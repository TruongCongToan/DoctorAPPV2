import { View, Text, Image, TouchableOpacity,StyleSheet, FlatList, ScrollView } from "react-native";
import React,{useEffect,useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "../HeaderScreen/HeaderScreen";
import TableTwo from "../../components/TableTwo/TableTwo";
import { useSelector } from "react-redux";
import TableOne from "../../components/TableTwo/TableOne";
// import { Container } from "native-base";
// import { useSelector } from "react-redux";
var url = "https://api-truongcongtoan.herokuapp.com/api/users/doctors";

const HomeScreen = ({ navigation }) => {
  var SignInPerson = useSelector(state => state.user.signInPerson)

  // console.log("asdw",SignInPerson.signInPerson.role);
  const [listUsers, setlistUsers] = useState([])
  const fetchData = async (url, setData) => {
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
  useEffect(() => {
    fetchData(url,setlistUsers)
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <HeaderScreen navigation = {navigation}/>
   
    {SignInPerson.role === "R3" ?<TableOne listUsers= {listUsers} /> : <TableTwo/>}
    </SafeAreaView>
  );
};


export default HomeScreen;
