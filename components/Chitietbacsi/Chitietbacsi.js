import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderLogo from "../../screens/HeaderScreen/HeaderLogo";
import { useDispatch, useSelector } from "react-redux";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import moment from "moment";
import "moment/locale/vi";
import RNPickerSelect from "react-native-picker-select";
import allAction from "../redux/action/allAction";
import { useNavigation } from "@react-navigation/native";

const Chitietbacsi = () => {
 
  
  const signInPerson = useSelector((state) => state.user.signInPerson);

  const [alldays, setalldays] = useState([]);
  const [allAvaiableTime, setallAvaiableTime] = useState([]);

  const [selectedDate, setselectedDate] = useState("");
  const [checkOpenPrice, setcheckOpenPrice] = useState(false);

  const [initialDate, setinitialDate] = useState({
    label: "Chọn ngày đăng ký",
    value: null,
  });
  const [bookingInfo, setbookingInfo] = useState({
    statusId: "S1",
    doctorid: "",
    patientid: "",
    date: "",
    timetype: "",
  });
  const [selectedTimeType, setselectedTimeType] = useState("");
  const navigation = useNavigation();

  const dispatch = useDispatch();

  var url_Schedule = "https://api-truongcongtoan.herokuapp.com/api/schedules/";

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  let arrDate = [];
  for (let i = 0; i < 7; i++) {
    let object = {};
    object.label = capitalizeFirstLetter(
      moment(new Date()).locale("vi").add(i, "days").format("dddd - DD/MM")
    );
    object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
    arrDate.push(object);
  }
  useEffect(() => {
    setalldays(arrDate);
  }, []);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // let date = alldays && alldays.length > 0 && alldays[0].value;
const [dataOneUser, setdataOneUser] = useState({});
const [doctorInfo, setdoctorInfo] = useState({});
const [markdown, setmarkdown] = useState({});
const [doctoIDGet, setdoctoIDGet] = useState(0);


  const dataOneUser_id = useSelector((state) => state.user.getoneuser);

  useEffect(() => {
    let check = false
  if(!check){
    fetchData(url_DoctorInfo,dataOneUser_id,setdoctorInfo);
  }
    return () => {
      check = true
    }
  }, [dataOneUser_id])

  useEffect(() => {
    let check = false
  if(!check){
    fetchData(url_MarkDown,doctorInfo.id,setmarkdown);
  }
    return () => {
      check = true
    }
  }, [doctorInfo]);
console.log("markdwon suere ",markdown  && markdown.doctorInfo && markdown.doctorInfo.user ? markdown.doctorInfo.user.full_name : null);
  useEffect(() => {
    let check = false
  if(!check){
   if (markdown  && markdown.doctorInfo && markdown.doctorInfo.user ) {
    setdataOneUser(markdown.doctorInfo.user)
   }
  }
    return () => {
      check = true
    }
  }, [markdown])
  
  const fetchData = (url,user_id,setData) =>{
    console.log("get data ...",`${url}${user_id}`);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'  
    };
    
    fetch(`${url}${user_id}`, requestOptions)
      .then(response => response.text())
      .then(result => setData(JSON.parse(result)))
      .catch(error => console.log('error', error));
  }

  const fetchDataSchedule = (url, user_id, date, setData) => {
    console.log(`${url}${user_id}/${date}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${user_id}/${date}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    setdoctoIDGet(dataOneUser.user_id);
  }, [dataOneUser]);

  useEffect(() => {
    fetchDataSchedule(url_Schedule, doctoIDGet, selectedDate, setallAvaiableTime);
  }, [dataOneUser.user_id]);

  const handleOnchangeDate = (date) => {
    setselectedDate(date);
    fetchDataSchedule(url_Schedule, doctoIDGet, date, setallAvaiableTime);
  };
  const timeBookingPress = (value) => {
    setselectedTimeType(value.allCode);
    navigation.navigate("Datlich");
  };
  useEffect(() => {
    let check = false;
    if (!check) {
      setbookingInfo({
        statusId: "S1",
        doctorid: doctoIDGet,
        patientid: signInPerson.user_id,
        date: selectedDate,
        timetypeValue: selectedTimeType.valuevi,
        timetype: selectedTimeType.key,
      });
    }
    return () => {
      check = true;
    };
  }, [selectedTimeType.key, doctoIDGet, signInPerson, selectedDate]);

  useEffect(() => {
    let check = false;
    if (!check) {
      dispatch(allAction.userAction.addBookingInfo(bookingInfo));
    }
    return () => {
      check = true;
    };
  }, [bookingInfo]);

  console.log("gia tri nhan duoc ", bookingInfo);
  const previewPrice = () => {
    setcheckOpenPrice(!checkOpenPrice);
  };
  const formatPayment = (input) => {
    if (input === "PAY1") {
      return "tiền mặt";
    } else if (input === "PAY2") {
      return "quẹt thẻ";
    } else if (input === "PAY3") {
      return "tiền mặt và quẹt thẻ";
    } else {
      return "Không có dữ liệu";
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderLogo />

     {/* {!doctorInfo.addressclinicid  ? <AppLoader /> : null} */}
      <ScrollView>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: "auto",
                backgroundColor: "transparent",
              }}
            >
              {dataOneUser.image ? (
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    marginTop: 20,
                    marginLeft: 10,
                    borderWidth: 0.3,
                    borderColor: "black",
                  }}
                  source={{ uri: dataOneUser.image }}
                />
              ) : (
                <EvilIcons name="user" size={100} color="black" />
              )}
              <View style={{ flexDirection: "column", margin: 20 }}>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Bác sĩ {`${dataOneUser.full_name}`}
                </Text>
                {!markdown ? (
                  <ScrollView horizontal>
                    <Text
                      style={{ fontSize: 12, fontWeight: "300", width: 200 }}
                    >
                      Không có dữ liệu giới thiệu về bác sĩ!
                    </Text>
                  </ScrollView>
                ) : (
                  <View>
                    <ScrollView horizontal>
                      <Text
                        style={{ fontSize: 13, fontWeight: "300", width: 200 }}
                      >
                        {markdown ? markdown.description : null}
                      </Text>
                    </ScrollView>
                    <View
                      style={{
                        flexDirection: "row",
                        position: "relative",
                        top: 10,
                      }}
                    >
                      <EvilIcons name="location" size={25} color="black" />
                      <Text>
                        {doctorInfo.allCodeProvince
                          ? doctorInfo.allCodeProvince.valuevi
                          : null}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              height: "auto",
              width: 183,
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                paddingLeft: 10,
                fontSize: 14,
                color: "#0092c5",
                paddingTop: 10,
                textTransform: "uppercase",
              }}
            >
              Ngày khám
            </Text>
            <RNPickerSelect
              onValueChange={handleOnchangeDate}
              placeholder={{
                label: "Chọn ngày khám bệnh ",
                value: null,
              }}
              // value={alldays ? :b}
              items={alldays}
            />
            <Text style={{ height: 1, borderTopWidth: 0.3 }}></Text>
          </View>
          <View style={{ backgroundColor: "transparent", height: 100 }}>
            <View
              style={{ flexDirection: "row", width: "100%", marginTop: 10 }}
            >
              <EvilIcons name="calendar" size={30} color="black" />
              <Text
                style={{
                  fontWeight: "500",
                  paddingLeft: 10,
                  fontSize: 14,
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                Lịch khám
              </Text>
            </View>
            <ScrollView horizontal>
              <View
                style={{
                  width: "100%",
                  height: 50,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
             
                {allAvaiableTime.length > 0 ? (
                  <>
                    {allAvaiableTime &&
                      allAvaiableTime.length > 0 &&
                      allAvaiableTime.map((item, index) => (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#1aa1b3",
                            marginLeft: 10,
                            marginRight: 10,
                            // borderRadius:1
                          }}
                          key={index}
                          onPress={() => timeBookingPress(item)}
                        >
                          {
                             console.log("gia tri item , " ,item.allCode ? item.allCode.valuevi:"khong co")
                          }
                          <Text
                            style={{
                              padding: 10,
                              paddingLeft: 10,
                              color: "white",
                              fontWeight: "500",
                            }}
                          >
                            {item.allCode ? item.allCode.valuevi :null}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </>
                ) : (
                  <Text
                    style={{ fontSize: 13, fontWeight: "300", marginLeft: 10 }}
                  >
                    Không có dữ liệu về lịch khám !
                  </Text>
                )}
              </View>
            </ScrollView>
            <View
              style={{ flexDirection: "row", marginTop: 10, marginLeft: 15 }}
            >
              <FontAwesome5 name="hand-point-up" size={13} color="black" />
              <Text
                style={{ paddingLeft: 10, fontWeight: "200", fontSize: 12 }}
              >
                Chọn và đặt lịch miễn phí
              </Text>
            </View>
          </View>
          <Text
            style={{
              height: 1,
              borderTopWidth: 0.2,
              marginTop: 20,
              borderTopColor: "gray",
            }}
          />
          <View
            style={{
              width: "auto",
              marginTop: 10,
              backgroundColor: "transparent",
              height: 100,
            }}
          >
            <View style={{ flexDirection: "row", marginLeft: 5 }}>
              <FontAwesome5 name="clinic-medical" size={20} color="black" />
              <Text
                style={{
                  fontWeight: "500",
                  paddingLeft: 10,
                  fontSize: 14,
                  color: "black",
                  textTransform: "uppercase",
                }}
              >
                Địa chỉ phòng khám
              </Text>
            </View>
            {/* {console.log("gia tri check ", doctorInfo.addressclinicid)} */}
            {doctorInfo.addressclinicid ? (
              <View style={{ flexDirection: "column" }}>
                <Text style={{ padding: 10 }}>{doctorInfo.nameclinic}</Text>
                <Text style={{ paddingTop: 5, paddingLeft: 10 }}>
                  {doctorInfo.addressclinicid}
                </Text>
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "300",
                  width: 200,
                  padding: 15,
                }}
              >
                Không có dữ liệu về địa chỉ phòng khám
              </Text>
            )}
          </View>
          <Text
            style={{
              height: 1,
              borderTopWidth: 0.2,
              marginTop: 20,
              borderTopColor: "gray",
            }}
          />

          <View style={{ flexDirection: "row", marginLeft: 10, marginTop: 20 }}>
            {!checkOpenPrice ? (
              <>
                <FontAwesome5 name="money-bill" size={20} color="black" />

                <Text
                  style={{
                    fontWeight: "500",
                    paddingLeft: 10,
                    fontSize: 14,
                    color: "black",
                    textTransform: "uppercase",
                  }}
                >
                  Giá khám:
                </Text>
              
                <Text style={{ paddingLeft: 15 }}>
                  {doctorInfo && doctorInfo.allCodePrice
                    ? `${doctorInfo.allCodePrice.valuevi} VNĐ`
                    : "Không có dữ liệu"}
                  {""}
                </Text>
                <TouchableOpacity onPress={previewPrice}>
                  <Text style={{ paddingLeft: 10, color: "#0092c5" }}>
                    Xem chi tiết
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <FontAwesome5 name="money-bill" size={20} color="black" />
                  <Text
                    style={{
                      fontWeight: "500",
                      paddingLeft: 10,
                      fontSize: 14,
                      color: "black",
                      textTransform: "uppercase",
                    }}
                  >
                    Giá khám:
                  </Text>
                </View>
                <View
                  style={{
                    width: "auto",
                    height: "auto",
                    backgroundColor: "#eee",
                    borderWidth: 0.3,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, paddingLeft: 7 }}>
                      {" "}
                      Giá khám:
                    </Text>
                    <Text
                      style={{
                        paddingLeft: "50%",
                        fontWeight: "500",
                        fontSize: 15,
                        paddingRight: 5,
                      }}
                    >
                      {doctorInfo.allCodePrice
                        ? `${doctorInfo.allCodePrice.valuevi} VNĐ`
                        : null}
                    </Text>
                  </View>
                  <Text
                    style={{ fontSize: 13, fontWeight: "300", paddingLeft: 8 }}
                  >
                    {doctorInfo ? doctorInfo.note : null}
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ paddingLeft: 8 }}>
                      Người bệnh có thể thanh toán chi phí bằng hình thức{" "}
                      {
                        <Text style={{ fontWeight: "bold" }}>
                          {formatPayment(
                            !doctorInfo.allCodePayment
                              ? null
                              : doctorInfo.allCodePayment.key
                          )}
                        </Text>
                      }
                    </Text>
                  </View>
                  <TouchableOpacity onPress={previewPrice}>
                    <Text style={{ color: "#0092c5", marginTop: 10 }}>
                      Ẩn bảng giá
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <Text
            style={{
              height: 1,
              borderTopWidth: 0.2,
              marginTop: 20,
              borderTopColor: "gray",
            }}
          />

          <View style={{ marginLeft: 15 }}>
            { markdown ? (
              <Text> {markdown.contentMarkDown}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red',
  },
});
export default Chitietbacsi;
