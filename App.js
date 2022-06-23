import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import store from "./components/redux/reducer/index";
import "react-native-gesture-handler";
import { persistor } from "./components/redux/reducer/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { BottomTabNavigator } from "./components/BottomTabNavigator/BottomTabNavigator";
import SignInScreen from "./screens/SignInScreen/SignInScreen";
import DrawerNavigator from "./components/Drawer/Drawer";
import PickPhoto from "./components/TableTwo/PickPhoto";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.root}>
          <NavigationContainer>
            {/* <Stack.Navigator
              initialRouteName="SignIn"
              screenOptions={{ headerShown: false }}
            >

              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="Drawer" component={DrawerNavigator} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
            <Stack.Screen name="NewPassWord" component={NewPassWord} />
            </Stack.Navigator> */}
            {/* <PickPhoto /> */}
           <DrawerNavigator/>
            {/* <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassWord" component={ForgotPassWord} />
            <Stack.Screen name="NewPassWord" component={NewPassWord} /> */}
            {/* <BottomTabNavigator /> */}
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
