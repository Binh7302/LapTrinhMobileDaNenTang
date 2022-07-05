import React, { useContext, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native'
import { UserContext } from '../UserContext';

export const Login = (props) => {
    const { navigation } = props;
    const { onLogin } = useContext(UserContext);

    const [email, setEmail] = useState('npb@gmail.com');
    const [password, setPassword] = useState('123');

    const onLoginPress = async () => {
        const res = await onLogin(email, password);
        console.log('onLoginPress: ',res);
        if(res == false){
            ToastAndroid.show('Login failed', ToastAndroid.TOP);
        }
    }

    return (
        // <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image}
                        source={require('../../../assets/images/banner.png')} />
                </View>

                <View style={styles.plantaContainer}>
                    <Text style={styles.planta}>Planta</Text>
                </View>

                <View style={styles.sloganContainer}>
                    <Text style={styles.slogan}>Mua sắm và trải nghiệm sản phẩm cây trồng cùng phụ kiện độc đáo duy nhất tại Việt Nam</Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Email'
                        value={email}
                        onChangeText={setEmail}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword} />
                    <Pressable 
                    onPress={onLoginPress}
                    style={styles.button}>
                        <Text style={styles.login}>Login</Text>
                    </Pressable>
                </View>

                <View style={styles.registerContainer}>
                    <Text onPress={() => navigation.navigate('Register')} style={styles.register}>Register</Text>
                </View>
            </View>
        </ScrollView>
        
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },

    imageContainer: {
        width: '100%',
        height: 390
    },

    image: {
        width: '100%',
        height: '100%'
    },

    plantaContainer: {
        alignItems: 'center',
        marginTop: 20
    },

    planta: {
        color: '#007537',
        fontWeight: 'bold',
        fontSize: 35
    },

    sloganContainer: {
        paddingHorizontal: 32,
        marginTop: 8,
        alignItems: 'center'
    },

    slogan: {
        fontSize: 14,
        lineHeight: 26
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
        backgroundColor: '#7D7B7B',
        borderRadius: 8,
        marginTop: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },

    login: {
        color: 'white',
        fontWeight: '500',
        lineHeight: 22,
        fontSize: 16
    },

    registerContainer: {
        alignItems: 'center',
        marginTop: 16,
    },

    register: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
})
