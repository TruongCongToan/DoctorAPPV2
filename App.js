import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import store from "./components/redux/reducer/index";
import "react-native-gesture-handler";
import { persistor } from "./components/redux/reducer/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import SignInScreen from "./screens/SignInScreen/SignInScreen";
import DrawerNavigator from "./components/Drawer/Drawer";
import SignUpcreen from "./screens/SignUpScreen/SignUpScreen";
import ForgotPassWord from "./screens/ForgotPassWord/ForgotPassWord";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import {LogBox} from "react-native";
import Chitietbacsi from "./components/Chitietbacsi/Chitietbacsi";
import ListAllDoctorScreen from "./screens/SearchScreen/ListAllDoctorScreen";
import BookingScheduleScreen from "./screens/BookingScheduleScreen/BookingScheduleScreen";
import ListSpecialtiesScreen from "./screens/SearchScreen/ListSpecialtiesScreen";
import Chitietchuyenkhoa from "./screens/ChuyenKhoaScreen/Chitietchuyenkhoa";
import ListClinicScreen from "./screens/SearchScreen/ListClinicScreen";
import ChiTietCSYT from "./screens/CoSoYTeScreen/ChiTietCSYT";
import SpecialtiesClinicList from "./screens/CoSoYTeScreen/SpecialtiesClinicList";
import InputNewPass from "./screens/NewPassWord/InputNewPass";
import NewOTP from "./screens/NewPassWord/NewOTP"
import QRCodeGenerator from "./components/QRCodeGenerator/QRCodeGenerator";
import QRCodeScanner from "./components/QRCodeGenerator/QRScanner";
import VideoCall from "./components/VideoCall/VideoCall";
import UserInfo from "./screens/AcountInfo/UserInfo";
import Question from "./screens/Question/Question";
import QuestionDetail from "./screens/CommunityScreen/QuestionDetail";

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function App() {
  const Stack = createNativeStackNavigator();

  return (


      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.root}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Drawer"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="Drawer" component={DrawerNavigator} />
                <Stack.Screen name="SignUp" component={SignUpcreen} />
                <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
                <Stack.Screen name="NewOTP" component={NewOTP} />
                <Stack.Screen name="Search" component={SearchScreen} />
                <Stack.Screen name="SeeMore" component={ListAllDoctorScreen} />
                <Stack.Screen name="SeeMoreSpecialties" component={ListSpecialtiesScreen} />
                <Stack.Screen name="Chitietbacsi" component={Chitietbacsi} />
                <Stack.Screen name="Chitietchuyenkhoa" component={Chitietchuyenkhoa} />
                <Stack.Screen name="Datlich" component={BookingScheduleScreen} />
                <Stack.Screen name="Clinic" component={ListClinicScreen} />
                <Stack.Screen name="ChitietCSYT" component={ChiTietCSYT} />
                <Stack.Screen name="ChuyenkhoaCSYT" component={SpecialtiesClinicList} />
                <Stack.Screen name="NewPass" component={InputNewPass} />
                <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} />
                <Stack.Screen name="QRCodeGenerator" component={QRCodeGenerator} />
                <Stack.Screen name="UserInfo" component={UserInfo} />
                <Stack.Screen name="Question" component={Question} />
                <Stack.Screen name="QuestionDetail" component={QuestionDetail} />

              </Stack.Navigator>
             
            </NavigationContainer>
          </SafeAreaView>
          <Toast />
        </PersistGate>
      </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
