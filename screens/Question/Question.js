import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    padding: 15,
  },
  inputColor: {
    height: 40,
    textAlignVertical: "top",
    borderWidth: 0.3,
    borderRadius: 10,
    padding: 10,
    borderColor: "gray",
    marginTop: 15,
    width: "90%",
    margin: 20,
  },
  errorBorder: {
    borderColor: "red",
    color: "red",
    marginLeft: 15,
  },
  nonErrorBorder: {
    borderColor: "black",
  },
});
const Question = () => {
  const [question, setquestion] = useState("");

  const [image, setimage] = useState("");
  const [checkopen, setcheckopen] = useState(false);
  const [name, setname] = useState("");
  const [error, seterror] = useState("");
  const [checkload, setcheckload] = useState("");
  const [subject, setsubject] = useState("");
  const signInPerson = useSelector((state) => state.user.signInPerson);
  const [user_id, setuser_id] = useState(0);


  const url_question = "https://api-truongcongtoan.herokuapp.com/api/question/";

  const [dataQuestion, setdataQuestion] = useState({
    name: "",
    subject: "",
    image: "",
    question: "",
    user_id: "",
  });

  useEffect(() => {
    let check = false;
    if (!check) {
      validateBlank();
      setdataQuestion({
        name: signInPerson.full_name,
        subject: subject,
        image: image,
        question: question,
        user_id: signInPerson.user_id,
      });
    }
    return () => {
      check = true;
    };
  }, [name, image, question, subject,signInPerson.full_name,signInPerson.user_id]);

  console.log("gia tri gui di",dataQuestion);
  const handleRegister = async (url, data = {}) => {
    console.log("calling data ...");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("gia tri thu duic ", result);
        setcheckload("done");
        if (JSON.parse(result).id) {
          return Alert.alert("Thông báo", "Đã gửi câu hỏi thành công !");
        } else {
          return Alert.alert("Thông báo", "Gửi câu hỏi thất bại !");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setimage(`data:image/jpeg;base64, ${result.base64}`);
    }
  };

  const pushError = (input) => {
    return Alert.alert("Thông báo", `${input}`, [
      {
        text: "Ok",
      },
    ]);
  };
  const validateBlank = () => {
    let errors = {};
    let formIsValid = true;
    if (!subject) {
      formIsValid = false;
      errors["subject"] = "Xin vui lòng nhập tiêu đề câu hỏi!";
    } else {
      if (!question) {
        formIsValid = false;
        errors["question"] = "Xin vui lòng nhập câu hỏi của bạn!";
      } else {
        if (!image) {
          formIsValid = false;
          errors["image"] = "Vui lòng đính kèm ảnh !";
        }
      }
    }

    seterror(errors);
    return formIsValid;
  };

  const onSavingPress = (input) => {
    return Alert.alert(
      "Thông báo",
      `Bạn có chắc chắn muốn đặt lịch khám hay không ?`,
      [
        {
          text: "Có",
          onPress: () => {
            handleSave();
            setcheckload("loading");
          },
        },

        {
          text: "Không",
        },
      ]
    );
  };

  const handleSave = () => {
    if (!validateBlank()) {
      if (error["subject"]) {
        pushError(error["subject"]);
      } else if (error["question"]) {
        pushError(error["question"]);
      } else if (error["image"]) {
        pushError(error["image"]);
      }
    } else {
      handleRegister(url_question, dataQuestion);
      setcheckload("loading");
    }
  };
  return (
    <ScrollView>
      {
        checkload === "loading" ? <AppLoader /> : null
      }
      <View style={{ flex: 1 }}>
        <HeaderLogo />
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            Hướng dẫn đặt câu hỏi
          </Text>

          {checkopen === true ? (
            <Text style={{ fontSize: 12, fontWeight: "300" }}>
              {` Khi đặt câu hỏi với bác sĩ, bạn vui lòng lưu ý các nội dung:

1.Nhập nội dung bằng tiếng Việt có dấu, không viết tắt

2.Cung cấp chi tiết các thông tin về:

-Giới tính

-Độ tuổi

-Triệu chứng,dấu hiệu sức khỏe

-Câu hỏi dành cho bác sĩ

3.Hình ảnh đính kèm (thường là chụp biểu hiện,đơn thuốc ,...) cần phải rõ nét
`}
              <TouchableOpacity onPress={() => setcheckopen(false)} r>
                <Text style={{ color: "#0092c5", marginTop: 10 }}>Ẩn</Text>
              </TouchableOpacity>
            </Text>
          ) : (
            <Text style={{ fontSize: 12, fontWeight: "300" }}>
              {` Khi đặt câu hỏi với bác sĩ, bạn vui lòng lưu ý các nội dung:

1.Nhập nội dung bằng tiếng Việt có dấu, không viết tắt

2.Cung cấp chi tiết các thông tin về:

`}
              <TouchableOpacity onPress={() => setcheckopen(true)}>
                <Text style={{ color: "#0092c5", marginTop: 10 }}>
                  Xem thêm
                </Text>
              </TouchableOpacity>
            </Text>
          )}

          <View style={{ width: "86%", marginLeft: 15, marginTop: 15 }}>
            <Text style={[error["subject"] ? styles.errorBorder : styles.text]}>
              1. Tiêu đề câu hỏi
            </Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TextInput
                placeholder="Nhập tiêu đề câu hỏi"
                multiline={true}
                numberOfLines={4}
                style={{
                  height: 50,
                  textAlignVertical: "top",
                  borderWidth: 0.3,
                  borderRadius: 10,
                  padding: 10,
                  borderColor: "gray",
                  marginTop: 15,
                  width: "90%",
                }}
                onChangeText={setsubject}
                value={subject}
              />
            </View>
          </View>

          <View style={{ width: "86%", marginLeft: 15, marginTop: 15 }}>
            <Text
              style={[error["question"] ? styles.errorBorder : styles.text]}
            >
              2. Nội dung câu hỏi của bạn
            </Text>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TextInput
                placeholder="Nhập câu hỏi"
                multiline={true}
                numberOfLines={4}
                style={{
                  height: 150,
                  textAlignVertical: "top",
                  borderWidth: 0.3,
                  borderRadius: 10,
                  padding: 10,
                  borderColor: "gray",
                  marginTop: 15,
                  width: "90%",
                }}
                onChangeText={setquestion}
                value={question}
              />
            </View>
          </View>
          <View style={{ width: "86%", marginLeft: 15 }}>
            <Text style={[error["image"] ? styles.errorBorder : styles.text]}>
              2. Đính kèm ảnh
            </Text>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
                marginTop: 10,
                marginLeft: 15,
                borderWidth: 0.5,
                borderColor: "gray",
              }}
              onPress={handleChoosePhoto}
            >
              {image ? (
                <Image
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 10,
                    marginTop: 0,
                    marginLeft: 0,
                  }}
                  source={{
                    uri: image,
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
          </View>
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
          onPress={onSavingPress}
        >
          <Text style={{ color: "white" }}>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Question;
