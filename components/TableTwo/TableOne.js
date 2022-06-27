import { View, Text, Image, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import BacSiNoiBat from '../BacSiNoiBat/BacSiNoiBat'

const TableOne = (props) => {

    let listUsers = props.listUsers

    const onPressViewMore = () => {
        console.log("View More");
    }
    return (
        <View style={{ flex: 1 }}>

            <ScrollView>
                <View >
                    <ImageBackground
                        source={{
                            uri: "https://cdn.pixabay.com/photo/2021/07/18/14/59/family-6475821_1280.jpg"
                        }}
                        resizeMethod='auto'
                        style={{ flex: 1, justifyContent: "center",width:'100%',height:400 }}
                    >
                        {/* <ImageBackground
                        source={{ uri :linear-gradient(rgba(0, 0, 0, 0.25),rgba(255, 255, 255, 0.1))}}
                        >

                        </ImageBackground> */}
                       {/* <View style={{flexDirection:'row-reverse',justifyContent:'center',alignItems:'center'}}>
                       <View style ={{width:50,height:50,backgroundColor:'white'}}>
                            <Text></Text>
                        </View>
                        <View style ={{width:50,height:50,marginRight:30,backgroundColor:'white'}}>
                            <Text></Text>
                        </View>
                        <View style ={{width:50,height:50,marginRight:30,backgroundColor:'white'}}>
                            <Text></Text>
                        </View>
                       </View> */}
                    </ImageBackground>
                </View>

                <View style={{ borderWidth: 0.3, borderColor: 'gray', height: 300, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: "600", margin: 10 }}>Các bác sĩ nổi bật</Text>
                        <Text style={{ fontSize: 15, fontWeight: "600", margin: 10, color: '#2584ff', marginLeft: '40%' }} onPress={onPressViewMore}>Xem thêm</Text>
                    </View>
                    <BacSiNoiBat listUsers={listUsers} />
                </View>
            </ScrollView>
        </View>
    )
}

export default TableOne