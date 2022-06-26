import { View, Text, Image, TouchableOpacity,StyleSheet, FlatList, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchScreen from "../SearchScreen/SearchScreen";
import HeaderScreen from "../HeaderScreen/HeaderScreen";
import TableTwo from "../../components/TableTwo/TableTwo";
// import { Container } from "native-base";
// import { useSelector } from "react-redux";
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <HeaderScreen navigation = {navigation}/>
    <TableTwo/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
export default HomeScreen;
