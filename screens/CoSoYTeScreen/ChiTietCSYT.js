import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { LinearGradient } from "expo-linear-gradient";

const ChiTietCSYT = () => {
  const clinic_id = useSelector((state) => state.clinic.oneClinic);
  console.log("clinic ID ", clinic_id);
  const [oneClinic, setoneClinic] = useState({});

  const url_Clinic = "https://api-truongcongtoan.herokuapp.com/api/Clinic/";

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // getMarkdownItemData(OneSpecialties.id);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let check = false;
    if (!check) {
      fetchDataClinic(url_Clinic, clinic_id, setoneClinic);
    }
    return () => {
      check = true;
    };
  }, [clinic_id]);
  console.log("contentMarkDown : ", oneClinic.contentMarkDown);
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
          setData(JSON.parse(result));
        } else {
          setData(null);
        }
        setloading("done");
      })
      .catch((error) => console.log("error", error));
  };

  const fetchDataClinic = (url, id, setData) => {
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
  return (
    <View style={{ flex: 1 }}>
      <HeaderLogo />

      <ScrollView stickyHeaderIndices={[1]}>
        <View style={{ backgroundColor: "transparent" }}>
          {oneClinic.image && (
            <Image
              style={{
                width: "100%",
                height: 200,
                marginTop: 0,
                marginLeft: 0,
              }}
              source={{
                uri: oneClinic.image,
              }}
            />
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              {" "}
              {oneClinic ? oneClinic.name : null}{" "}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <EvilIcons name="location" size={25} color="black" />
              <Text style={{ fontSize: 12, fontWeight: "300" }}>
                <Text style={{ fontWeight: "bold" }}>Địa chỉ:</Text> 679 đường
                láng,láng hạ dodonsgd đa hà nội
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            height: 100,
          }}
        >
          <TouchableOpacity
            style={{
              width: 350,
              height: 40,
              backgroundColor: "blue",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
            // onPress={handleSave}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Đặt lịch khám ngay
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "300",
            paddingBottom: 20,
            paddingLeft: 10,
          }}
        >
          {" "}
          Xin mời quý khách hàng tham khảo các thông tin giới thiệu cũng như
          chuyên môn của cơ sở y tế
        </Text>
        <View>
          <Text
            style={{
              textTransform: "uppercase",
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: "bold",
              color: "#0092c5",
            }}
          >
            Giới thiệu{" "}
          </Text>
          <View
            style={{
              marginTop: 10,
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <Text style={{ padding: 10 }}>
            {oneClinic
              ? oneClinic.contentMarkDown
              : "Không có thông tin giới thiệu "}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              textTransform: "uppercase",
              paddingLeft: 15,
              fontSize: 15,
              fontWeight: "bold",
              color: "#0092c5",
            }}
          >
            Thế mạnh chuyên môn{" "}
          </Text>
          <View
            style={{
              marginTop: 10,
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

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
                height: 1470,
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
                  height: 'auto',
                  backgroundColor: "rgba(0,0,0,0.1)",
                }}
              >
                <Text style={{ padding: 10 }}>
                  {oneClinic
                    ? oneClinic.themanhchuyenkhoa
                    : "Không có thông tin giới thiệu "}
                </Text>
               
              </LinearGradient>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>

      {/* <View><Text>footer</Text></View> */}
    </View>
  );
};

export default ChiTietCSYT;
