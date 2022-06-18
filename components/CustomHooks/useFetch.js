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
// const addSchedule =()
//delete user
const deleteUser = (URL = "",username) =>{
  console.log("url la ",URL);
  return axios.delete(URL+'/'+username);
}
//sua user
const editUser = (URL = "",params = {}) =>{
  return axios.put(URL+"/"+params.username,params);
 
}
//sua markdown
const editMarkdown = (URL = "",params = {}) =>{
  return axios.put(URL+"/"+params.markdown_id,params);
}
//get markdown thong qua markdown_id
const getDetailInforDoctor = async (urlIn,inputId) =>{
  let url = `${urlIn}${inputId}`;
  // console.log("dia chi la",url);
  return  axios.get(url);  
}
//get schedule by doctorid
const getScheduleByDoctorid = async (inputId) =>{
  let url = `http://localhost:8080/api/schedules/${inputId}`;
  // console.log(url)
  return  axios.get(url);  
}

//delete time schedule 
const deleteSchedule = (doctorid,date,timetype) =>{
  let url = `http://localhost:8080/api/schedules/${doctorid}/${date}/${timetype}`;
  console.log("url la ",url)
  return axios.delete(url);
}
//get schedule by doctorid and date
const getSchedulebyDate = async (doctorid,date) =>{
  let url = `http://localhost:8080/api/schedules/${doctorid}/${date}`;
  return axios.get(url);
}

export  {HandleLoginAPI,deleteUser,editUser
  ,editMarkdown,getDetailInforDoctor,getScheduleByDoctorid
  ,deleteSchedule,getSchedulebyDate};