import { View, Text, FlatList, Linking, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import HeaderScreen from "../HeaderScreen/HeaderScreen";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";

import "moment/locale/vi";
import _ from "lodash";
import { useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";
import RNPickerSelect from "react-native-picker-select";

const ScheduleScreen = ({ navigation }) => {

  const url_Email_Data_Mail =
    "https://api-truongcongtoan.herokuapp.com/api/mail/";
  const url_Email_Data_Mail_Doctord =
    "https://api-truongcongtoan.herokuapp.com/api/mail/doctorID/";

  const [loading, setloading] = useState("");
  const signInPerson = useSelector((state) => state.user.signInPerson);
  const [listBookings, setlistBookings] = useState([]);
  const [idSiginPerson, setidSiginPerson] = useState(0);

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // if (signInPerson && signInPerson.role && signInPerson.role === "R3") {
    //   fetchData(url_Email_Data_Mail, idSiginPerson, setlistBookings);
    // } else if (signInPerson && signInPerson.role && signInPerson.role === "R2") {
    //   fetchData(url_Email_Data_Mail_Doctord, idSiginPerson, setlistBookings);
    // }
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let check = false;
    if (!check) {
      setidSiginPerson(signInPerson.user_id ? signInPerson.user_id : null);
    }
    return () => {
      check = true;
    };
  }, [signInPerson]);

  useEffect(() => {
    let check = false;
    if (!check) {
      if (signInPerson && signInPerson.role && signInPerson.role === "R3") {
        fetchData(url_Email_Data_Mail, idSiginPerson, setlistBookings);
      } else if (signInPerson && signInPerson.role && signInPerson.role === "R2") {
        fetchData(url_Email_Data_Mail_Doctord, idSiginPerson, setlistBookings);
      }
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

  const checkStatus = (item) => {
    // console.log("gia tri cua item ",item);
    if (item) {
      if (item === "S2") {
        return "Chờ xác nhận";
      }
      if (item === "S3") {
        return "Đã xác nhận";
      }
      if (item === "S4") {
        return "Đã khám xong";
      }
    }
  };
  const updateUser = (patient_id, date, doctorid, timetype,statusID) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log("url la", `http://api-truongcongtoan.herokuapp.com/api/emaildata/${patient_id}/${date}/${doctorid}/${statusID}`);
    // var raw = JSON.stringify(data);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };

    fetch(
      `http://api-truongcongtoan.herokuapp.com/api/emaildata/${patient_id}/${date}/${doctorid}/${timetype}/${statusID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {       
         
          if (JSON.parse(result).id) {
            // dispatch(allAction.userAction.addSignIn(JSON.parse(result)));
            if (signInPerson && signInPerson.role && signInPerson.role === "R3") {
              fetchData(url_Email_Data_Mail, idSiginPerson, setlistBookings);
            } else if (signInPerson && signInPerson.role && signInPerson.role === "R2") {
              fetchData(url_Email_Data_Mail_Doctord, idSiginPerson, setlistBookings);
            }
            setloading("done");
            console.log("result la ", result);
          return Alert.alert(
            "Thông báo",
            "Cập nhật thông tin tài khoản thành công !"
          );          
        } else {
          setloading("done");
          return Alert.alert(
            "Thông báo",
            "Cập nhật thông tin tài khoản thất bại !"
          );
        }
      })
      .catch((error) => console.log("error", error));
  };



  const ItemView = ({ item }) => {
    return (
      <>
      {
        loading === "loading" ? <AppLoader /> :null
      }

        {
          signInPerson && signInPerson.role && signInPerson.role === "R3" ?
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, margin: 5 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ marginLeft: 15 }}>
                    <View
                      style={{
                        borderRadius: 100,
                        borderWidth: 0.3,
                        height: 60,
                        width: 60,
                        margin: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "gray",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="doctor"
                        size={50}
                        color="#0092c5"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        textTransform: "uppercase",
                        color: "#0092c5",
                        paddingLeft: 20,
                      }}
                    >
                      Khám
                    </Text>

                    <View style={{ flexDirection: "row", width: 180 }}>
                      <Feather name="clock" size={20} color="#FDB750" />
                      <Text style={{ color: "#FDB750", paddingLeft: 10 }}>
                        {item && item.ngaykham ? item.ngaykham.split(",")[0] : null}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Feather name="calendar" size={20} color="#FDB750" />
                      <Text style={{ color: "#FDB750", paddingLeft: 5 }}>
                        {item && item.ngaykham ? item.ngaykham.split(",")[1] : null}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                      <Fontisto name="email" size={20} color="#FDB750" />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "200",
                          paddingLeft: 10,
                          paddingTop: 3,
                        }}
                      >
                        {" "}
                        {item && item.email_address ? item.email_address : null}
                      </Text>
                    </View>

                    <View
                      style={{
                        height: 35,
                        backgroundColor: "#0092c5",
                        width: "auto",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 7,
                        marginTop: 20,
                        flexDirection: "row",
                      }}
                    >
                      {/* <FontAwesome5 name="money-check-alt" size={20} color="white" /> */}
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Giá khám : {item.price}
                      </Text>
                    </View>

                    {item && item.booking && item.booking.statusId === "S2" ? (
                      <View
                        style={{
                          height: 35,
                          backgroundColor: "#0092c5",
                          width: "auto",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 7,
                          marginTop: 20,
                        }}
                      >
                        <Text style={{ color: "white", textAlign: "center" }}>
                          {checkStatus(item.booking.statusId)}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          height: 35,
                          backgroundColor: "#00D100",
                          width: "auto",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 7,
                          marginTop: 20,
                        }}
                      >
                        <Text style={{ color: "white", textAlign: "center" }}>
                          {checkStatus(item.booking.statusId)}
                        </Text>
                      </View>
                    )}
                    {item && item.booking && item.booking.statusId === "S2" ?
                      null
                      :
                      <>
                      {
                        item && item.booking && item.booking.statusId === "S3" ?
                        <TouchableOpacity onPress={() => { Linking.openURL('https://truongcongtoan.000webhostapp.com/#7b7622') }}>
                        <View
                          style={{
                            height: 35,
                            backgroundColor: "#75E6DA",
                            width: "auto",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 7,
                            marginTop: 20,
                          }}
                        >
                          <Text style={{ color: "white", textAlign: "center" }}>
                            <FontAwesome5 name="video" size={20} color="white" />
                          </Text>

                        </View>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity onPress={() => { navigation.navigate("RateDoctor") }}>
                      <View
                        style={{
                          height: 35,
                          backgroundColor: "#75E6DA",
                          width: "auto",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 7,
                          marginTop: 20,
                        }}
                      >
                        <Text style={{ color: "white", textAlign: "center" }}>
                          <AntDesign name="like1" size={20} color="white" />  {`     `}
                          Đánh giá bác sĩ
                        </Text>

                      </View>
                    </TouchableOpacity>
                      }
                      </>
                    }

                  </View>
                </View>
                <View style={{ flexDirection: "column", marginLeft: 25 }}>
                  <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                    Tên bệnh nhân:
                  </Text>
                  <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                    {item ? item.full_name : null}
                  </Text>
                  <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                    Năm sinh:
                  </Text>
                  <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                    {item ? item.birth_year : null}
                  </Text>
                  <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                    Giới tính:
                  </Text>
                  <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                    {item ? item.gender : null}
                  </Text>
                  <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                    Số điện thoại:
                  </Text>
                  <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                    {item ? item.phone_number : null}
                  </Text>
                  <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                    Lý do khám:
                  </Text>
                  <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                    {item ? item.reason : null}
                  </Text>
                  <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                    Bác sĩ khám:
                  </Text>
                  <Text style={{ fontWeight: "300", marginBottom: 15 }}>
                    {item ? item.doctor_name : null}
                  </Text>
                </View>
              </View>
              <View style={{ height: 80 }}></View>
            </View>
            :
            <>
              {
                signInPerson && signInPerson.role && signInPerson.role === "R2" ?
                  <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, margin: 5 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column" }}>
                        <View style={{ marginLeft: 15 }}>
                          <View
                            style={{
                              borderRadius: 100,
                              borderWidth: 0.3,
                              height: 60,
                              width: 60,
                              margin: 10,
                              justifyContent: "center",
                              alignItems: "center",
                              borderColor: "gray",
                            }}
                          >
                            <MaterialCommunityIcons
                              name="doctor"
                              size={50}
                              color="#0092c5"
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              textTransform: "uppercase",
                              color: "#0092c5",
                              paddingLeft: 20,
                            }}
                          >
                            Khám
                          </Text>

                          <View style={{ flexDirection: "row", width: 180 }}>
                            <Feather name="clock" size={20} color="#FDB750" />
                            <Text style={{ color: "#FDB750", paddingLeft: 10 }}>
                              {item && item.ngaykham ? item.ngaykham.split(",")[0] : null}
                            </Text>
                          </View>

                          <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Feather name="calendar" size={20} color="#FDB750" />
                            <Text style={{ color: "#FDB750", paddingLeft: 5 }}>
                              {item && item.ngaykham ? item.ngaykham.split(",")[1] : null}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Fontisto name="email" size={20} color="#FDB750" />
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: "200",
                                paddingLeft: 10,
                                paddingTop: 3,
                              }}
                            >
                              {" "}
                              {item && item.email_address ? item.email_address : null}
                            </Text>
                          </View>

                          <View
                            style={{
                              height: 35,
                              backgroundColor: "#0092c5",
                              width: "auto",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 7,
                              marginTop: 20,
                              flexDirection: "row",
                            }}
                          >
                            {/* <FontAwesome5 name="money-check-alt" size={20} color="white" /> */}
                            <Text style={{ color: "white", textAlign: "center" }}>
                              Giá khám : {item.price}
                            </Text>
                          </View>

                          {/* {item && item.booking && item.booking.statusId === "S2" ? (
              <View
                style={{
                  height: 35,
                  backgroundColor: "#0092c5",
                  width: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {checkStatus(item.booking.statusId)}
                  
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: 35,
                  backgroundColor: "#00D100",
                  width: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 7,
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  {checkStatus(item.booking.statusId)}
                </Text>
              </View>
            )} */}
                         
                          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#0092c5', color: 'white', height: 40, marginTop: 15, borderRadius: 10 }}>
                            <RNPickerSelect
                              onValueChange={(status) => {
                                // setloading("loading")
                                // console.log(item);
                                updateUser(item.booking.patientid, item.booking.date, item.booking.doctorid, item.booking.timetype,status)
                                // console.log("status ",{statusid:status})
                              }}
                              value={item.booking.statusId}
                              items={[
                                { label: "Chưa xác nhận", value: "S2" },
                                { label: "Đã xác nhận", value: "S3" },
                                { label: "Đã đã khám xong ", value: "S4" },
                              ]}
                            />
                          </View>
                          {item && item.booking && item.booking.statusId === "S2" ?
                      null
                      :
                        <>
                        {
                          item && item.booking && item.booking.statusId === "S3" ?
                           <TouchableOpacity onPress={() => { Linking.openURL('https://truongcongtoan.000webhostapp.com/#7b7622') }}>
                           <View
                             style={{
                               height: 35,
                               backgroundColor: "#00D100",
                               width: "auto",
                               alignItems: "center",
                               justifyContent: "center",
                               borderRadius: 7,
                               marginTop: 20,
                             }}
                           >
                             <Text style={{ color: "white", textAlign: "center" }}>
                               <FontAwesome5 name="video" size={20} color="white" />
                             </Text>
   
                           </View>
                         </TouchableOpacity>
                         :
                         <TouchableOpacity onPress={() => { navigation.navigate("PrintScreen") }}>
                         <View
                           style={{

                             height: 35,
                             backgroundColor: "#8155BA",
                             width: "auto",
                             alignItems: "center",
                             justifyContent: "center",
                             borderRadius: 7,
                             marginTop: 20,
                           }}
                         >
                           <Text style={{ color: "white", textAlign: "center" }}>
                             <Feather name="printer" size={20} color="white" />
                           </Text>
 
                         </View>
                       </TouchableOpacity>
                        }
                        </>
                    }
                        </View>
                      </View>
                      <View style={{ flexDirection: "column", marginLeft: 25 }}>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Tên bệnh nhân:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.full_name : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Năm sinh:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.birth_year : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Giới tính:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.gender : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Số điện thoại:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.phone_number : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Lý do khám:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.reason : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Bác sĩ khám:
                        </Text>
                        <Text style={{ fontWeight: "300", marginBottom: 15 }}>
                          {item ? item.doctor_name : null}
                        </Text>
                      </View>
                    </View>
                    <View style={{ height: 80 }}></View>
                  </View>
                  :
                  <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, margin: 5 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flexDirection: "column" }}>
                        <View style={{ marginLeft: 15 }}>
                          <View
                            style={{
                              borderRadius: 100,
                              borderWidth: 0.3,
                              height: 60,
                              width: 60,
                              margin: 10,
                              justifyContent: "center",
                              alignItems: "center",
                              borderColor: "gray",
                            }}
                          >
                            <MaterialCommunityIcons
                              name="doctor"
                              size={50}
                              color="#0092c5"
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 14,
                              textTransform: "uppercase",
                              color: "#0092c5",
                              paddingLeft: 20,
                            }}
                          >
                            Khám
                          </Text>

                          <View style={{ flexDirection: "row", width: 180 }}>
                            <Feather name="clock" size={20} color="#FDB750" />
                            <Text style={{ color: "#FDB750", paddingLeft: 10 }}>
                              {item && item.ngaykham ? item.ngaykham.split(",")[0] : null}
                            </Text>
                          </View>

                          <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Feather name="calendar" size={20} color="#FDB750" />
                            <Text style={{ color: "#FDB750", paddingLeft: 5 }}>
                              {item && item.ngaykham ? item.ngaykham.split(",")[1] : null}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Fontisto name="email" size={20} color="#FDB750" />
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: "200",
                                paddingLeft: 10,
                                paddingTop: 3,
                              }}
                            >
                              {" "}
                              {item && item.email_address ? item.email_address : null}
                            </Text>
                          </View>

                          <View
                            style={{
                              height: 35,
                              backgroundColor: "#0092c5",
                              width: "auto",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 7,
                              marginTop: 20,
                              flexDirection: "row",
                            }}
                          >
                            {/* <FontAwesome5 name="money-check-alt" size={20} color="white" /> */}
                            <Text style={{ color: "white", textAlign: "center" }}>
                              Giá khám : {item.price}
                            </Text>
                          </View>

                          {item && item.booking && item.booking.statusId === "S2" ? (
                            <View
                              style={{
                                height: 35,
                                backgroundColor: "#0092c5",
                                width: "auto",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 7,
                                marginTop: 20,
                              }}
                            >
                              <Text style={{ color: "white", textAlign: "center" }}>
                                {checkStatus(item.booking.statusId)}

                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                height: 35,
                                backgroundColor: "#00D100",
                                width: "auto",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 7,
                                marginTop: 20,
                              }}
                            >
                              <Text style={{ color: "white", textAlign: "center" }}>
                                {checkStatus(item.booking.statusId)}
                              </Text>
                            </View>
                          )}
                          {/* <TouchableOpacity onPress={() => { Linking.openURL('https://truongcongtoan.000webhostapp.com/#7b7622') }}>
                            <View
                              style={{
                                height: 35,
                                backgroundColor: "#00D100",
                                width: "auto",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 7,
                                marginTop: 20,
                              }}
                            >
                              <Text style={{ color: "white", textAlign: "center" }}>
                                <FontAwesome5 name="video" size={20} color="white" />
                              </Text>

                            </View>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                      <View style={{ flexDirection: "column", marginLeft: 25 }}>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Tên bệnh nhân:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.full_name : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Năm sinh:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.birth_year : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Giới tính:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.gender : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Số điện thoại:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.phone_number : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Lý do khám:
                        </Text>
                        <Text style={{ fontWeight: "300", paddingTop: 10 }}>
                          {item ? item.reason : null}
                        </Text>
                        <Text style={{ fontWeight: "bold", paddingTop: 10 }}>
                          Bác sĩ khám:
                        </Text>
                        <Text style={{ fontWeight: "300", marginBottom: 15 }}>
                          {item ? item.doctor_name : null}
                        </Text>
                      </View>
                    </View>
                    <View style={{ height: 80 }}></View>
                  </View>
              }
            </>
        }
      </>
    );
  };

  const fetchData = (url, id, setData) => {
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
  // console.log("Gia tri listbooking length" ,listBookings.length);
  return (
    <View style={{ flex: 1 }}>
      {/* {listBookings.length === 0 ? <AppLoader /> : null} */}

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
      {
        listBookings && listBookings.length > 0 ?
          <FlatList
            data={listBookings && listBookings.length > 0 ? listBookings : null}
            keyExtractor={(item, index) => index.toString()}
            // ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            onRefresh={() => onRefresh()}
            refreshing={refreshing}
          />
          :
          <Text style={{ paddingLeft: 20, fontWeight: '300' }}>Bạn không có lịch hẹn khám nào </Text>
      }

    </View>
  );
};

export default ScheduleScreen;
