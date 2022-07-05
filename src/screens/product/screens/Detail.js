import { StyleSheet, Text, View, Image, Pressable, ToastAndroid } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import PagerView from 'react-native-pager-view';
import { ProductContext } from '../ProductContext';

const PartialView = (props) => {
    const {product} = props;
    const { price, size, madein, quantity, _id } = product;
    const {getCart, updateCart} = useContext(ProductContext);

    const getQuantity = () =>{
        if(getCart().length == 0){
            return 0;
        }
        let item = getCart().filter(i => i.product._id == product._id);
        if (item.length == 0) {
            return 0;
        }
        return item[0].quantity;
    }

    const [number, setNumber] = useState(getQuantity());
    const onNumberChange = (isAdd) => {
        if (isAdd == true) {
            if (number < 5 ) {
                setNumber(number + 1);
            } else {
                setNumber(number)
            }
            
        } else if (isAdd == false && number >= 1) {
            setNumber(number - 1);
        }
    }

    const onUpdateCart = () => {
        updateCart(product, price, number, true);
        ToastAndroid.show('Thêm sản phẩm thành công', ToastAndroid.BOTTOM);
    } 

    return (
        <>
            <View style={styles.productInfoContainer}>
                <Text style={styles.productPrice}>{price}đ</Text>
                <Text style={styles.productTitle}>Chi tiết sản phẩm</Text>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Kích cỡ</Text>
                    <Text style={styles.productDetailText}>{size}</Text>
                </View>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Xuất xứ</Text>
                    <Text style={styles.productDetailText}>{madein}</Text>
                </View>
                <View style={styles.productDetail}>
                    <Text style={styles.productDetailText}>Tình trạng</Text>
                    <Text style={styles.productDetailText}>Còn {quantity} sp</Text>
                </View>
            </View>
            <View style={styles.cartProcessContainer}>
                <View style={styles.processQuantity}>
                    <Text style={styles.quantityText}>Đã chọn {number} sản phẩm</Text>
                    <View style={styles.quantityAction}>
                        <Text onPress={() => onNumberChange(false)} style={styles.removeAction}>-</Text>
                        <Text style={styles.quantity}>{number}</Text>
                        <Text onPress={() => onNumberChange(true)} style={styles.addAction}>+</Text>
                    </View>
                </View>
                <View style={styles.processTotal}>
                    <Text style={styles.totalText}>Tạm tính</Text>
                    <Text style={styles.total}>{number * price}đ</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={onUpdateCart} style={[styles.button, number > 0 ? styles.changeBackgroundColor : null]}>
                    <Text style={styles.buttonText}>Chọn mua</Text>
                </Pressable>
            </View>
        </>
    )
}

export const Detail = (props) => {
    const { navigation, route: { params: { idPro } } } = props;

    const { onGetProductDetail } = useContext(ProductContext);
    const [product, setProduct] = useState(null);
    useEffect(async () => {
        const res = await onGetProductDetail(idPro);
        setProduct(res);
        return () => {
            res;
        }
    }, [])
    //Check có sản phẩm hay ko - cách check lỗi
    if(!product){
        return (<></>)
    }


    const { name, images, price, size, madein, quantity } = product;

    return (
        <View style={styles.container}>
            <View style={styles.productNameContainer}>
                <Text style={styles.productName}>{name}</Text>
            </View>
            <View style={styles.productImagesContainer}>
                <PagerView style={styles.productImagesPager}
                    initialPage={0} orientation='horizontal'>
                    {
                        images.map(img =>
                            <Image key={Math.random()}
                                source={{ uri: img }}
                                style={styles.productImage}
                                resizeMode='cover' />
                        )
                    }
                </PagerView>
            </View>
            <PartialView product={product} />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white',

    },

    productNameContainer: {
        alignItems: 'center',
        height: 55,
        justifyContent: 'center',

    },

    productName: {
        fontSize: 16,
        fontWeight: '500',

    },

    productImagesContainer: {
        width: '100%',
        height: 270,
    },

    productImagesPager: {
        flex: 1,
    },

    productImage: {
        width: '100%',
        height: '100%',

    },

    productInfoContainer: {
        paddingHorizontal: 48,
        paddingVertical: 32,

    },

    productPrice: {
        fontSize: 24,
        fontWeight: '500',
        color: '#007537',
    },

    productTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#3A3A3A',
        marginTop: 15,
        borderBottomColor: '#221F1F',
        borderBottomWidth: 0.5,
    },
    productDetail: {
        borderBottomColor: '#221F1F',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },

    productDetailText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3A3A3A'
    },

    cartProcessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,

    },

    processQuantity: {

    },

    quantityText: {
        fontSize: 14,
        opacity: 0.6,
        marginBottom: 4
    },

    quantityAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    removeAction: {
        borderRadius: 5,
        borderWidth: 0.5,
        width: 27.5,
        height: 27.5,
        textAlign: 'center',
        lineHeight: 25.5,
        color: 'black'
    },

    quantity: {
        fontSize: 18
    },

    addAction: {
        borderRadius: 5,
        borderWidth: 0.5,
        width: 27.5,
        height: 27.5,
        textAlign: 'center',
        lineHeight: 25.5,
        color: 'black'
    },

    processTotal: {

    },

    totalText: {
        color: 'black',
        opacity: 0.6
    },

    total: {
        marginTop: 4,
        textAlign: 'right',
        fontSize: 24,
        fontWeight: '500'
    },

    buttonContainer: {
        paddingHorizontal: 24,
        height: 50,
        marginTop: 16,

    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ABABAB',
        height: '100%',
        borderRadius: 8

    },

    buttonText: {
        fontSize: 16,
        color: 'white',
        textTransform: 'uppercase'
    },

    changeBackgroundColor: {
        backgroundColor: '#007537',
    }

});

// var product = {
//     "sold": 90,
//     "images": [
//         "https://2.pik.vn/2022764d0cef-ffb4-4dee-a1a6-f4c0ce35fa17.jpg",
//         "https://2.pik.vn/2022b3b441fd-3346-4e00-b45a-3cfe53cce7cd.jpg"
//     ],
//     "_id": "61d12d14555401c8610cfa3b",
//     "name": "Eucalyptus delegatensis R.T. Baker",
//     "price": 2,
//     "madein": "Indonesia",
//     "quantity": 3801758691,
//     "category": "61d11bf386511f0016f490c9",
//     "size": "3XL",
//     "createdAt": "2021-03-25T23:21:45.000Z",
//     "updatedAt": "2021-10-07T08:02:19.000Z"
// }