import { View, Text, Image, ScrollView, RefreshControl, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import BacSiNoiBat from '../BacSiNoiBat/BacSiNoiBat'
import BannerScreen from './BannerScreen'

const TableOne = (props) => {

    let listUsers = props.listUsers
    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const onPressViewMore = () => {
        console.log("View More");
    }
    return (

        <View style={{ flex: 1 }}>

            <ScrollView
                // contentContainerStyle= {styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
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
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });
export default TableOne