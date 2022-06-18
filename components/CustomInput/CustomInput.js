import { Text, TextInput, View, StyleSheet } from 'react-native'
import React from 'react';

const CustomInput = ({ value, setValue, placeholder,secureTextEntry }) => {

    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
            />

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    

    },
    input: {

    }
})

export default CustomInput