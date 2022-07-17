import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import allAction from '../redux/action/allAction'
import PropTypes from 'prop-types';


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


const BacSiNoiBat = (props) => {

  let listUsers = props.listUsers
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onchange = (nativeEvent) => {
  }

  const onPressImg = (value) => {
    dispatch(allAction.userAction.addUser(value.user_id))
    
    navigation.navigate("Chitietbacsi")
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
           listUsers&&listUsers.length >0 && listUsers.map((item, index) =>
              <TouchableOpacity key={index} onPress={() => onPressImg(item)}>
                <View style={{width:150,height:200,alignItems:'center',borderColor:'gray',backgroundColor:'white',marginTop:10,borderRadius:10,borderWidth:0.5, marginLeft: 20}}>
                <Image
                  key={index}
                  source={ {uri: item.image}}
                  resizeMethod='auto'
                  // HEIGHT * 0.15
                  style={{ width: 100, borderRadius:100,marginTop: 10, height: 100 }}
                />
                <Text style={{width:100,textAlign:'center',marginTop:20}}>Bác sĩ {`${item.full_name}`}</Text>
                </View>
              </TouchableOpacity>
            )
          }
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

BacSiNoiBat.propTypes = {
  name: PropTypes.array
};

export default BacSiNoiBat