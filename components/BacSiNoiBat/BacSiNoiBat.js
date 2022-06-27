import { View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

const images = [
  "https://cdn.pixabay.com/photo/2022/06/22/10/47/cheetah-7277665_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/08/21/09/26/dawn-6562295_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/11/22/16/45/sheeps-6816871_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/08/21/09/26/dawn-6562295_1280.jpg",
  "https://cdn.pixabay.com/photo/2021/11/22/16/45/sheeps-6816871_1280.jpg"
]

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const BacSiNoiBat = (props) => {
  let listUsers = props.listUsers

  const onchange = () => {

  }

  const onPressImg = (value) => {
    console.log("imag",value);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', width: WIDTH,height:300}}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
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
         {/* </View> */}
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default BacSiNoiBat