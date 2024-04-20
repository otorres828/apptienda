import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CarritoProvider = ({ children }) => {
 const [cartItems, setCartItems] = useState([]);
 const [total, setTotal] = useState(0);

 useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem('carts');
        const parsedCart = JSON.parse(cart) || [];
        setCartItems(parsedCart);
        const totalPrice = parsedCart.reduce((acc, item) => acc + parseFloat(item.price * item.cantidad), 0);
        setTotal(totalPrice);
      } catch (error) {
        console.error(error);
      }
    };

    loadCartItems();
 }, []);

 return (
    <CartContext.Provider value={{ cartItems, setCartItems, total, setTotal }}>
      {children}
    </CartContext.Provider>
 );
};
