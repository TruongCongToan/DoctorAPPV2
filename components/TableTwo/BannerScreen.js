import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";


export default function BannerScreen() {
    return (
        <View style={styles.container}>

            <ImageBackground
                source={{
                    uri: "https://cdn.pixabay.com/photo/2021/07/18/14/59/family-6475821_1280.jpg"
                }}
                resizeMethod='resize'
                style={{ flex: 1, justifyContent: "center", width: '100%', height: 500 }}
            >
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)', 'transparent']}
                    start={[0.1, 0.6]}
                    end={[0.1, 0.2]}

                    style={styles.background}
                >
                    <Text style={{position:'absolute',top:'10%',fontSize:27,fontWeight:'600',color:'#fff',textAlign:'center',shadowColor:'gray'}}>NỀN TẢNG Y TẾ
                        CHĂM SÓC SỨC KHỎE TOÀN DIỆN</Text>
                    <View style={{ marginTop: '65%' }}>
                        <View style={styles.HeaderBound}>
                            <TouchableOpacity>
                                <View style={styles.btnBound}>
                                    <View style={styles.btnHeader}>
                                        <FontAwesome5
                                            name="hospital-alt"
                                            size={30}
                                            color="#0092c5"
                                            style={{
                                                position: 'absolute',
                                                left: 15,
                                                top: 10
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.text}>Khám chuyên khoa</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.btnBound}>
                                    <View style={styles.btnHeader}>
                                        <FontAwesome5
                                            name="mobile-alt"
                                            size={34}
                                            color="#0092c5"
                                            style={{
                                                position: 'absolute',
                                                left: 20,
                                                top: 10
                                            }}
                                        />
                                    </View>
                                    <Text style={{ textAlign: 'center', height: 50, width: 100, fontWeight: '600' }}>Khám từ xa</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.btnBound}>
                                    <View style={styles.btnHeader}>
                                        <FontAwesome5
                                            name="hand-holding-medical"
                                            size={30}
                                            color="#0092c5"
                                            style={{
                                                position: 'absolute',
                                                left: 15,
                                                top: 10
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.text}>Khám tổng quát</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.HeaderBound]}>
                            <TouchableOpacity>
                                <View style={styles.btnBound}>
                                    <View style={styles.btnHeader}>
                                        <Fontisto
                                            name="blood-test"
                                            size={30}
                                            color="#0092c5"
                                            style={{
                                                position: 'absolute',
                                                left: 15,
                                                top: 15
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.text}>Xét nghiệm y học</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.btnBound}>
                                    <View style={styles.btnHeader}>
                                        <FontAwesome5
                                            name="head-side-virus"
                                            size={34}
                                            color="#0092c5"
                                            style={{
                                                position: 'absolute',
                                                left: 15,
                                                top: 10
                                            }}
                                        />
                                    </View>
                                    <Text style={{ textAlign: 'center', height: 50, width: 100, fontWeight: '600', marginRight: 10 }}>Khám sức khoẻ tinh thần</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.btnBound}>
                                    <View style={styles.btnHeader}>
                                        <FontAwesome5
                                            name="tooth"
                                            size={30}
                                            color="#0092c5"
                                            style={{
                                                position: 'absolute',
                                                left: 17,
                                                top: 15
                                            }}
                                        />
                                    </View>
                                    <Text style={styles.text}>Khám nha khoa</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ width: '100%', height: 100 }}>

                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 500,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent:'center'
    },
    HeaderBound: {
        flexDirection: 'row', width: '100%', height: 100, backgroundColor: 'transparent', justifyContent: 'center', marginTop: 30
    },
    btnHeader: {
        height: 60, backgroundColor: 'white', width: 60, marginLeft: 20, marginTop: 30, borderRadius: 100, justifyContent: 'center'
    },
    text: {
        textAlign: 'center', height: 50, width: 100, fontWeight: '600'
    },
    btnBound: {
        flexDirection: 'column', justifyContent: 'center'
    }
});
