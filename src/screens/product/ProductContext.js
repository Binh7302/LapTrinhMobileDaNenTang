import React, { useState, createContext } from 'react';
import { getProductForHomePage, getProductDetail, saveCart, search } from './ProductService';

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props;

    const [cart, setCart] = useState([]);

    const updateCart = (product, price, quantity, checked) => {
        let _cart = cart;
        quantity = quantity > 5 ? 5 : quantity;
        if (_cart.length == 0) {
            //giỏ hàng rỗng
            _cart.push({ product, price, quantity, checked });
        } else {
            let item = _cart.filter(i => i.product._id == product._id);
            if (item.length == 0) {
                //không có sản phẩm này trog giỏ hàng
                _cart.push({ product, price, quantity, checked });
            } else {
                //có sản phẩm trong giỏ hàng
                if (quantity == 0) {
                    _cart = _cart.filter(i => i.product._id != product._id);
                } else {
                    _cart = _cart.map(item => {
                        if (item.product._id == product._id) {
                            item.quantity = quantity;
                        }
                        return item;
                    });
                }
            }
        }
        setCart([..._cart]);
    }


    const getCart = () => cart;

    const deleteCart = () => setCart([...[]]);

    const onGetProductForHomePage = async () => {
        try {
            const res = await getProductForHomePage();
            if (res.error == false) {
                return res.data;
            }

        } catch (error) {
            console.log('onGetProductForHomePage error: ', error)
        }
        return [];
    }

    const onGetProductDetail = async (id) => {
        try {
            const res = await getProductDetail(id);
            if (res.error == false) {
                return res.data;
            }
        } catch (error) {
            console.log('onGetProductDetail eror: ', error)
        }
        return null;
    }

    const onSaveCart = async () => {
        try {
            let total = 0;
            let products = [];
            for (let index = 0; index < cart.length; index++) {
                const element = cart[index];
                total += element.quantity * element.price;
                products.push({
                    product: element.product._id,
                    quantity: element.quantity,
                    price: element.price
                })
            }
            await saveCart({ total, products });
            setCart([...[]]);

        } catch (error) {
            console.log('onSaveCart: ', error);
        }
    }

    const onSearch = async (name) => {
        try {
            const res = await search(name);
            if(res.error == false){
                return res.data;
            }
        } catch (error) {
            console.log('onSearch: ', error);
        }
        return [];
    }

    return (
        <ProductContext.Provider
            value={{
                onGetProductForHomePage, onGetProductDetail, updateCart, getCart, deleteCart, cart, onSaveCart, onSearch
            }}>
            {children}
        </ProductContext.Provider>
    )
}




