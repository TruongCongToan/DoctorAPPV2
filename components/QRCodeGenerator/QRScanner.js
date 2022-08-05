import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button,  Alert, } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import HeaderLogo from '../../screens/HeaderScreen/HeaderLogo';
import allAction from "../redux/action/allAction";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import AppLoader from "../../screens/AppLoader/AppLoader";


export default function QRCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
const [checkLoad, setcheckLoad] = useState('')
const url_UUID = "https://api-truongcongtoan.herokuapp.com/api/users/uuid=";

const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(data)
    fetchDataById(url_UUID,data)
    setcheckLoad("loading")
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const fetchDataById = (url,uuid) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    // alert(`${url}${uuid}`)
    fetch(`${url}${uuid}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // alert(!result);
          if(!result){
            setcheckLoad("done");
            Toast.show({
              type: "error",
              text1: "Thông báo",
              text2: "Mã QR không hợp lệ !",
            });
          }else{if(JSON.parse(result) && JSON.parse(result).user_id) {
            Alert.alert(
              `Xin chào ${JSON.parse(result).full_name} !`,
              `Bạn có muốn đăng nhập vào hệ thống ?`,
              [
                {
                  text: "Đăng nhập",
                  onPress: () => {
                    dispatch(allAction.userAction.addSignIn(JSON.parse(result)));
                    navigation.navigate("Drawer");

                  },
                },
        
                {
                  text: "Hủy",
                },
              ]
            );
            setcheckLoad("done");
          }
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
     

      <View style={styles.container}>
        {
          // checkLoad === "loading" ? <AppLoader />: null
        }
     <HeaderLogo />
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        //   style={StyleSheet.absoluteFillObject}
        style={{height:'80%',margin:20}}
        />

        {scanned && (
          <View style={{marginLeft:20,marginRight:20,marginBottom:30}}>
            <Button
            title={"Quét lại mã một lần nữa"}
            onPress={() => setScanned(false)}
          />
            </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
