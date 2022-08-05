import { View, Text,TextInput,TouchableOpacity ,Alert} from 'react-native'
import React ,{useState,useEffect} from 'react'
import HeaderLogo from '../HeaderScreen/HeaderLogo'
import { useDispatch, useSelector } from "react-redux";
import AppLoader from "../AppLoader/AppLoader";

const RateDoctor = () => {
    const [comment, setcomment] = useState('');
    const signInPerson = useSelector((state) => state.user.signInPerson);
    const doctorID = useSelector((state) => state.user.doctorInfo);

    const [error, seterror] = useState('')
    const [checkload, setcheckload] = useState('')
    const [dataToRate, setdataToRate] = useState({
      user_id:0,
      doctor_id:0,
      rating:""
    });
    const url_Rating = "https://api-truongcongtoan.herokuapp.com/api/rating/"

    useEffect(() => {
      let check = false
    if (!check) {
      setdataToRate({
        user_id:signInPerson.user_id,
        doctor_id:doctorID,
        rating:comment
      })
      validateBlank();
    }
      return () => {
        check = true
      }
    }, [comment])
    
    const validateBlank = () => {
      let errors = {};
      let formIsValid = true;
      if (!comment) {
        formIsValid = false;
        errors["comment"] = "Bạn cần nhập đánh giá trước khi gửi đi !";
      }
      seterror(errors);
      return formIsValid;
    }
    const onSendPress = () => {
      if (validateBlank() === false) {
        if (error["comment"]) {
          pushError(error["comment"])
        } 
      }
      else{
        handleRegister(url_Rating,dataToRate);
        setcheckload("loading")
      }
    }
    const pushError = (input) => {
      return Alert.alert(
        "Error!",
        `${input}`,
        [
          {
            text: "Ok",
          },
        ]
      );
    }

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
          // console.log("gia tri thu duic ", result);
          setcheckload("done");
          setcomment("")
          if (JSON.parse(result).id) {
            return Alert.alert("Thông báo", "Đã gửi câu hỏi thành công !");
          } else {
            return Alert.alert("Thông báo", "Gửi câu hỏi thất bại !");
          }
        })
        .catch((error) => console.log("error", error));
    };
    return (
        <View style={{ flex: 1 }}>
          {
            checkload === "loading" ? <AppLoader /> : null
          }
            <HeaderLogo />
            <Text style={{ fontSize: 20, padding: 15, fontWeight: '600' }}>BKH Care xin ghi nhận các phản hồi sau khám của khách hàng</Text>
            <Text style={{ fontSize: 13, paddingLeft: 20,fontWeight:'300' }}>
                Xin chào anh/chị,{"\n"}
                {"\n"}
                Xin cảm ơn anh chị đã đặt khám qua BKH Care !{"\n"}
                {"\n"}
                Những phản hồi sau đây của các anh chị là những đóng góp quan trọng để giúp cho nhiều người bệnh nhân khác đạt hiệu quả hơn khi khám bệnh.{"\n"}{"\n"}
                Rất mong nhân được những chi sẻ chân thành từ anh/chị.{"\n"}{"\n"}

                BKH Care xin chân trọng cảm ơn!</Text>
            <Text style ={{padding:15,fontWeight:'500'}}>Xin mời anh/chị đưa ra những đánh giá về bác sĩ khám :</Text>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TextInput
                placeholder="Nhập đánh giá của bạn"
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
                onChangeText={setcomment}
                value={comment}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center",marginTop:20 }}>
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
          onPress={onSendPress}
        >
          <Text style={{ color: "white" }}>Gửi đánh giá</Text>
        </TouchableOpacity>
      </View>
        </View>
    )
}

export default RateDoctor