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
import { useSelector } from "react-redux";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import moment from "moment";
import "moment/locale/vi";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const Chitietbacsi = () => {
  const dataOneUser = useSelector((state) => state.user.getoneuser);
  const markdown = useSelector((state) => state.user.markdown);
  const doctorInfo = useSelector((state) => state.user.doctorInfo);

  const [alldays, setalldays] = useState([]);
  const [allAvaiableTime, setallAvaiableTime] = useState([]);

  const [selectedDate, setselectedDate] = useState({});

  const [initialDate, setinitialDate] = useState({
    label: "Chọn ngày đăng ký",
    value: null,
  });

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

  let date = alldays && alldays.length > 0 && alldays[0].value;
  // console.log("gia tri allday ",alldays[0]);

  const fetchData = (url, user_id, date, setData) => {
    console.log(`${url}${user_id}/${date}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${user_id}/${date}`, requestOptions)
      .then((response) => response.text())
      .then((result) => setData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };
  const [doctoIDGet, setdoctoIDGet] = useState(0);
  useEffect(() => {
    setdoctoIDGet(dataOneUser.user_id);
  }, [dataOneUser]);

  useEffect(() => {
    fetchData(url_Schedule, doctoIDGet, date, setallAvaiableTime);
  }, [dataOneUser.user_id]);

  const handleOnchangeDate = (date) => {
    setselectedDate(date);
    fetchData(url_Schedule, doctoIDGet, date, setallAvaiableTime);
  };
  const timeBookingPress = (value) => {
    console.log("value", value.allCode.key);
  };
  const [checkOpenPrice, setcheckOpenPrice] = useState(false)

const previewPrice = () =>{
  setcheckOpenPrice(!checkOpenPrice)
}
  return (
    <View style={{ flex: 1 }}>
      <HeaderLogo />

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
                {markdown.errorCode === 404 ? (
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
                        {markdown.description}
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
                          <Text
                            style={{
                              padding: 10,
                              paddingLeft: 10,
                              color: "white",
                              fontWeight: "500",
                            }}
                          >
                            {item.allCode.valuevi}
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
            {doctorInfo || doctorInfo.nameclinic ? (
              <View style={{ flexDirection: "column" }}>
                <Text style={{ padding: 10 }}>{doctorInfo.nameclinic}</Text>
                <Text style={{ paddingTop: 5, paddingLeft: 10 }}>
                  {doctorInfo.addressclinicid}
                </Text>
              </View>
            ) : (
              <Text style={{ fontSize: 12, fontWeight: "300", width: 200 }}>
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

          <View style={{ flexDirection: "row", marginLeft: 10 ,marginTop:20}}>
            {
            !checkOpenPrice ?
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
            <Text style={{ paddingLeft: 15 }}>{doctorInfo.allCodePrice ? doctorInfo.allCodePrice.valuevi:null} VNĐ</Text>
            <TouchableOpacity onPress={previewPrice}>
              <Text style={{paddingLeft:10,color: "#0092c5",}}>Xem chi tiết</Text>
            </TouchableOpacity>
              </>
              :
              <View>
             <View style={{width:'100%',flexDirection:'row'}}>
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
            <View style={{width:'auto',height:'auto',backgroundColor: '#eee',borderWidth:0.3}}>
                {console.log("note la ",doctorInfo.note)}
             <View style={{flexDirection:'row'}}>
             <Text style={{fontSize:14,paddingLeft:7}}> Giá khám:</Text>
             <Text style={{paddingLeft:'50%',fontWeight:'500',fontSize:15,paddingRight:5}}>{doctorInfo.allCodePrice ? doctorInfo.allCodePrice.valuevi:null} VNĐ</Text>
               </View>
               <Text style={{fontSize:13,fontWeight:'300'}}>{doctorInfo ? doctorInfo.note : null }</Text>
               <TouchableOpacity onPress={previewPrice}>
               <Text style={{color: "#0092c5",marginTop:20}}>Ẩn bảng giá</Text>
               </TouchableOpacity>
            </View>
              </View>
            }
          </View>
          <Text
            style={{
              height: 1,
              borderTopWidth: 0.2,
              marginTop: 20,
              borderTopColor: "gray",
            }}
          />

            <View>
            {
              (markdown || markdown.contentMarkDown)  ? <Text> {markdown.contentMarkDown}</Text>:null
            }
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
  },
});
export default Chitietbacsi;
