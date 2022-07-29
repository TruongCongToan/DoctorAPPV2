import { View, Text, Image, TouchableOpacity , ScrollView ,RefreshControl,StyleSheet} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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

const CutomDrawer = (props) => {
  var dataLogin = useSelector(state => state.user.signInPerson)
  // console.log("gia tri cua nguoi dang login ",dataLogin);
const navigation = useNavigation();

const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <ScrollView
            // contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
           
      <DrawerContentScrollView {...props}>
        {dataLogin ?
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              backgroundColor: "#f6f6f6",
              marginBottom: 20,
            }}
          >
            <View>
              {dataLogin ? <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {dataLogin.full_name}
              </Text> : null}
              {dataLogin ? <Text style={{ fontSize: 13 }}> {dataLogin.email}</Text> : null}
            </View>

           {
            dataLogin ? 
             <View style={{ width: 40, height: 40, borderRadius: 30 }}>
            {dataLogin.image ?
             <TouchableOpacity onPress={() => {navigation.navigate("UserInfo")}}>
               <Image
                style={{ width: 40, height: 40, borderRadius: 30 }}
                source={
                  { uri: dataLogin.image }
                }
              />
             </TouchableOpacity>
              :
            
              <TouchableOpacity onPress={() => {navigation.navigate("UserInfo")}}>
                <EvilIcons name="user" size={45} color="black" />
             </TouchableOpacity>
            }

          </View>
          : null
           }

          </View> : null
        }
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      </ScrollView>
    </>
  );
};

export default CutomDrawer;
