import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderLogo from '../HeaderScreen/HeaderLogo'
import RNPickerSelect from 'react-native-picker-select';
import AppLoader from '../AppLoader/AppLoader';
import { MarkdownEditor } from 'react-native-markdown-editor';
import Toast from "react-native-toast-message";


const MarkdownScreen = () => {

    const [listDoctors, setlistDoctors] = useState([])
    const [listUsersData, setlistUsersData] = useState([])


    const [error, seterror] = useState({})

    const [selectedDoctorId, setselectedDoctorId] = useState(0)
    const [contentMarkDown, setContentMarkDown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [description, setdescription] = useState('');
    const [HaveOldData, setHaveOldData] = useState(false);

    //save to doctor info table
    const [HaveOldDataDoctorInfo, setHaveOldDataDoctorInfo] = useState(false);
    const [selectedPrice, setselectedPrice] = useState('')
    const [selectedPayment, setselectedPayment] = useState('')
    const [selectedProvince, setselectedProvince] = useState('')
    const [nameClinic, setnameClinic] = useState('')
    const [addressClinic, setaddressClinic] = useState('')
    const [note, setnote] = useState('')

    const [listPrices, setlistPrices] = useState([])
    const [listPayment, setlistPayment] = useState([])
    const [listProvince, setlistProvince] = useState([])

    const [listPriceData, setlistPriceData] = useState([])
    const [listPaymentData, setlistPaymentData] = useState([])
    const [listProvinceData, setlistProvinceData] = useState([])

    var sendDataMarkDown = {
        contentMarkDown: contentMarkDown,
        description: description,
        markdown_id: selectedDoctorId
    }

    
    var sendDatadoctorinfo = {
        doctorid:selectedDoctorId,
        priceid:selectedPrice,
        provinceid:selectedProvince,
        addressclinicid:addressClinic,
        nameclinic:nameClinic,
        note:note,
        payment:selectedPayment,


    }
    var url_User = "https://api-truongcongtoan.herokuapp.com/api/users/doctors"
    var url_Price = "https://api-truongcongtoan.herokuapp.com/api/allcode/price"
    var url_Payment = "https://api-truongcongtoan.herokuapp.com/api/allcode/payment"
    var url_Province = "https://api-truongcongtoan.herokuapp.com/api/allcode/province"
    var url_DoctorInfo = "http://api-truongcongtoan.herokuapp.com/api/doctorinfo/"
    var url_MarkDown = "http://api-truongcongtoan.herokuapp.com/api/markdowns/"

    const handleChangeDoctor = (value) => {
        setselectedDoctorId(value)
    }
    const handleChangePrice = (value) => {
        setselectedPrice(value)
    }
    const handleChangePayment = (value) => {
        setselectedPayment(value)
    }
    const handleChangeProvince = (value) => {
        setselectedProvince(value)
    }

    const addData = (url,data) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        let listdoctor = []
        let listPrice = []
        let listPayment = []
        let listProvince = []
        if (listUsersData && listUsersData.length > 0) {

            listUsersData.map(item => {
                listdoctor.push(buildDataInput(item, "doctor"))
            })
        }
        if (listPriceData && listPriceData.length > 0) {

            listPriceData.map(item => {
                listPrice.push(buildDataInput(item, "price"))
            })
        }
        if (listPriceData && listPriceData.length > 0) {

            listPriceData.map(item => {
                listPrice.push(buildDataInput(item, "price"))
            })
        }
        if (listPaymentData && listPaymentData.length > 0) {

            listPaymentData.map(item => {
                listPayment.push(buildDataInput(item, "payment"))
            })
        }
        if (listProvinceData && listProvinceData.length > 0) {

            listProvinceData.map(item => {
                listProvince.push(buildDataInput(item, "province"))
            })
        }
        setlistDoctors(listdoctor)
        setlistPrices(listPrice)
        setlistPayment(listPayment)
        setlistProvince(listProvince)

    }, [listUsersData, listPriceData, listPaymentData, listProvinceData]);

    const fetchDataTime = (url, setData) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => { setData(JSON.parse(result)) })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        fetchDataTime(url_User, setlistUsersData)
        fetchDataTime(url_Price, setlistPriceData)
        fetchDataTime(url_Payment, setlistPaymentData)
        fetchDataTime(url_Province, setlistProvinceData)
    }, [])

    const buildDataInput = (inputData, flag) => {
        let object = {};

        if (flag === "doctor") {
            if (inputData) {

                object.value = inputData.user_id;
                object.label = `${inputData.full_name}`;
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

        return object;
    }

    useEffect(() => {
        validateBlank()
    }, [selectedDoctorId,selectedPrice,selectedPayment,selectedProvince,nameClinic,addressClinic,description,contentMarkDown])
    
    const validateBlank = () => {
        let errors = {};
        let formIsValid = true;
        if (!selectedDoctorId) {
          formIsValid = false;
          errors["doctor"] = "Bạn cần phải chọn bác sỹ khám!";
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
                        if (!nameClinic) {
                            formIsValid = false;
                            errors["nameclinic"] = "Bạn cần phải nhập tên phòng khám!";
                          } else {
                            if (!addressClinic) {
                                formIsValid = false;
                                errors["address"] = "Bạn cần phải nhập địa chỉ phòng khám!";
                              } else {
                                if (!description) {
                                    formIsValid = false;
                                    errors["description"] = "Bạn cần phải nhập thông tin giới thiệu chung!";
                                  } else {
                                    if (!contentMarkDown) {
                                        formIsValid = false;
                                        errors["markdown"] = "Bạn cần phải nhập thông tin chi tiết!";
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
        }
        
    const handleSave = () => {
        if(validateBlank()){
           try {
            addData(url_MarkDown,sendDataMarkDown)
            addData(url_DoctorInfo,sendDatadoctorinfo)
            console.log("gia tri docrtor info ",sendDatadoctorinfo);
            console.log("send");
            Toast.show({
                type: "success",
                text1: "Thông báo",
                text2:"Đã tạo thông tin cho bác sĩ thành công !",
              });
           } catch (error) {
                console.log(error);
           }
        }
    }

    const handleEditorChange = (value) =>{
       setContentMarkDown(value)
    }
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <HeaderLogo />
            <ScrollView>
                <Text style={{
                    fontSize: 20,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    marginTop: 40,
                    marginBottom: 10,
                    textAlign: 'center'

                }}> Tạo thêm thông tin của bác sĩ</Text>

                <Text style={{ fontSize: 13, fontWeight: '400', marginLeft: 10 }}> *Xin mời quản trị viên tạo thông tin cho bác sĩ</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["doctor"] ? "red" : "black" }}>1. Chọn bác sĩ</Text>
                <RNPickerSelect
                    onValueChange={handleChangeDoctor}
                    placeholder={{
                        label: 'Chọn bác sĩ ... ',
                        value: null,
                    }}
                    items={listDoctors}
                />
                {listDoctors.length === 0 ? <AppLoader /> : null}
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["price"] ? "red" : "black" }}>2. Chọn giá khám bệnh</Text>
                    <RNPickerSelect
                        onValueChange={handleChangePrice}
                        placeholder={{
                            label: 'Chọn giá khám ... ',
                            value: null,
                        }}
                        items={listPrices}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["payment"] ? "red" : "black" }}>3. Chọn phương thức thanh toán</Text>
                    <RNPickerSelect
                        onValueChange={handleChangePayment}
                        placeholder={{
                            label: 'Chọn phương thức thanh toán ... ',
                            value: null,
                        }}
                        items={listPayment}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["province"] ? "red" : "black" }}>4. Chọn tỉnh thành</Text>
                    <RNPickerSelect
                        onValueChange={handleChangeProvince}
                        placeholder={{
                            label: 'Chọn tỉnh thành ... ',
                            value: null,
                        }}
                        items={listProvince}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["nameclinic"] ? "red" : "black" }}>5. Nhập tên phòng khám</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <TextInput
                            style={{ height: 40, textAlignVertical: 'top', borderWidth: 0.3, borderRadius: 10, padding: 10, borderColor: 'gray', marginTop: 15, width: '90%' }}
                            placeholder='Nhập tên phòng khám'
                            onChangeText={setnameClinic}
                            value={nameClinic}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["address"] ? "red" : "black" }}>6. Nhập địa chỉ phòng khám</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <TextInput
                            style={{ height: 40, textAlignVertical: 'top', borderWidth: 0.3, borderRadius: 10, padding: 10, borderColor: 'gray', marginTop: 15, width: '90%' }}
                            placeholder='Nhập địa chỉ phòng khám'
                            onChangeText={setaddressClinic}
                            value={addressClinic}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["note"] ? "red" : "black" }}>7.Ghi chú</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <TextInput
                            style={{ height: 40, textAlignVertical: 'top', borderWidth: 0.3, borderRadius: 10, padding: 10, borderColor: 'gray', marginTop: 15, width: '90%' }}
                            placeholder='Ghi chú'
                            onChangeText={setnote}
                            value={note}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["description"] ? "red" : "black" }}>8. Nhập thông tin giới thiệu chung cho bác sĩ</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput
                            placeholder='Nhập thông tin giới thiệu chung '
                            multiline={true}
                            numberOfLines={4}
                            style={{ height: 150, textAlignVertical: 'top', borderWidth: 0.3, borderRadius: 10, padding: 10, borderColor: 'gray', marginTop: 15, width: '90%' }}
                            onChangeText={setdescription}
                            value={description}
                        />
                    </View>
                </View>
                <View >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 10, color: error["markdown"] ? "red" : "black" }}>9. Nhập thông tin chi tiết cho bác sĩ</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '90%', borderRadius: 20 }}>
                            <MarkdownEditor onMarkdownChange={handleEditorChange} />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            width: '90%',
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
    )
}

export default MarkdownScreen