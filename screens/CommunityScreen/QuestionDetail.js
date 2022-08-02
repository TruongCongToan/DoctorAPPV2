import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import AppLoader from "../AppLoader/AppLoader";

const QuestionDetail = () => {
  const questionID = useSelector((state) => state.user.questionID);
  const url_question = "https://api-truongcongtoan.herokuapp.com/api/question/";
  const url_answer = "https://api-truongcongtoan.herokuapp.com/api/answer/";
  const url_answer_question = "https://api-truongcongtoan.herokuapp.com/api/answer/question/"

  const signInPerson = useSelector((state) => state.user.signInPerson);
  const [checkComment, setcheckComment] = useState("")

  const [checkload, setcheckload] = useState('')
  const [comment, setcomment] = useState("");
  const [question, setquestion] = useState({});
  const [listAnswer, setlistAnswer] = useState([])

  const [listComment, setlistComment] = useState([]);
  const [dataAnswer, setdataAnswer] = useState({
    "answer": "",
    "question_id": 0,
    "user_id": 0,
  })
 
  
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
      fetchDataByID(url_answer_question, questionID, setlistAnswer);
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

  useEffect(() => {
    let check = false;
    if (!check) {
      setdataAnswer({
        answer:comment,
        question_id:questionID,
        user_id:signInPerson.user_id
      })
    }
    return () => {
      check = true;
    };
  }, [comment]);

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
        if (JSON.parse(result)) {
          fetchDataByID(url_answer_question, questionID, setlistAnswer);
          setcomment("")
          return Alert.alert("Thông báo", "Đã gửi câu trả lời thành công !");
        } else {
          return Alert.alert("Thông báo", "Gửi câu trả lời thất bại !");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const updateAnswer = (id, data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${url_answer}${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log("result : ", result);
        if (result) {
          setcheckload("done");
          setcheckComment("add")
          setcomment("")
          fetchDataByID(url_answer_question, questionID, setlistAnswer);
          return Alert.alert(
            "Thông báo",
            "Cập nhật câu trả lời thành công !"
          );
        } else {
          setcheckload("done");
          return Alert.alert(
            "Thông báo",
            "Cập nhật câu trả lời thất bại !"
          );
        }
      })
      .catch((error) => console.log("error", error));
  };
  const onAddComment = () =>{
    console.log("comment la ",checkComment === "comment");
    if (checkComment === "comment") {
      updateAnswer(answerID,dataAnswer)
      setcheckload("loading")
    }else{
      handleRegister(url_answer,dataAnswer)
    setcheckload("loading")
    }
  }

  const deleteComment = (comment_id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `https://api-truongcongtoan.herokuapp.com/api/answer/${comment_id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        fetchDataByID(url_answer_question, questionID, setlistAnswer);
        console.log(result)
        setcheckload("done")
      })
      .catch((error) => console.log("error", error));
  };

  const [answerID, setanswerID] = useState(0)
  return (
    <View style={{ flex: 1 }}>
      {
        checkload==="loading" ? <AppLoader /> :null
      }
      <HeaderLogo />
      <ScrollView>
     { question.image ? (
              <Image
                style={{
                  width: "100%",
                  height: 250,
                  marginTop: 0,
                  marginLeft: 0,
                  marginRight: 10,
                }}
                source={{
                  uri: question.image,
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
              }

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
      {
        listAnswer && listAnswer.length >0 && listAnswer.map((item,key) => (
          <View key={key} style={{ marginLeft: 15,marginTop:20,marginBottom:20, flexDirection: "row" }}>
          {item.users.image ? (
            <Image
              style={{ width: 40, height: 40, borderRadius: 30 }}
              source={{ uri: item.users.image }}
            />
          ) : (
            <EvilIcons name="user" size={45} color="black" />
          )}
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: "500" }}>
              Người trả lời
            </Text>
            <Text style={{ fontSize: 12, color: "#189AB4" }}>
              {item.users.allCodeRole.valuevi} , {item.users.full_name}
            </Text>
            <Text
              style={{ paddingLeft: 0, paddingRight: 20, paddingRight: 15 }}
            >
              {item.answer}
            </Text>
           {
            signInPerson.user_id === item.users.user_id ? 
            
           <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => {
              setcomment(item.answer);
              setcheckComment("comment");
              setanswerID(item.id)
            }}>
           <View
              style={{
                color: "#21B6A8",
                // paddingBottom: 20,
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
            <TouchableOpacity onPress={() =>{
               return Alert.alert(
                "Thông báo",
                `Bạn có chắc chắn muốn xóa bình luận `,
                [
                  {
                    text: "Có",
                    onPress: () => {
                     deleteComment(item.id)
                     setcheckload("loading")
                    },
                  },
          
                  {
                    text: "Không",
                  },
                ]
              );
            }}>
           <View
              style={{
                color: "#21B6A8",
                // paddingBottom: 20,
                marginTop: 5,
                marginLeft:15,
                flexDirection: "row",
              }}
            >
              <AntDesign name="delete" size={12} color="black" />
              <Text style={{ fontWeight: "500", paddingLeft:5,fontSize: 11 }}>
                Xoá
              </Text>
            </View>
            </TouchableOpacity>
           
           </View>
       
          :null
           }
          </View>
        </View>
        ))
      }
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
          onPress={onAddComment}
        >
          <Text style={{ color: "white" }}>Thêm câu trả lời</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionDetail;
