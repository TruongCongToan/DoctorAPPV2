import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import moment from "moment";
import "moment/locale/vi";
import React, { useState, useEffect } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import { LinearGradient } from "expo-linear-gradient";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import RNPickerSelect from "react-native-picker-select";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AppLoader from "../AppLoader/AppLoader";
import { useDispatch, useSelector } from "react-redux";
import allAction from "../../components/redux/action/allAction";
import { useNavigation } from "@react-navigation/native";

const Chitietchuyenkhoa = () => {
  const OneSpecialties = useSelector(
    (state) => state.specialties.oneSpecialties
  );
  // console.log("gia tri chuen khoa ",OneSpecialties.id);
  const [alldays, setalldays] = useState([]);
  const [selectedDate, setselectedDate] = useState("");
  const [allAvaiableTime, setallAvaiableTime] = useState([]);
  const [markdownByCK, setmarkdownByCK] = useState([]);
  const [selectedTimeType, setselectedTimeType] = useState("");
  const [selectedDoctor, setselectedDoctor] = useState(0);
  const [checkOpenPrice, setcheckOpenPrice] = useState({});
  const [dropdownValue, setdropdownValue] = useState("PROA");
  const [loading, setloading] = useState("");
  const [itemMarkdownGet, setitemMarkdownGet] = useState({});

  const [bookingInfo, setbookingInfo] = useState({
    statusId: "S1",
    doctorid: "",
    patientid: "",
    date: "",
    timetype: "",
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const url_doctorinfo =
    "https://api-truongcongtoan.herokuapp.com/api/doctorinfo/specialties/";
  const url_markdown =
    "https://api-truongcongtoan.herokuapp.com/api/markdowns/";
  const url_Schedule =
    "https://api-truongcongtoan.herokuapp.com/api/schedules/";

  const signInPerson = useSelector((state) => state.user.signInPerson);

  const [selectedIndex, setselectedIndex] = useState(0);
  let arrDate = [];
  for (let i = 0; i < 7; i++) {
    let object = {};
    object.label = capitalizeFirstLetter(
      moment(new Date()).locale("vi").add(i, "days").format("dddd - DD/MM")
    );
    object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
    arrDate.push(object);
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    let check = false;
    if (!check) {
      setalldays(arrDate);
    }
    return () => {
      check = true;
    };
  }, []);

  let date = alldays && alldays.length > 0 && alldays[0].value;

  const fetchData = (url, user_id, provinceid, setData) => {
    console.log(`${url}${user_id}/${date}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${user_id}/${provinceid}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // console.log("result la ",result);
        if (result) {
          setData(JSON.parse(result));
        } else {
          setData(null);
        }
        setloading("done");
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    let check = false;
    if (!check) {
      console.log("selecdoctor ", selectedDoctor);
      console.log("date ", selectedDate);
      fetchData(url_Schedule, selectedDoctor, selectedDate, setallAvaiableTime);
    }
    return () => {
      check = true;
    };
  }, [selectedDoctor, selectedDate, selectedIndex]);

  useEffect(() => {
    let check = false;
    if (!check) {
      if (dropdownValue === "PROA") {
        fetchData(url_doctorinfo, OneSpecialties.id, "ALL", setmarkdownByCK);
      } else {
        fetchData(
          url_doctorinfo,
          OneSpecialties.id,
          dropdownValue,
          setmarkdownByCK
        );
      }
    }
    return () => {
      check = true;
    };
  }, [OneSpecialties, dropdownValue]);

  const timeBookingPress = (value) => {
    setselectedTimeType(value.allCode);
    navigation.navigate("Datlich");
  };
  useEffect(() => {
    let check = false;
    if (!check) {
      setbookingInfo({
        statusId: "S1",
        doctorid: selectedDoctor,
        patientid: signInPerson.user_id,
        date: selectedDate,
        timetypeValue: selectedTimeType.valuevi,
        timetype: selectedTimeType.key,
      });
    }
    return () => {
      check = true;
    };
  }, [selectedTimeType.key, signInPerson, selectedDoctor, selectedDate]);

  useEffect(() => {
    let check = false;
    if (!check) {
      dispatch(allAction.userAction.addBookingInfo(bookingInfo));
    }
    return () => {
      check = true;
    };
  }, [bookingInfo]);

  
  const previewPriceOpen = (value) => {
    checkOpenPrice[`${value}`] = true 
    let checkOpenPriceC = {
      checkOpenPrice
    }
    checkOpenPriceC ={...checkOpenPrice,checkOpenPrice}
    setcheckOpenPrice(checkOpenPriceC)
  };
  console.log("open price check la ",checkOpenPrice);

 
  const previewPriceClose = (value) => {
    checkOpenPrice[`${value}`] = false 
    let checkOpenPriceC = {
      checkOpenPrice
    }
    
    checkOpenPriceC ={...checkOpenPrice,checkOpenPrice}
    setcheckOpenPrice(checkOpenPriceC)
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
  const handleDropdownChange = (value) => {
    setloading("loading");
    setdropdownValue(value);
  };

  const viewDetailPress = () => {
   
    navigation.navigate("Chitietbacsi");
  };
  useEffect(() => {
    let check = false
    if (!check) {
     if (itemMarkdownGet && itemMarkdownGet.doctorInfo) {
      dispatch(allAction.userAction.addUser(itemMarkdownGet.doctorInfo.user));
      dispatch(allAction.userAction.addMarkDown(itemMarkdownGet));
      dispatch(allAction.userAction.addDoctorInfo(itemMarkdownGet.doctorInfo));
     }else{
      return;
     }
    }
    return () => {
      check = true
    }
  }, [itemMarkdownGet])
  
  console.log("gia tri index ",selectedIndex);

  return (
    <View style={{ flex: 1 }}>
      {markdownByCK.length === 0 ? <AppLoader /> : null}
      {loading === "loading" ? <AppLoader /> : null}
      <HeaderLogo />
      <Text style={{ fontWeight: "600", fontSize: 20, padding: 15 }}>
        {OneSpecialties.name}
      </Text>

      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <ImageBackground
            source={{
              // uri: OneSpecialties.image,
              uri: "https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_960_720.jpg",
            }}
            resizeMethod="resize"
            style={{
              flex: 1,
              justifyContent: "center",
              width: "100%",
              height: 500,
            }}
          >
            <LinearGradient
              colors={[
                "rgba(255, 255, 255, 0.9)",
                "rgba(255, 255, 255, 0.8)",
                "rgba(255, 255, 255, 0.7)",
                //   "transparent",
              ]}
              start={[0.1, 0.6]}
              end={[0.1, 0.2]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 500,
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            >
              <Text style={{ padding: 15 }}>
                {OneSpecialties.contentMarkDown}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Các Bác sĩ chuyên khoa {OneSpecialties.name}
          </Text>
          <View style={{ width: "50%" }}>
            <RNPickerSelect
              onValueChange={handleDropdownChange}
              value={dropdownValue}
              placeholder={{
                label: "Chọn khu vực ",
                value: null,
              }}
              items={[
                { label: "Toàn Quốc", value: "PROA" },
                { label: "Hà Nội", value: "PRO1" },
                { label: "Hồ Chí Minh", value: "PRO2" },
              ]}
            />
          </View>
          {markdownByCK &&
            markdownByCK.length > 0 &&
            markdownByCK.map((item, key) => (
              <View
                key={key}
                style={{
                  flexDirection: "column",
                  borderWidth: 0.3,
                  borderColor: "gray",
                  borderRadius: 10,
                  height: 680,
                  // flexGrow:1,
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                  }}
                >
                  {item.doctorInfo.user.image ? (
                    <TouchableOpacity
                      onPress={() => {
                        viewDetailPress();
                        setitemMarkdownGet(item);
                      }}
                    >
                      <Image
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 100,
                          marginTop: 10,
                          marginLeft: 10,
                          borderWidth: 0.3,
                          borderColor: "black",
                        }}
                        source={{ uri: item.doctorInfo.user.image }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <EvilIcons name="user" size={100} color="black" />
                  )}
                  <View style={{ width: "70%", paddingLeft: 15 }}>
                  <TouchableOpacity
                      onPress={() => {
                        viewDetailPress();
                        setitemMarkdownGet(item);
                      }}
                    >
                      <Text style={{ fontSize: 14, color: "#0092c5" }}>
                        Bác sĩ chuyên khoa {item.doctorInfo.user.full_name}
                      </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 12, fontWeight: "300" }}>
                      {item.description}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        position: "relative",
                        top: 10,
                      }}
                    >
                      <EvilIcons name="location" size={25} color="black" />
                      <Text>{item.doctorInfo.allCodeProvince.valuevi}</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: "auto",
                    width: 180,
                    backgroundColor: "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      paddingLeft: 10,
                      fontSize: 14,
                      color: "#0092c5",
                      paddingTop: 20,
                      textTransform: "uppercase",
                    }}
                  >
                    Ngày khám
                  </Text>
                  <RNPickerSelect
                    onValueChange={(date) => {
                      setselectedDoctor(item.doctorInfo.user.user_id);
                      setselectedDate(date);
                      setselectedIndex(key);
                    }}
                    // onClose={() => console.log("cloese")}

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
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      marginTop: 10,
                    }}
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
                  <View style={{ backgroundColor: "transparent", height: 80 }}>
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
                        {allAvaiableTime && allAvaiableTime.length > 0 ? (
                          <>
                            {allAvaiableTime &&
                              allAvaiableTime.length > 0 &&
                              allAvaiableTime.map((item, index) => (
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: "#1aa1b3",
                                    marginLeft: 10,
                                    marginRight: 10,
                                    // bBácorderRadius:1
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
                            style={{
                              fontSize: 13,
                              fontWeight: "300",
                              marginLeft: 10,
                            }}
                          >
                            Không có dữ liệu về lịch khám !
                          </Text>
                        )}
                      </View>
                    </ScrollView>
                    <View
                      style={{
                        flexDirection: "row",
                        // marginTop: 10,
                        marginLeft: 15,
                      }}
                    >
                      <FontAwesome5
                        name="hand-point-up"
                        size={13}
                        color="black"
                      />
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: "200",
                          fontSize: 12,
                        }}
                      >
                        Chọn và đặt lịch miễn phí
                      </Text>
                    </View>
                  </View>

                  {/* <Text
            style={{
              height: 1,
              borderTopWidth: 0.2,
              marginTop: 20,
              borderTopColor: "gray",
            }}
          /> */}

                  <View
                    style={{
                      width: "auto",
                      marginTop: 10,
                      backgroundColor: "transparent",
                      height: 100,
                    }}
                  >
                    <View style={{ flexDirection: "row", marginLeft: 5 }}>
                      <FontAwesome5
                        name="clinic-medical"
                        size={20}
                        color="black"
                      />
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
                    {item.doctorInfo.addressclinicid ? (
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ padding: 10 }}>
                          {item.doctorInfo.nameclinic}
                        </Text>
                        <Text style={{ paddingTop: 5, paddingLeft: 10 }}>
                          {item.doctorInfo.addressclinicid}
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

                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                  >
                    {!checkOpenPrice[`${key}`] ? (
                      <>
                        <FontAwesome5
                          name="money-bill"
                          size={20}
                          color="black"
                        />

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
                          {item.doctorInfo.allCodePrice
                            ? `${item.doctorInfo.allCodePrice.valuevi} VNĐ`
                            : "Không có dữ liệu"}
                          {""}
                        </Text>
                        <TouchableOpacity onPress={() => previewPriceOpen(key)}>
                          <Text style={{ paddingLeft: 10, color: "#0092c5" }}>
                            Xem chi tiết
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <View>
                        <View style={{ width: "100%", flexDirection: "row" }}>
                          <FontAwesome5
                            name="money-bill"
                            size={20}
                            color="black"
                          />
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
                                paddingLeft: "40%",
                                fontWeight: "500",
                                fontSize: 15,
                                paddingRight: 5,
                              }}
                            >
                              {item.doctorInfo.allCodePrice
                                ? `${item.doctorInfo.allCodePrice.valuevi} VNĐ`
                                : null}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: "300",
                              paddingLeft: 8,
                            }}
                          >
                            {item.doctorInfo ? item.doctorInfo.note : null}
                          </Text>
                          <View style={{ marginTop: 10 }}>
                            <Text style={{ paddingLeft: 8 }}>
                              Người bệnh có thể thanh toán chi phí bằng hình
                              thức{" "}
                              {
                                <Text style={{ fontWeight: "bold" }}>
                                  {formatPayment(
                                    !item.doctorInfo.allCodePayment
                                      ? null
                                      : item.doctorInfo.allCodePayment.key
                                  )}
                                </Text>
                              }
                            </Text>
                          </View>
                          <TouchableOpacity onPress={() => previewPriceClose(key)}>
                            <Text style={{ color: "#0092c5", marginTop: 10 }}>
                              Ẩn bảng giá
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Chitietchuyenkhoa;
