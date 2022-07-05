import React, { useContext, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid, Alert } from 'react-native'
import { UserContext } from '../UserContext';

export const Register = (props) => {
    const { navigation } = props;

    const { onRegister } = useContext(UserContext);
    const [email, setEmail] = useState('pb@gmail.com');
    const [password, setPassword] = useState('123');
    const [confirmPassword, setConfirmPassword] = useState('123');

    const register = async () => {
        if(confirmPassword == password){
            const res = await onRegister(email,password);
            if(res == null){
                ToastAndroid.show('Đăng ký thành công',ToastAndroid.BOTTOM);
            }else{
                ToastAndroid.show('Tài khoản đã tồn tại',ToastAndroid.BOTTOM);
            }
        }else{
            ToastAndroid.show('Mật khẩu không trùng khớp',ToastAndroid.BOTTOM);
        }   
    }

    return (
        // <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.plantaContainer}>
                    <Text style={styles.planta}>Planta</Text>
                </View>

                <View style={styles.sloganContainer}>
                    <Text style={styles.slogan}>Mua sắm và trải nghiệm sản phẩm cây trồng cùng phụ kiện độc đáo duy nhất tại Việt Nam</Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput value={email} onChangeText={setEmail} style={styles.textInput} placeholder='Email' />
                    <TextInput value={password} onChangeText={setPassword} style={styles.textInput} placeholder='Password' secureTextEntry />
                    <TextInput value={confirmPassword} onChangeText={setConfirmPassword} style={styles.textInput} placeholder='Confirm Password' secureTextEntry />
                    <Pressable onPress={register} style={styles.button}>
                        <Text style={styles.register}>Register</Text>
                    </Pressable>
                </View>

                <View style={styles.loginContainer}>
                    <Text onPress={() => navigation.navigate('Login')} style={styles.login}>Login</Text>
                </View>
            </View>
        </ScrollView>
        // </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },


    plantaContainer: {
        alignItems: 'center',
        marginTop: 100
    },

    planta: {
        color: '#007537',
        fontWeight: 'bold',
        fontSize: 35
    },

    sloganContainer: {
        paddingHorizontal: 32,
        marginTop: 16,
        alignItems: 'center'
    },

    slogan: {
        fontSize: 14,
        lineHeight: 26,
        color: 'black'
    },


    formContainer: {
        paddingHorizontal: 32,
        marginTop: 10,
    },

    textInput: {
        height: 33,
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1.5,
        marginVertical: 4,
        lineHeight: 20
    },

    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#221F1F',
        borderRadius: 8,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    register: {
        color: 'white',
        fontWeight: '500',
        lineHeight: 22,
        fontSize: 16
    },

    loginContainer: {
        alignItems: 'center',
        marginTop: 16,
    },

    login: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
})
