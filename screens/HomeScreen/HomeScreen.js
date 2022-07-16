import { View, Text, Image, TouchableOpacity,StyleSheet, FlatList, ScrollView } from "react-native";
import React,{useEffect,useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "../HeaderScreen/HeaderScreen";
import TableTwo from "../../components/TableTwo/TableTwo";
import { useSelector } from "react-redux";
import TableOne from "../../components/TableTwo/TableOne";
// import { Container } from "native-base";
// import { useSelector } from "react-redux";
const url = "https://api-truongcongtoan.herokuapp.com/api/users/doctors";
const url_Specialties = "https://api-truongcongtoan.herokuapp.com/api/specialties"


const HomeScreen = ({ navigation }) => {
  var SignInPerson = useSelector(state => state.user.signInPerson)

  const [listUsers, setlistUsers] = useState([])
  const [listSpecialties, setlistSpecialties] = useState([])

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
    fetchData(url_Specialties,setlistSpecialties)
  }, [SignInPerson])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <HeaderScreen navigation = {navigation}/>
   
    {SignInPerson && SignInPerson.role === "R3" ?<TableOne listUsers= {listUsers} listSpecialties ={listSpecialties}/> : <TableTwo/>}
    </SafeAreaView>
  );
};


export default HomeScreen;
