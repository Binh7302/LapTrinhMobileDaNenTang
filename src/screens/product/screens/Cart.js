import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions, Modal, ToastAndroid } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ProductContext } from '../ProductContext';

const CartItems = (props) => {
    
    const {data, updateCart} = props;

    const renderItem = ({ item }) => {
        const { product, quantity, price, checked } = item;
        return (
            <View style={styles.itemContainer}>
                {/* <View style={styles.checkedContainer}>
                    {
                        checked == true ?
                            <FontAwesome name="check-square" size={24} color="black" />
                            :
                            <FontAwesome name="square-o" size={24} color="black" />
                    }

                </View> */}
                <View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMode='cover'
                        source={{ uri: product.images[0] }} />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.name}>
                        <Text>{product.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.price}>{product.price}đ</Text>
                    </View>
                    <View style={styles.quantityAction}>
                        <Text 
                        onPress={() => updateCart(product, price, quantity - 1, true)}
                        style={styles.removeAction}>-</Text>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <Text 
                        onPress={() => updateCart(product, price, quantity + 1, true)}
                        style={styles.addAction}>+</Text>
                        <Text style={styles.deleteAction}>Xóa</Text>
                    </View>
                </View>
            </View>
        )
    }
    
   
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            style={styles.flatListContainer}
            keyExtractor={item => Math.random()}
            showsVerticalScrollIndicator={false}
           
        
        />

    )
}

const CheckoutModal = (props) => {
    const {onSaveCart} = useContext(ProductContext);
    const { isShowModal, setIsShowModal } = props;

    const checkout = async () => {
        await onSaveCart();
        ToastAndroid.show('Thanh toán thành công', ToastAndroid.BOTTOM);
        setIsShowModal(false);
    }
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isShowModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.checkoutText}>Xác nhận thanh toán?</Text>
                    <Pressable onPress={checkout} style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Đồng ý</Text>
                    </Pressable>
                    <Text onPress={() => setIsShowModal(false)} style={styles.cancel}>Hủy bỏ</Text>
                </View>
            </View>
        </Modal>
    )
}

const DeleteModal = (props) => {
    const { isShowDeleteModal, setIsShowDeleteModal } = props;
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isShowDeleteModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.checkoutText}>Xác nhận xóa tất cả đơn hàng?</Text>
                    <Pressable style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Đồng ý</Text>
                    </Pressable>
                    <Text onPress={() => setIsShowDeleteModal(false)} style={styles.cancel}>Hủy</Text>
                </View>
            </View>
        </Modal>
    )
}

export const Cart = (props) => {
    const {navigation} = props;
    const { updateCart, cart} = useContext(ProductContext);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    const isShowCheckout = () => {
        const items = cart?.filter(item => item.checked == true) || [];
        let total = 0;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            total += element.quantity * element.price;
        }
        return { isShown: items.length > 0, total: total };
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Giỏ hàng</Text>
                <FontAwesome onPress={() => setIsShowDeleteModal(true)} style={styles.trash} name="trash-o" size={24} color="black" />
            </View>
            <View>
                {
                    cart.length == 0 ?
                        <View style={styles.emptyContainer}>
                            <Text style={styles.empty}>Giỏ hàng của bạn đang trống</Text>
                        </View> :
                        <CartItems data={cart} updateCart={updateCart}/>
                }
            </View>
            <View style={styles.checkoutContainer}>
                {
                    isShowCheckout().isShown == true ?
                        <>
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalText}>Tạm tính: </Text>
                                <Text style={styles.total}>{isShowCheckout().total}đ</Text>
                            </View>
                            <Pressable onPress={() => setIsShowModal(true)} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
                                <MaterialIcons style={styles.buttonIcon} name="keyboard-arrow-right" size={24} color="black" />
                            </Pressable>
                        </> : <></>
                }

            </View>
            <CheckoutModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
            <DeleteModal isShowDeleteModal={isShowDeleteModal} setIsShowDeleteModal={setIsShowDeleteModal} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative'
    },

    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        position: 'relative'
    },

    title: {
        fontSize: 16,
        textTransform: 'uppercase'
    },

    trash: {
        position: 'absolute',
        right: 24
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32
    },

    empty: {

    },

    itemContainer: {
        flexDirection: 'row',
        marginVertical: 24,
        paddingHorizontal: 24
    },

    checkedContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imageContainer: {
        width: 77,
        height: 77,
        borderRadius: 8,
        marginLeft: 16
    },

    image: {
        width: '80%',
        height: '90%'
    },

    infoContainer: {
        marginLeft: 15,
        width: '50%'
    },

    name:{
        width: 200,
        overflow: 'hidden'
    },

    price: {
        color: '#007537',
        fontSize: 16,
        marginVertical: 4
    },

    quantityAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    removeAction: {
        borderRadius: 5,
        borderWidth: 0.5,
        width: 22.5,
        height: 22.5,
        textAlign: 'center',
        lineHeight: 22.5,
        color: 'black'
    },

    quantity: {
        fontSize: 16
    },

    addAction: {
        borderRadius: 5,
        borderWidth: 0.5,
        width: 22.5,
        height: 22.5,
        textAlign: 'center',
        lineHeight: 22.5,
        color: 'black'
    },

    deleteAction: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },

    checkoutContainer: {
        paddingHorizontal: 28,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },

    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    buttonContainer: {
        height: 50,
        backgroundColor: '#007537',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 16,
        width: '100%'
    },

    totalText: {
        opacity: 0.6,
    },

    total: {
        color: 'black',
        fontWeight: 'bold'
    },

    buttonText: {
        color: 'white',
    },

    buttonIcon: {
        color: 'white',
    },

    flatListContainer: {
        maxHeight: Dimensions.get('window').height - 180,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        height: 200,
    },

    checkoutText: {
        color: '#252A31',
        fontSize: 16
    },

    checkoutButton: {
        backgroundColor: '#007537',
        height: 50,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },

    checkoutButtonText: {
        color: 'white'
    },

    cancel: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 12
    }
})

// var data = [
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d2",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: true,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d1",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 3,
//         price: 2,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d3",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 3,
//         price: 3,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d2",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d1",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 3,
//         price: 2,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d3",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 3,
//         price: 3,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d2",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 5,
//         price: 3,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d1",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 3,
//         price: 2,
//         checked: false,
//     },
//     {
//         product: {
//             "_id": "61d12f0c555401c8610fb8d3",
//             "name": "Chamaedorea costaricana Oerst.",
//             "price": 1,
//             "madein": "Russia",
//             "quantity": 4639830045,
//             "category": "61d11c4b86511f0016f490ed",
//             "images": [
//                 "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//                 "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//             ],
//             "sold": 78,
//             "size": "3XL",
//             "createdAt": "2021-07-25T08:56:22.000Z",
//             "updatedAt": "2021-08-21T13:12:26.000Z"
//         },
//         quantity: 3,
//         price: 3,
//     }
// ]