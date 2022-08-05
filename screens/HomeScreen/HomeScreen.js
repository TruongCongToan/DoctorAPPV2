import { View, Text, Image, TouchableOpacity,StyleSheet, FlatList, ScrollView } from "react-native";
import React,{useEffect,useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "../HeaderScreen/HeaderScreen";
import TableTwo from "../../components/TableTwo/TableTwo";
import { useSelector } from "react-redux";
import TableOne from "../../components/TableTwo/TableOne";
import AppLoader from "../AppLoader/AppLoader";
import TableThree from "../../components/TableTwo/TableThree"

const url = "https://api-truongcongtoan.herokuapp.com/api/doctorinfo";
const url_Specialties = "https://api-truongcongtoan.herokuapp.com/api/specialties"
const url_Clinic = "https://api-truongcongtoan.herokuapp.com/api/Clinic";

const HomeScreen = ({ navigation }) => {
  var SignInPerson = useSelector(state => state.user.signInPerson)

  const [listUsers, setlistUsers] = useState([])
  const [listSpecialties, setlistSpecialties] = useState([])
  const [listClinic, setlistClinic] = useState([])

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
    fetchData(url_Clinic,setlistClinic)
  }, [SignInPerson])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {listClinic.length === 0 ? <AppLoader /> : null}
    <HeaderScreen navigation = {navigation}/>
   
    {SignInPerson && SignInPerson.role === "R3" ?<TableOne listUsers= {listUsers} listSpecialties ={listSpecialties} listClinic = {listClinic} /> : 
    <>
    {
      SignInPerson && SignInPerson.role === "R2" ? <TableThree /> :<TableTwo />
    }
    </>
    }
    </SafeAreaView>
  );
};


export default HomeScreen;
