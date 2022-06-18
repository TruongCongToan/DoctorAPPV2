import React from 'react'
import CustomButton from '../CustomButton'
import { useNavigation } from '@react-navigation/native';

const SocialSignInButton = () => {

    const navigation = useNavigation();

     //onSignInWithGoogle
     const onSignInWithGoogle = () => {
        navigation.navigate("HomeTab")
    };
    //onSignInWithFacebook
    const onSignInWithFacebook = () => {
        navigation.navigate("HomeDrawer")
    };

    return (
        <>
            <CustomButton
                onPress={onSignInWithGoogle}
                text="Đăng nhập bằng Google"
                type="PRIMARY"
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />
            <CustomButton
                onPress={onSignInWithFacebook}
                text="Đăng nhập bằng Facebook"
                type="PRIMARY"
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
        </>
    )
}

export default SocialSignInButton