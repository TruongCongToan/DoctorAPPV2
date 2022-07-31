import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const QuestionDetail = () => {
  const questionID = useSelector((state) => state.user.questionID);
  const url_question = "https://api-truongcongtoan.herokuapp.com/api/question/";
  const url_answer = "https://api-truongcongtoan.herokuapp.com/api/answer/";

  const [comment, setcomment] = useState("");
  const [question, setquestion] = useState({});

  const [listComment, setlistComment] = useState([]);

  const fetchDataByID = async (url, questionID, setData) => {
    var requestOptions = {
      method: "GET",
      transparentirect: "follow",
    };
    fetch(`${url}${questionID}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };

  const fetchData = async (url, setData) => {
    var requestOptions = {
      method: "GET",
      transparentirect: "follow",
    };
    fetch(`${url}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result)) {
          setData(JSON.parse(result));
        }else{
          setData(null);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    let check = false;
    if (!check) {
      fetchDataByID(url_question, questionID, setquestion);
    }
    return () => {
      check = true;
    };
  }, [questionID]);

  useEffect(() => {
    let check = false;
    if (!check) {
      fetchData(url_answer, setlistComment);
    }
    return () => {
      check = true;
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderLogo />
      <ScrollView>
        {listComment &&
          listComment.length > 0 &&
          listComment.map((item, key) =>
            item.users.image ? (
              <Image
                style={{
                  width: "100%",
                  height: 250,
                  marginTop: 0,
                  marginLeft: 0,
                  marginRight: 10,
                }}
                source={{
                  uri: item.users.image,
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
            )
          )}

        <Text style={{ padding: 20, paddingBottom: 5, fontWeight: "bold" }}>
          {question.subject}
        </Text>

        <Text
          style={{
            padding: 20,
            paddingBottom: 5,
            fontWeight: "bold",
            fontSize: 13,
          }}
        >
          Câu hỏi:
        </Text>
        <Text style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 15 }}>
          {question.question}
        </Text>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.3,
            width: "100%",
            marginLeft: 15,
            marginRight: 15,
          }}
        />
        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 5,
            fontWeight: "bold",
            fontSize: 13,
          }}
        >
          Câu trả lời:
        </Text>
        <View style={{ marginLeft: 15, flexDirection: "row" }}>
          {question.image ? (
            <Image
              style={{ width: 40, height: 40, borderRadius: 30 }}
              source={{ uri: question.image }}
            />
          ) : (
            <EvilIcons name="user" size={45} color="black" />
          )}
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: "500" }}>
              Người trả lời
            </Text>
            <Text style={{ fontSize: 12, color: "#189AB4" }}>
              Bác sĩ , Trương Công Toàn
            </Text>
            <Text
              style={{ paddingLeft: 0, paddingRight: 20, paddingRight: 15 }}
            >
              Có thể cháu bé mắc bệnh động kinh hoặc bệnh dại,chị có thể đưa
              cháu đến các trung tâm cai nghiện để sớm có pháp đồ điều trị cho
              cháu
            </Text>

            <TouchableOpacity>
              <View
                style={{
                  color: "#21B6A8",
                  paddingBottom: 80,
                  marginTop: 5,
                  flexDirection: "row",
                }}
              >
                <FontAwesome5 name="edit" size={12} color="black" />
                <Text style={{ fontWeight: "500", fontSize: 11 }}>
                  Chỉnh sửa
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={{ width: "85%", marginLeft: 20, marginBottom: 15 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TextInput
            placeholder="Nhập câu trả lời"
            multiline={true}
            numberOfLines={4}
            style={{
              height: 50,
              textAlignVertical: "top",
              borderWidth: 0.3,
              borderRadius: 10,
              padding: 10,
              borderColor: "gray",
              //   marginTop: 15,
              // marginBottom:20,
              width: "100%",
            }}
            onChangeText={setcomment}
            value={comment}
          />
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: "80%",
            height: 40,
            backgroundColor: "#189AB4",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
          // onPress={onSavePress}
        >
          <Text style={{ color: "white" }}>Thêm câu trả lời</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionDetail;
