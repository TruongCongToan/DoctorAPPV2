import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
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
  const [OneSpecialties, setOneSpecialties] = useState({});

  const specialty_id = useSelector((state) => state.specialties.oneSpecialties);

  const [alldays, setalldays] = useState([]);
  const [markdownByCK, setmarkdownByCK] = useState([]);

  const [checkOpenPrice, setcheckOpenPrice] = useState({});
  const [dropdownValue, setdropdownValue] = useState("PROA");
  const [loading, setloading] = useState("");
  const [itemMarkdownGet, setitemMarkdownGet] = useState({});
  const [specialty, setspecialty] = useState({});


  const dispatch = useDispatch();
  const navigation = useNavigation();
  const url_doctorinfo =
    "https://api-truongcongtoan.herokuapp.com/api/doctorinfo/specialties/";


  const url_Specialties =
    "https://api-truongcongtoan.herokuapp.com/api/specialties/";


  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMarkdownItemData(OneSpecialties.id);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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

  const fetchDataSpcialty = (url, id, setData) => {
    console.log("id la ", id);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${url}${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => setData(JSON.parse(result)))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    let check = false;
    if (!check) {
      console.log("gia tri id ", specialty_id);
      fetchDataSpcialty(url_Specialties, specialty_id, setOneSpecialties);
    }
    return () => {
      check = true;
    };
  }, [specialty_id]);

  const fetchData = (url, user_id, provinceid, setData) => {
    console.log(`${url}${user_id}/${provinceid}`);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}${user_id}/${provinceid}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result)) {
          // console.log("result la ",result.doctorInfo);
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
      setspecialty(OneSpecialties);
      getMarkdownItemData();
    }
    return () => {
      check = true;
    };
  }, [OneSpecialties.id]);

  console.log("gi tri chuyen khoa", OneSpecialties.id);

  const getMarkdownItemData = (id) => {
    if (dropdownValue === "PROA") {
      fetchData(url_doctorinfo, id, "ALL", setmarkdownByCK);
    } else {
      fetchData(url_doctorinfo, id, dropdownValue, setmarkdownByCK);
    }
  };
  useEffect(() => {
    let check = false;
    if (!check) {
      getMarkdownItemData(OneSpecialties.id);
    }
    return () => {
      check = true;
    };
  }, [specialty.id, OneSpecialties.id, dropdownValue]);


  const previewPriceOpen = (value) => {
    checkOpenPrice[`${value}`] = true;
    let checkOpenPriceC = {};
    checkOpenPriceC = { ...checkOpenPrice, checkOpenPrice };
    setcheckOpenPrice(checkOpenPriceC);
  };
  const previewPriceClose = (value) => {
    checkOpenPrice[`${value}`] = false;
    let checkOpenPriceC = {
      checkOpenPrice,
    };

    checkOpenPriceC = { ...checkOpenPrice, checkOpenPrice };
    setcheckOpenPrice(checkOpenPriceC);
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

  function viewDetailPress(value) {
    console.log("gia tri value ",value);
    dispatch(allAction.userAction.addUser(value));

    navigation.navigate("Chitietbacsi");
  };

  return (
    <View style={{ flex: 1 }}>
      {markdownByCK.length === 0 ? <AppLoader /> : null}
      {loading === "loading" ? <AppLoader /> : null}
      <ScrollView
        // contentContainerStyle= {styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderLogo />
        <Text style={{ fontWeight: "600", fontSize: 23, padding: 15 }}>
          {specialty.name}
        </Text>
      </ScrollView>

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
              // uri: specialty.image,
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
              <Text style={{ padding: 15 }}>{specialty.contentMarkDown}</Text>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={{ margin: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Các Bác sĩ chuyên khoa {specialty.name}
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
         
           <>
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
                    height: "auto",
                    marginTop: 20,
                  }}
                >
                  {console.log(
                    "item thu duoc la ",
                    item.doctorInfo.user.full_name
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                    }}
                  >
                    {item.doctorInfo.user.image ? (
                      <TouchableOpacity
                        // onPress={() => {
                        //   viewDetailPress();
                        //   setitemMarkdownGet(item);
                        // }}
                        onPress={() =>viewDetailPress(item.doctorInfo.user.user_id) }
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
                       onPress={() =>viewDetailPress(item.doctorInfo.user.user_id) }
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
                      width: "auto",
                      marginTop: 20,
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
                        <TouchableOpacity
                          onPress={() => previewPriceOpen(key)}
                        >
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
                          <TouchableOpacity
                            onPress={() => previewPriceClose(key)}
                          >
                            <Text style={{ color: "#0092c5", marginTop: 10 }}>
                              Ẩn bảng giá
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      margin: 20,
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
              ))}
          </>
        </View>
      </ScrollView>
    </View>
  );
};

export default Chitietchuyenkhoa;
