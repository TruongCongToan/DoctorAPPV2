import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import allAction from '../../components/redux/action/allAction'
import PropTypes from 'prop-types';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const ChuyenKhoaUserScreen = (props) => {

  let listSpecialties = props.listSpecialties
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onchange = (nativeEvent) => {
  }
  const onPressImg = (value) => {
    dispatch(allAction.specialtiesAction.addOneSpecialties(value.id))
    dispatch(allAction.clinicAction.addClinicSpecialtiesCheck("specialties"))
    navigation.navigate("Chitietchuyenkhoa")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', width: WIDTH,height:300}}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
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
                <Text style={{width:100,textAlign:'center',marginTop:20}}>{`${item.name}`}</Text>
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
ChuyenKhoaUserScreen.propTypes = {
  name: PropTypes.array
};
export default ChuyenKhoaUserScreen