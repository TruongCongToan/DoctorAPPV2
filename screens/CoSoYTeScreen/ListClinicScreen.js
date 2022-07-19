import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, ScrollView,  Alert, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import allAction from '../../components/redux/action/allAction'
import PropTypes from 'prop-types';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const ListClinicScreen = (props) => {

  let listSpecialties = props.listClinic

  console.log("gia tri clinic lenght ",listSpecialties.length);
  const navigation = useNavigation();

  const dispatch = useDispatch(); 

  const onchange = (nativeEvent) => {
  }
  const onPressImg = (value) => {
    dispatch(allAction.clinicAction.addOneClinic(value.id));
    navigation.navigate("ChitietCSYT");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', width: WIDTH,height:300}}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            width: WIDTH, height: HEIGHT * 0.25
          }}
        >
         {
           listSpecialties&&listSpecialties.length >0 && listSpecialties.map((item, index) =>
              <TouchableOpacity key={index} onPress={() => onPressImg(item)}>
                <View style={{width:200,height:200,alignItems:'center',borderColor:'gray',backgroundColor:'white',marginTop:10,borderRadius:10,borderWidth:0.5, marginLeft: 20}}>
                <Image
                  key={index}
                  source={ {uri: item.image}}
                  resizeMethod='auto'
                  // HEIGHT * 0.15
                  style={{ width: '100%', height: 150 ,borderRadius:10}}
                />
                <Text style={{width:170,textAlign:'center',marginTop:12}}>{`${item.name}`}</Text>
                </View>
              </TouchableOpacity>
            )
          }
         {/* </View> */}
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}
ListClinicScreen.propTypes = {
  name: PropTypes.array
};
export default ListClinicScreen