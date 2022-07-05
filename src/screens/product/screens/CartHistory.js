import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

export const CartHistory = (props) => {

    const displayDay = (day) => {
        switch (day) {
            case 0:
                return 'Chủ nhật';
            case 1:
                return 'Thứ Hai';
            case 2:
                return 'Thứ Ba';
            case 3:
                return 'Thứ Tư';
            case 4:
                return 'Thứ Năm';
            case 5:
                return 'Thứ Sáu';
            case 6:
                return 'Thứ Bảy';

            default:
                break;
        }
    }

    const displayTime = (time) => {
        time = new Date(time);
        const day = displayDay(time.getDay());
        const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
        const month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
        const year = time.getFullYear();
        return `${day}, ${date}/${month}/${year}`
    }

    const renderItem = ({ item }) => {

        const { createdAt, total, products, status } = item;
        return (
            <View style={styles.cartItemContainer}>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{displayTime(createdAt)}</Text>
                </View>
                <Text style={styles.status}>Trạng thái: {status}</Text>
                <Text style={styles.products}>Tổng sản phẩm: {products.length}</Text>
                <Text style={styles.total}>Tổng tiền: {total}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lịch sử giao dịch</Text>
            <FlatList
                data={data}
                keyExtractor={item => Math.random()}
                renderItem={renderItem}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    cartItemContainer: {
        marginTop: 16
    },
    products: {
        color: '#000',
        fontSize: 14,
    },
    status: {
        color: '#007537',
        fontSize: 16,
    },
    dateContainer: {
        borderBottomColor: '#7d7b7b',
        borderBottomWidth: 0.5
    },
    date: {
        color: '#221f1f',
        fontSize: 16,

    },
    total: {
        color: '#000',
        fontSize: 14,
    },
    title: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',

        textTransform: 'uppercase',
        marginBottom: 16,

    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 32,
        paddingHorizontal: 48,
        position: 'relative',
        alignItems: 'center'


    },
});

var data = [
    {
        "_id": "6204c9c29ee56800161aa231",
        "user": "61e67fd3dd985800162962c9",
        "status": "Đã giao hàng",
        "total": 13,
        "products": [
            {
                "_id": "6204c9c29ee56800161aa232",
                "product": "61d12f0c555401c8610fb8d1",
                "quantity": 2,
                "price": 1
            },
            {
                "_id": "6204c9c29ee56800161aa233",
                "product": "61d12f0c555401c8610fb8d2",
                "quantity": 2,
                "price": 1
            },
            {
                "_id": "6204c9c29ee56800161aa234",
                "product": "61d12f0c555401c8610fb8d3",
                "quantity": 3,
                "price": 3
            }
        ],
        "createdAt": "2022-02-08T08:16:02.517Z",
        "updatedAt": "2022-02-10T08:16:02.517Z"
    },
    {
        "_id": "6204c9c29ee56800161aa231",
        "user": "61e67fd3dd985800162962c9",
        "status": "Đang xử lý",
        "total": 21,
        "products": [
            {
                "_id": "6204c9c29ee56800161aa232",
                "product": "61d12f0c555401c8610fb8d1",
                "quantity": 4,
                "price": 2
            },
            {
                "_id": "6204c9c29ee56800161aa233",
                "product": "61d12f0c555401c8610fb8d2",
                "quantity": 3,
                "price": 1
            },
            {
                "_id": "6204c9c29ee56800161aa234",
                "product": "61d12f0c555401c8610fb8d3",
                "quantity": 2,
                "price": 5
            }
        ],
        "createdAt": "2022-02-12T08:16:02.517Z",
        "updatedAt": "2022-02-14T08:16:02.517Z"
    },
    
]