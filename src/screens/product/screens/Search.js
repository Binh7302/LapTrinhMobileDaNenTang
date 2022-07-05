import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet, Text, View,
    FlatList, Image, TextInput, Pressable
} from 'react-native'
import { ProductContext } from '../ProductContext';

export const Search = (props) => {
    const { navigation } = props;
    const { onSearch } = useContext(ProductContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    //tự động chạy khi component đc gọi
    useEffect(async () => {
        setIsLoading(true);
        const res = await onSearch(setSearch);
        setData(res);
        setIsLoading(false);
        return () => {
            res;
        }
    }, []);

    const renderItem = ({ item }) => {
        const { name, quantity, price, images, _id } = item;
        return (
            <Pressable onPress={() => navigation.navigate('Detail', { id: _id })} style={styles.productContainer}>
                <View style={styles.productImageContainer}>
                    <Image style={styles.productImage}
                        source={{ uri: images[0] }} resizeMode='cover' />
                </View>
                <View style={styles.productInfoContainer}>
                    <Text style={styles.productName} numberOfLines={1}>{name}</Text>
                    <Text style={styles.productPrice}>{price}đ</Text>
                    <Text style={styles.productQuantity} numberOfLines={1}>Còn lại: {quantity} sp</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.textSearchContainer}>
                <Text style={styles.textSearch}>Tìm kiếm</Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput} placeholder='Từ khóa tìm kiếm'>{search}</TextInput>
                <View style={styles.searchIcon}>
                    <Image source={require('../../../assets/images/search.png')} />
                </View>
            </View>
            {
                isLoading == true ?
                    <Text>Đang tải dữ liệu</Text> :
                    <FlatList data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                    />
            }
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',
        paddingTop: 18,
        paddingBottom: 120,
        paddingHorizontal: 48
    },

    //Search

    textSearchContainer: {
        alignItems: 'center',

    },

    textSearch: {
        fontSize: 16,
        fontWeight: '500',
        textTransform: 'uppercase',
        lineHeight: 55
    },

    textInputContainer: {
        height: 40,
        position: 'relative',

    },

    textInput: {
        width: '100%',
        height: '100%',
        borderBottomColor: '#221F1F',
        borderBottomWidth: 1.5,
        fontSize: 15,
        paddingRight: 30
    },

    searchIcon: {
        position: 'absolute',
        right: 0,
        top: 8
    },

    //Products

    productContainer: {

        flexDirection: 'row',
        paddingTop: 24
    },

    productImageContainer: {
        width: 77,
        height: 77,
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        justifyContent: 'center'
    },

    productImage: {
        width: '80%',
        height: '80%'
    },

    productInfoContainer: {
        marginLeft: 15,
    },

    productName: {
        fontSize: 16

    },

    productPrice: {
        fontSize: 16
    },

    productQuantity: {
        fontSize: 14
    }
})

// var data = [
//     {
//         "sold": 73,
//         "images": [
//             "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//             "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//         ],
//         "_id": "61d12d14555401c8610cfa3a1",
//         "name": "Lygeum Loefl. ex L.",
//         "price": 3,
//         "madein": "Mexico",
//         "quantity": 3781040078,
//         "category": "61d11bf386511f0016f490c9",
//         "size": "2XL",
//         "createdAt": "2021-11-18T02:13:41.000Z",
//         "updatedAt": "2021-12-21T06:00:50.000Z"
//     },
//     {
//         "sold": 73,
//         "images": [
//             "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//             "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//         ],
//         "_id": "61d12d14555401c8610cfa3a2",
//         "name": "Lygeum Loefl. ex L.",
//         "price": 3,
//         "madein": "Mexico",
//         "quantity": 3781040078,
//         "category": "61d11bf386511f0016f490c9",
//         "size": "2XL",
//         "createdAt": "2021-11-18T02:13:41.000Z",
//         "updatedAt": "2021-12-21T06:00:50.000Z"
//     },
//     {
//         "sold": 73,
//         "images": [
//             "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//             "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//         ],
//         "_id": "61d12d14555401c8610cfa3a3",
//         "name": "Lygeum Loefl. ex L.",
//         "price": 3,
//         "madein": "Mexico",
//         "quantity": 3781040078,
//         "category": "61d11bf386511f0016f490c9",
//         "size": "2XL",
//         "createdAt": "2021-11-18T02:13:41.000Z",
//         "updatedAt": "2021-12-21T06:00:50.000Z"
//     },
//     {
//         "sold": 73,
//         "images": [
//             "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//             "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//         ],
//         "_id": "61d12d14555401c8610cfa3a4",
//         "name": "Lygeum Loefl. ex L.",
//         "price": 3,
//         "madein": "Mexico",
//         "quantity": 3781040078,
//         "category": "61d11bf386511f0016f490c9",
//         "size": "2XL",
//         "createdAt": "2021-11-18T02:13:41.000Z",
//         "updatedAt": "2021-12-21T06:00:50.000Z"
//     },
//     {
//         "sold": 73,
//         "images": [
//             "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//             "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//         ],
//         "_id": "61d12d14555401c8610cfa3a5",
//         "name": "Lygeum Loefl. ex L.",
//         "price": 3,
//         "madein": "Mexico",
//         "quantity": 3781040078,
//         "category": "61d11bf386511f0016f490c9",
//         "size": "2XL",
//         "createdAt": "2021-11-18T02:13:41.000Z",
//         "updatedAt": "2021-12-21T06:00:50.000Z"
//     },
//     {
//         "sold": 73,
//         "images": [
//             "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//             "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//         ],
//         "_id": "61d12d14555401c8610cfa3a6",
//         "name": "Lygeum Loefl. ex L.",
//         "price": 3,
//         "madein": "Mexico",
//         "quantity": 3781040078,
//         "category": "61d11bf386511f0016f490c9",
//         "size": "2XL",
//         "createdAt": "2021-11-18T02:13:41.000Z",
//         "updatedAt": "2021-12-21T06:00:50.000Z"
//     },
//     {
//         "sold": 73,
//         "images": [
//             "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//             "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//         ],
//         "_id": "61d12d14555401c8610cfa3a7",
//         "name": "Lygeum Loefl. ex L.",
//         "price": 3,
//         "madein": "Mexico",
//         "quantity": 3781040078,
//         "category": "61d11bf386511f0016f490c9",
//         "size": "2XL",
//         "createdAt": "2021-11-18T02:13:41.000Z",
//         "updatedAt": "2021-12-21T06:00:50.000Z"
//     },
//     {
//         "sold": 73,
//         "images": [
//             "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//             "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//         ],
//         "_id": "61d12d14555401c8610cfa3a8",
//         "name": "Lygeum Loefl. ex L.",
//         "price": 3,
//         "madein": "Mexico",
//         "quantity": 3781040078,
//         "category": "61d11bf386511f0016f490c9",
//         "size": "2XL",
//         "createdAt": "2021-11-18T02:13:41.000Z",
//         "updatedAt": "2021-12-21T06:00:50.000Z"
//     }
// ]
