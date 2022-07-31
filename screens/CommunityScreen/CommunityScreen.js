import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import HeaderScreen from "../HeaderScreen/HeaderScreen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import allAction from "../../components/redux/action/allAction";

const CommunityScreen = () => {
  const [image, setimage] = useState("");
  const url_question = "https://api-truongcongtoan.herokuapp.com/api/question/";
  const [listQuestion, setlistQuestion] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const fetchData = async (url, setData) => {
    var requestOptions = {
      method: "GET",
      transparentirect: "follow",
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    let check = false;
    if (!check) {
      fetchData(url_question, setlistQuestion);
    }
    return () => {
      check = true;
    };
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData(url_question, setlistQuestion);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderScreen />
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={{ flexDirection: "column" ,backgroundColor: 'white',}}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 20,
                paddingLeft: 15,
                paddingTop: 20,
              }}
            >
              Hỏi bác sĩ miễn phí
            </Text>
          </ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              height: 50,
            }}
          >
            <TouchableOpacity
              style={{
                width: 350,
                height: 40,
                backgroundColor: "#189AB4",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                // marginBottom: 20,
              }}
              onPress={() => navigation.navigate("Question")}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Đặt câu hỏi</Text>
            </TouchableOpacity>
          </View>
        </View>
        {listQuestion &&
          listQuestion.length > 0 &&
          listQuestion.map((item, key) => (
            <View
              key={key}
              style={{
                backgroundColor: "white",
                borderWidth: 0.3,
                borderColor: "gray",
                borderRadius: 10,
                marginLeft: 15,
                marginRight: 15,
                marginTop:15,
                // height:300
              }}
            >
              <View
                style={{ flexDirection: "row", marginLeft: 15, marginTop: 15 }}
              >
                {item.users.image ? (
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 30 }}
                    source={{ uri: item.users.image }}
                  />
                ) : (
                  <EvilIcons name="user" size={45} color="black" />
                )}
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text style={{ fontSize: 12 }}>Được hỏi bởi</Text>
                  <Text style={{ fontSize: 12 }}>
                    Bệnh nhân: {item.users.full_name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: "92%",
                  height: 200,
                  borderRadius: 10,
                  marginTop: 10,
                  marginLeft: 15,
                  borderWidth: 0.5,
                  borderColor: "gray",
                }}
                onPress={() => {
                  navigation.navigate("QuestionDetail")
                  dispatch(allAction.userAction.addQuestionID(item.id))
                }}
              >
                {item.image ? (
                  <Image
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 10,
                      marginTop: 0,
                      marginLeft: 0,
                      marginRight: 10,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                ) : (
                  <Ionicons
                    name="image-outline"
                    size={100}
                    color="gray"
                    style={{
                      position: "absolute",
                      left: 15,
                      top: 10,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Text style={{ padding: 20,paddingBottom:5, fontWeight: "bold" }}>
                {item.subject}
              </Text>

              <Text
                style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 80 }}
              >
                {item.question.length < 50
                  ? item.question
                  : `${item.question.substring(0, 50)}...`}
              </Text>
              
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'red',
  },
});

export default CommunityScreen;
