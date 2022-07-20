import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import HeaderLogo from "../HeaderScreen/HeaderLogo";
import RNPickerSelect from "react-native-picker-select";
import AppLoader from "../AppLoader/AppLoader";

const MarkdownScreen = () => {
  const [listDoctors, setlistDoctors] = useState([]);
  const [listUsersData, setlistUsersData] = useState([]);

  const [error, seterror] = useState({});

  const [selectedDoctorId, setselectedDoctorId] = useState(0);
  const [contentMarkDown, setContentMarkDown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [description, setdescription] = useState("");
  const [HaveOldData, setHaveOldData] = useState(false);

  //save to doctor info table
  // const [HaveOldDataDoctorInfo, setHaveOldDataDoctorInfo] = useState(false);

  const [markdownInfo, setmarkdownInfo] = useState({})

  const [selectedPrice, setselectedPrice] = useState("");
  const [selectedPayment, setselectedPayment] = useState("");
  const [selectedProvince, setselectedProvince] = useState("");
  const [selectedSpecialties, setselectedSpecialties] = useState("");
  const [selectedClinic, setselectedClinic] = useState('');

  const [addressClinic, setaddressClinic] = useState("");
  const [note, setnote] = useState("");

  const [listPrices, setlistPrices] = useState([]);
  const [listPayment, setlistPayment] = useState([]);
  const [listProvince, setlistProvince] = useState([]);
  const [listSpecialties, setlistSpecialties] = useState([]);
  const [listClincs, setlistClincs] = useState([])

  const [listPriceData, setlistPriceData] = useState([]);
  const [listPaymentData, setlistPaymentData] = useState([]);
  const [listProvinceData, setlistProvinceData] = useState([]);
  const [listSpecialtiesData, setlistSpecialtiesData] = useState([]);
  const [listClinicData, setlistClinicData] = useState([])

  const [doctorInfo, setdoctorInfo] = useState({});
  const [check, setcheck] = useState("");

  var sendDataMarkDown = {
    contentMarkDown: contentMarkDown,
    description: description,
    doctorid: selectedDoctorId,
  };

  var sendDatadoctorinfo = {
    doctorid: selectedDoctorId,
    priceid: selectedPrice,
    provinceid: selectedProvince,
    addressclinicid: addressClinic,
    clinic_id: selectedClinic,
    note: note,
    payment: selectedPayment,
    specialty_id: selectedSpecialties,
  };

  var url_Doctors =
    "https://api-truongcongtoan.herokuapp.com/api/users/doctors/";

  var url_User = "https://api-truongcongtoan.herokuapp.com/api/users/";

  var url_Price = "https://api-truongcongtoan.herokuapp.com/api/allcode/price";
  var url_Payment =
    "https://api-truongcongtoan.herokuapp.com/api/allcode/payment";
  var url_Province =
    "https://api-truongcongtoan.herokuapp.com/api/allcode/province";
  var url_DoctorInfo =
    "http://api-truongcongtoan.herokuapp.com/api/doctorinfo/";
  var url_MarkDown = "http://api-truongcongtoan.herokuapp.com/api/markdowns/";
  var url_Specialties =
    "https://api-truongcongtoan.herokuapp.com/api/specialties/";
    var url_Clinic =
    "https://api-truongcongtoan.herokuapp.com/api/Clinic/";

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    fetchData(url_Doctors, setlistUsersData);
    fetchData(url_Specialties, setlistSpecialtiesData);
    fetchDataById(url_DoctorInfo, setdoctorInfo, selectedDoctorId);

    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);



  const handleChangeDoctor = (value) => {
    setselectedDoctorId(value);
  };
  const handleChangePrice = (value) => {
    setselectedPrice(value);
  };
  const handleChangeSpecialties = (value) => {
    setselectedSpecialties(value);
  };
  const handleChangePayment = (value) => {
    setselectedPayment(value);
  };
  const handleChangeProvince = (value) => {
    setselectedProvince(value);
  };

  const addDataMarkDown = (url, data) => {
    console.log("calling data ...");

    console.log("Data payload ",data);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    return fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if(result){
          return Alert.alert(
            "Thông báo",
            `Đã thêm thông tin cho bác sĩ thành công !`,
            [
              {
                text: "OK",
              },
            ]
          );
        }else{
          return Alert.alert(
            "Thông báo",
            `Thêm thông tin cho bác sĩ thất bại !`,
            [
              {
                text: "OK",
              },
            ]
          );
        }
      })
      .catch((error) => console.log("error", error));
  };


  const addData = (url, data) => {
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
        if (JSON.parse(result).errorCode) {
          setcheck("done");
          return Alert.alert(
            "Thông báo",
            `Thêm thông tin cho bác sĩ thất bại. Vui lòng kiểm tra lại!`,
            [
              {
                text: "OK",
              },
            ]
          );
        } else {
          setcheck("done");
          addDataMarkDown(url_MarkDown, sendDataMarkDown);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    let listdoctor = [];
    let listPrice = [];
    let listPayment = [];
    let listProvince = [];
    let listSpecialties = [];
    let listClincs = []

    if (listUsersData && listUsersData.length > 0) {
      listUsersData.map((item) => {
        listdoctor.push(buildDataInput(item, "doctor"));
       

      });
    }
    if (listPriceData && listPriceData.length > 0) {
      listPriceData.map((item) => {
        listPrice.push(buildDataInput(item, "price"));
      });
    }

    if (listPaymentData && listPaymentData.length > 0) {
      listPaymentData.map((item) => {
        listPayment.push(buildDataInput(item, "payment"));
      });
    }
    if (listProvinceData && listProvinceData.length > 0) {
      listProvinceData.map((item) => {
        listProvince.push(buildDataInput(item, "province"));
      });
    }
    if (listSpecialtiesData && listSpecialtiesData.length > 0) {
      listSpecialtiesData.map((item) => {
        listSpecialties.push(buildDataInput(item, "specialties"));
      });
    }

    if (listClinicData && listClinicData.length > 0) {
      listClinicData.map((item) => {
        listClincs.push(buildDataInput(item, "clinic"));
      });
    }

    setlistDoctors(listdoctor);
    setlistPrices(listPrice);
    setlistPayment(listPayment);
    setlistProvince(listProvince);
    setlistSpecialties(listSpecialties);
    setlistClincs(listClincs);
  }, [
    listUsersData,
    listPriceData,
    listPaymentData,
    listProvinceData,
    listSpecialtiesData,
  ]);
  const [dataUserGet, setdataUserGet] = useState({})

 
  const updateData = (url,id, data) => {
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
     data
    );

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${url}${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result) {
          updateDataMarkDown(url_MarkDown,JSON.parse(result).id,sendDataMarkDown);

        }else{
          return Alert.alert(
            "Thông báo",
            `Chỉnh sửa thông tin cho bác sĩ thất bại. Vui lòng kiểm tra lại!`,
            [
              {
                text: "OK",
              },
            ]
          );
        }
        setcheck("done");
      })
      .catch(error => console.log('error', error));
  }

  const updateDataMarkDown = (url,id, data) => {
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
     data
    );

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${url}${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result) {
          return Alert.alert(
            "Thông báo",
            `Đã chỉnh sửa thông tin cho bác sĩ thành công!`,
            [
              {
                text: "OK",
              },
            ]
          );
        }else{
          return Alert.alert(
            "Thông báo",
            `Chỉnh sửa thông tin cho bác sĩ thất bại. Vui lòng kiểm tra lại!`,
            [
              {
                text: "OK",
              },
            ]
          );
        }
        // console.log("ket qua thu uodc ",result);
        setcheck("done");
            // console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  const fetchData = (url, setData) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${url}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };

  const fetchDataById = (url, setData, id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
// console.log("url ",`${url}${id}`);
    fetch(`${url}${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).error) {
          setData(null)
        }else{
          setData(JSON.parse(result));
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchData(url_Doctors, setlistUsersData);
    fetchData(url_Price, setlistPriceData);
    fetchData(url_Payment, setlistPaymentData);
    fetchData(url_Province, setlistProvinceData);
    fetchData(url_Specialties, setlistSpecialtiesData);
    fetchData(url_Clinic,setlistClinicData)
  }, []);

  useEffect(() => {
    let check = false;
    if (!check) {
      fetchDataById(url_DoctorInfo, setdoctorInfo, selectedDoctorId);
    }
    return () => {
      check = true;
    };
  }, [selectedDoctorId]);
  
  useEffect(() => {
    let check = false;
    if (!check) {
      // fetchDataById(url_DoctorInfo, setdoctorInfo, selectedDoctorId);
      fetchDataById(url_MarkDown, setmarkdownInfo, doctorInfo ? doctorInfo.id : 0);
    }
    return () => {
      check = true;
    };
  }, [doctorInfo]);

  useEffect(() => {
    let check = false;
    if (!check) {
      setselectedSpecialties(doctorInfo  && doctorInfo.specialties ? doctorInfo.specialties.id : "" )
      setselectedPrice(doctorInfo && doctorInfo.priceid ? doctorInfo.priceid : "" )
      setselectedPayment(doctorInfo && doctorInfo.payment ? doctorInfo.payment : "" )
      setselectedProvince(doctorInfo && doctorInfo.provinceid ? doctorInfo.provinceid : "" )

      setselectedClinic(doctorInfo && doctorInfo.clinic ? doctorInfo.clinic.id : "")
      setnote(doctorInfo ? doctorInfo.note : "")
      setaddressClinic(doctorInfo && doctorInfo.clinic && doctorInfo.clinic.address ? doctorInfo.clinic.address : "")

      setContentMarkDown(markdownInfo ? markdownInfo.contentMarkDown : "")
      setdescription(markdownInfo ? markdownInfo.description:"")

  
    }
    return () => {
      check = true;
    };
  }, [doctorInfo,markdownInfo,dataUserGet]);

  // console.log("markdownInfo " ,markdownInfo ? markdownInfo.description : markdownInfo.description );

  const checkHaveOldData = () =>{
    let check = false;
    if(
      !doctorInfo.specialties 
      && !doctorInfo.clinic.id 
      && !doctorInfo.note 
      && !doctorInfo.priceid 
      && !doctorInfo.provinceid 
      && !doctorInfo.payment 
      && !doctorInfo.addressclinicid 
      ){
        // if (markdownInfo.description) {
          
        // }
        check = false;
    }else{
      check = true
    }
    return check;
  }

  // console.log("gia tri doctor lay duoc  ", markdownInfo.specialty_id);

  const buildDataInput = (inputData, flag) => {
    let object = {};

    if (flag === "doctor") {
      if (inputData) {
        object.value = inputData.user_id;
        object.label = `${inputData.full_name}`;
      }
    }

    if (flag === "specialties") {
      if (inputData) {
        object.value = inputData.id;
        object.label = `${inputData.name}`;
      }
    }
    if (flag === "price") {
      if (inputData) {
        object.value = inputData.key;
        object.label = `${inputData.valuevi}`;
      }
    }
    if (flag === "payment") {
      if (inputData) {
        object.value = inputData.key;
        object.label = `${inputData.valuevi}`;
      }
    }
    if (flag === "province") {
      if (inputData) {
        object.value = inputData.key;
        object.label = `${inputData.valuevi}`;
      }
    }
    if (flag === "clinic") {
      if (inputData) {
        object.value = inputData.id;
        object.label = `${inputData.name}`;
      }
    }

    return object;
  };

  useEffect(() => {
    validateBlank();
  }, [
    selectedDoctorId,
    selectedPrice,
    selectedPayment,
    selectedProvince,
    addressClinic,
    description,
    contentMarkDown,
    selectedSpecialties,
    selectedClinic
  ]);

  // console.log("eroor",error["specialties"]);
  const validateBlank = () => {
    let errors = {};
    let formIsValid = true;
    if (!selectedDoctorId) {
      formIsValid = false;
      errors["doctor"] = "Bạn cần phải chọn bác sỹ khám!";
    } else {
      if (!selectedSpecialties) {
        formIsValid = false;
        errors["specialties"] = "Bạn cần phải chọn chuyên khoa !";
      } else {
        if (!selectedPrice) {
          formIsValid = false;
          errors["price"] = "Bạn cần phải chọn giá khám!";
        } else {
          if (!selectedPayment) {
            formIsValid = false;
            errors["payment"] = "Bạn cần phải chọn phương thức thanh toán!";
          } else {
            if (!selectedProvince) {
              formIsValid = false;
              errors["province"] = "Bạn cần phải chọn tỉnh thành!";
            } else {
              if (!selectedClinic) {
                formIsValid = false;
                errors["clinic"] = "Bạn cần phải nhập tên phòng khám!";
              } else {
                if (!addressClinic) {
                  formIsValid = false;
                  errors["address"] = "Bạn cần phải nhập địa chỉ phòng khám!";
                } else {
                  if (!description) {
                    formIsValid = false;
                    errors["description"] =
                      "Bạn cần phải nhập thông tin giới thiệu chung!";
                  } else {
                    if (!contentMarkDown) {
                      formIsValid = false;
                      errors["markdown"] =
                        "Bạn cần phải nhập thông tin chi tiết!";
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    seterror(errors);
    return formIsValid;
  };

  const pushError = (input) => {
    return Alert.alert("Error!", `${input}`, [
      {
        text: "OK",
      },
    ]);
  };

  const handleSave = () => {
    if (!validateBlank()) {
      if (error["doctor"]) {
        pushError(error["doctor"]);
      } else {
        if (error["specialties"]) {
          pushError(error["specialties"]);
        } else {
          if (error["price"]) {
            pushError(error["price"]);
          } else {
            if (error["payment"]) {
              pushError(error["payment"]);
            } else {
              if (error["province"]) {
                pushError(error["province"]);
              } else {
                if (error["clinic"]) {
                  pushError(error["clinic"]);
                } else {
                  if (error["address"]) {
                    pushError(error["address"]);
                  } else {
                    if (error["description"]) {
                      pushError(error["description"]);
                    } else {
                      if (error["markdown"]) {
                        pushError(error["markdown"]);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      if (checkHaveOldData()) {
        console.log("Co roig");
         try {
        
        updateData(url_DoctorInfo,selectedDoctorId, sendDatadoctorinfo);
        setcheck("loading");
      } catch (error) {
        console.log(error);
      }
      }else{
        console.log("chua co");
         try {
        addData(url_DoctorInfo, sendDatadoctorinfo);
        setcheck("loading");

      } catch (error) {
        console.log(error);
      }
      }
     
    }
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <HeaderLogo />

      {check === "loading" ? <AppLoader /> : null}
      <ScrollView
        horizontal
        contentContainerStyle={[styles.scrollView, { height: 50 }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      ></ScrollView>
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            fontWeight: "bold",
            marginTop: 40,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {" "}
          Tạo thêm thông tin của bác sĩ
        </Text>

        <Text style={{ fontSize: 13, fontWeight: "400", marginLeft: 10 }}>
          {" "}
          *Xin mời quản trị viên tạo thông tin cho bác sĩ
        </Text>
        
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 10,
            marginTop: 10,
            color: error["doctor"] ? "red" : "black",
          }}
        >
          1. Chọn bác sĩ
        </Text>
        <RNPickerSelect
          onValueChange={handleChangeDoctor}
          placeholder={{
            label: "Chọn bác sĩ ... ",
            value: null,
          }}
          items={listDoctors}
        />
      {listDoctors.length === 0 && listClincs.length === 0 &&listSpecialties.length ===0 ? <AppLoader /> : null}
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["specialties"] ? "red" : "black",
            }}
          >
            2. Chọn chuyên khoa
          </Text>
        
          <RNPickerSelect
            onValueChange={handleChangeSpecialties}
            value={doctorInfo && selectedSpecialties ? selectedSpecialties: ""}
            placeholder={{
              label: "Chọn chuyên khoa ... ",
              value: null,
            }}
            items={listSpecialties}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["price"] ? "red" : "black",
            }}
          >
            3. Chọn giá khám bệnh
          </Text>
          <RNPickerSelect
            onValueChange={handleChangePrice}
            value={doctorInfo && selectedPrice ? selectedPrice: ""}
            placeholder={{
              label: "Chọn giá khám ... ",
              value: null,
            }}
            items={listPrices}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["payment"] ? "red" : "black",
            }}
          >
            4. Chọn phương thức thanh toán
          </Text>
          <RNPickerSelect
            onValueChange={handleChangePayment}
            value={doctorInfo && selectedPayment ? selectedPayment : ""}
            placeholder={{
              label: "Chọn phương thức thanh toán ... ",
              value: null,
            }}
            items={listPayment}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["province"] ? "red" : "black",
            }}
          >
            5. Chọn tỉnh thành
          </Text>
          <RNPickerSelect
            onValueChange={handleChangeProvince}
            value={doctorInfo && selectedProvince ? selectedProvince : ""}
            placeholder={{
              label: "Chọn tỉnh thành ... ",
              value: null,
            }}
            items={listProvince}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["clinic"] ? "red" : "black",
            }}
          >
            6. Chọn đơn vị công tác
          </Text>
          <RNPickerSelect
            onValueChange={handleChangeProvince}
            value={doctorInfo && doctorInfo.clinic && selectedClinic ? selectedClinic : ""}
            placeholder={{
              label: "Chọn cơ sở... ",
              value: null,
            }}
            items={listClincs}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["address"] ? "red" : "black",
            }}
          >
            7. Nhập địa chỉ phòng khám
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TextInput
              style={{
                height: 40,
                textAlignVertical: "top",
                borderWidth: 0.3,
                borderRadius: 10,
                padding: 10,
                borderColor: "gray",
                marginTop: 15,
                width: "90%",
              }}
              placeholder="Nhập địa chỉ phòng khám"
              onChangeText={setaddressClinic}
              value={addressClinic}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["note"] ? "red" : "black",
            }}
          >
            8.Ghi chú
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TextInput
              style={{
                height: 40,
                textAlignVertical: "top",
                borderWidth: 0.3,
                borderRadius: 10,
                padding: 10,
                borderColor: "gray",
                marginTop: 15,
                width: "90%",
              }}
              placeholder="Ghi chú"
              onChangeText={setnote}
              value={note}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["description"] ? "red" : "black",
            }}
          >
            9. Nhập thông tin giới thiệu chung cho bác sĩ
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TextInput
              placeholder="Nhập thông tin giới thiệu chung "
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
              onChangeText={setdescription}
              value={description}
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              marginTop: 10,
              color: error["markdown"] ? "red" : "black",
            }}
          >
            10. Nhập thông tin chi tiết cho bác sĩ
          </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ width: "100%", borderRadius: 20 }}>
            <TextInput
              placeholder="Nhập thông tin chi tiết "
              multiline={true}
              numberOfLines={4}
              style={{
                height: 300,
                textAlignVertical: "top",
                borderWidth: 0.3,
                borderRadius: 10,
                margin: 15,
                borderColor: "gray",
                marginTop: 15,
                padding:10,
        
                width: "90%",
              }}
              onChangeText={setContentMarkDown}
              value={contentMarkDown}
            />
              </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "90%",
              height: 40,
              backgroundColor: "blue",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleSave}
          >
            <Text style={{ color: "white" }}>Lưu thông tin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MarkdownScreen;
