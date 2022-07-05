import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export const EditProfile = (props) => {
    const { navigation } = props;
    const { _id, name, address, phone, avatar, dob, email } = data;

    const [fullname, setFullname] = useState(name);
    const [location, setLocation] = useState(address);
    const [mobile, setMobile] = useState(phone);
    const [birthday, setBirthday] = useState(dob);

    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const displayTime = (time) => {
        time = new Date(time);
        return time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
    }

    const onChangeDateTime = (event, selectedDate) => {
        const currentDate = selectedDate || birthday;
        setShowDateTimePicker(false);
        setBirthday(currentDate);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chỉnh sửa thông tin</Text>
            <Text style={styles.instrution}>Thông tin sẽ được lưu cho lần mua kế tiếp </Text>
            <Text style={styles.instrution}>Bấm vào thông tin chi tiết để chỉnh sửa</Text>

            <View style={styles.formContainer}>
                <TextInput value={fullname} onChangeText={setFullname} style={styles.inputText} />
                <TextInput value={location} onChangeText={setLocation} style={styles.inputText} />

                <TextInput value={mobile} onChangeText={setMobile} style={styles.inputText} />
                <TextInput editable={true} selectTextOnFocus={true} value={displayTime(birthday)} onPressIn={() => setShowDateTimePicker(true)} style={styles.inputText} />
                {/* editable={false} selectTextOnFocus={false} */}
            </View>


            <Pressable style={styles.buttonContainer}>
                <Text style={styles.save}>Lưu thông tin</Text>
            </Pressable>

            {showDateTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(birthday)}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDateTime}
                    style={styles.datePicker}
                />
            )}
        </View>

    );
};



const styles = StyleSheet.create({
    datePicker: {
        width: '70%',
        height: '70%'
    },
    inputText: {
        height: 30,
        borderBottomColor: '#ababab',
        borderBottomWidth: 0.6,
        fontSize: 14,
        color: '#7d7b7b'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 8,
        height: 50,
        backgroundColor: '#007537',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    save: {
        color: 'white',
        textTransform: 'uppercase'
    },
    instrution: {
        fontSize: 14,
        color: '#221f1f'
    },
    formContainer: {
        marginTop: 60,
        width: '100%'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingHorizontal: 48,
        position: 'relative',
        alignItems: 'center'


    },
    title: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',

        textTransform: 'uppercase',
        marginBottom: 16,

    },
});

var data = {
    "_id": "6203fe5217995e00160b7661",
    "name": "Nguyễn Phúc Bình",
    "address": "296a An Dương Vương P.4, Q.5",
    "phone": "0589196718",
    "avatar": "",
    "dob": "2002-03-06T17:48:02.603Z",
    "email": "npb@gmail.com",
    "createdAt": "2022-02-09T17:48:02.607Z",
    "updatedAt": "2022-02-09T17:48:02.607Z",
    "__v": 0
}