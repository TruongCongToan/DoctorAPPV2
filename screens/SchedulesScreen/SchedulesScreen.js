import { View, Text, FlatList, RefreshControl,ScrollView} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderScreen from "../HeaderScreen/HeaderScreen";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
Fontisto

import moment from "moment";
import "moment/locale/vi";
import _ from "lodash";
import { useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";

const ScheduleScreen = ({ navigation }) => {
  const url_booking = "https://api-truongcongtoan.herokuapp.com/api/bookings/patient/";
  const url_Email_Data_Mail ="https://api-truongcongtoan.herokuapp.com/api/mail/";

  const [loading, setloading] = useState("");
  const signInPerson = useSelector((state) => state.user.signInPerson);
  const [listBookings, setlistBookings] = useState([])

  const [idSiginPerson, setidSiginPerson] = useState(0)

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchData(url_Email_Data_Mail,idSiginPerson,setlistBookings)
      wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let check = false;
    if (!check) {
     setidSiginPerson(signInPerson.user_id)
    }
    return () => {
      check = true;
    };
  }, [signInPerson]);

  useEffect(() => {
    let check = false;
    if (!check) {
     fetchData(url_Email_Data_Mail,idSiginPerson,setlistBookings)
    }
    return () => {
      check = true;
    };
  }, [idSiginPerson]);
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
    // dispatch(allAction.specialtiesAction.addOneSpecialties(item.id));
    // dispatch(allAction.clinicAction.addClinicSpecialtiesCheck("clinic"));
    // navigation.navigate("Chitietchuyenkhoa");
  };

  const ItemView = ({ item }) => {
    return (
      <View style={{flex:1}}>
        <View style ={{flexDirection:'row'}}>
            <View style ={{flexDirection:'column'}}>
                <View style={{marginLeft:15}}>
                  <View style={{borderRadius:100,borderWidth:0.3,height:60,width:60,margin:10,justifyContent:'center',alignItems:'center',borderColor:'gray'}}> 
                  <MaterialCommunityIcons name="doctor" size={50}  color="#0092c5" />
                  </View>
                <Text style ={{fontSize:14,textTransform:'uppercase',color:"#0092c5",paddingLeft:20}}>Khám</Text>
               
                <View style={{flexDirection:'row',width:180,}}>
                <Feather name="clock" size={20} color="#FDB750" />
                <Text style={{color:"#FDB750",paddingLeft:10}}>{item && item.ngaykham ? item.ngaykham.split(",")[0] : null}</Text>
                </View>

                <View style={{flexDirection:'row',marginTop:5}}>
                <Feather name="calendar" size={20} color="#FDB750" />
                <Text style={{color:"#FDB750",paddingLeft:5}}>{item && item.ngaykham ? item.ngaykham.split(",")[1] : null}</Text>
               
                </View>
                <View style={{flexDirection:'row',marginTop:5}}>
                <Fontisto name="email" size={20} color="#FDB750" />
                <Text style={{fontSize:11,fontWeight:'200',paddingLeft:10,paddingTop:3}}> {item && item.email_address ? item.email_address :null}</Text>
                </View>

                <View style={{height:35,backgroundColor: '#0092c5',width:100,alignItems:'center',justifyContent:'center',borderRadius:7,marginTop:20,}}>
                  <Text style={{color:'white',textAlign:'center'}}>Chờ xác nhận</Text>
                </View>
                </View>
            </View>
            <View style ={{flexDirection:'column',marginLeft:25}}>
              <Text style={{fontWeight:'bold',paddingTop:10}}>Tên bệnh nhân:</Text>
              <Text style={{fontWeight:'300',paddingTop:10}}>{item ? item.full_name:null}</Text>
              <Text style={{fontWeight:'bold',paddingTop:10}}>Năm sinh:</Text>
              <Text style={{fontWeight:'300',paddingTop:10}}>{item ? item.birth_year:null}</Text>
              <Text style={{fontWeight:'bold',paddingTop:10}}>Giới tính:</Text>
              <Text style={{fontWeight:'300',paddingTop:10}}>{item ? item.gender:null}</Text>
              <Text style={{fontWeight:'bold',paddingTop:10}}>Số điện thoại:</Text>
              <Text style={{fontWeight:'300',paddingTop:10}}>{item ? item.phone_number:null}</Text>
              <Text style={{fontWeight:'bold',paddingTop:10}}>Lý do khám:</Text>
              <Text style={{fontWeight:'300',paddingTop:10}}>{item ? item.reason:null}</Text>
              <Text style={{fontWeight:'bold',paddingTop:10}}>Bác sĩ khám:</Text>
              <Text style={{fontWeight:'300',marginBottom:15}}>{item ? item.doctor_name:null}</Text>

            </View>
        </View>
        <View style={{height:80}}></View>
      </View>
    );
  };
 

  const fetchData = (url, id,setData) => {
    console.log(`${url}${id}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result)) {
          setData(JSON.parse(result));
        } else {
          setData(null);
        }
        setloading("done");
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={{ flex: 1 }}>
      {listBookings.length === 0 ? <AppLoader /> :null}
      <ScrollView
                // contentContainerStyle= {styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
      <HeaderScreen navigation={navigation} />
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "600",
            textTransform: "uppercase",
            padding: 20,
            color: "#0092c5",
          }}
        >
          Danh sách lịch hẹn{" "}
        </Text>
      </View>
          </ScrollView>
      <FlatList
              data={listBookings && listBookings.length > 0 ? listBookings : null}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
    </View>
  );
};

export default ScheduleScreen;
