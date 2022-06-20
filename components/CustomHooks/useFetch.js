import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";


//add new user 
const HandleLoginAPI = async (URL = "", data = {}) => {
  const navigation = useNavigation();

  console.log("calling data ...");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  var raw = JSON.stringify(
    data
  );

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(URL, requestOptions)
    .then(response => response.text())
    .then(result => {
      if (JSON.parse(result).access_token) {
        navigation.navigate("HomeTab")
        console.log(JSON.parse(result).access_token);
      } else {
        console.log(JSON.parse(result).access_token);

        Toast.show({
          type: "error",
          text1: "Thông báo",
          text2: "Thông tin email và mật khẩu không chính xác nha!",
        });
      }
    })
    .catch(error => console.log('error', error));
};


export { HandleLoginAPI};