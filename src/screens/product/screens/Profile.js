import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

export const Profile = (props) => {
    const { navigation } = props;
    const { _id, name, address, phone, avatar, dob, email } = data;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <View style={styles.infoContainer}>
                <View style={styles.avatarContainer}>
                    {
                        avatar.trim().length == 0 ?
                            <FontAwesome name="user-circle" size={24} style={styles.avatar} color="black" />
                            : <Image source={{ uri: avatar }} resizeMode='cover' style={styles.avatar} />
                    }

                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text numberOfLines={1} style={styles.email}>{email}</Text>
                </View>
            </View>
            <View style={styles.actionContainer}>
                <View style={styles.actionTitleContainer}>
                    <Text style={styles.actionTitle}>Chung</Text>
                </View>

                <Text onPress={() => navigation.navigate('EditProfile')} style={styles.action}>Chỉnh sửa thông tin</Text>
                <Text onPress={() => navigation.navigate('CartHistory')} style={styles.action}>Lịch sử giao dịch</Text>
                <View style={styles.actionTitleContainer}>
                    <Text style={styles.actionTitle}>Ứng dụng</Text>
                </View>

                <Text style={[styles.action, styles.logout]}>Đăng xuất</Text>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    logout:{
        color: '#ff0000'
    },
    action: {
        marginTop: 15
    },
    actionContainer: {
        marginTop: 32
    },
    actionTitleContainer:{
        borderBottomColor: '#ababab',
        borderBottomWidth: 1,
    },
    actionTitle: {
        color: '#7f7f7f',
        fontSize: 16,
        marginTop: 16
        
    },
    title: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',

        textTransform: 'uppercase'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
        alignItems: 'center'
    },
    nameContainer: {
        marginLeft: 26
    },
    name: {
        fontSize: 16,
    },
    email: {
        fontSize: 14,
        color: '#7f7f7f'
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,


    },
    avatar: {
        width: '80%',
        height: '80%',
        borderRadius: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingHorizontal: 48,
    }
})

var data =  {
    "_id": "6203fe5217995e00160b7661",
    "name": "Nguyễn Phúc Bình",
    "address": "296a An Dương Vương P.4, Q.5",
    "phone": "0589196718",
    "avatar": "",
    "dob": "2022-02-09T17:48:02.603Z",
    "email": "npb@gmail.com",
    "createdAt": "2022-02-09T17:48:02.607Z",
    "updatedAt": "2022-02-09T17:48:02.607Z",
    "__v": 0
}