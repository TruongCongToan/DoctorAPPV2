import { View, Text, Image, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import BacSiNoiBat from '../BacSiNoiBat/BacSiNoiBat'
import BannerScreen from './BannerScreen'

const TableOne = (props) => {

    let listUsers = props.listUsers

    const onPressViewMore = () => {
        console.log("View More");
    }
    return (
        
        <View style={{ flex: 1 }}>

            <ScrollView>
                <View >
                    <BannerScreen />
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