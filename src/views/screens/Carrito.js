import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { PrimaryButton } from '../components/Button';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from './CarritoProvider';


const Carrito = ({ navigation }) => {
  const { cartItems, setCartItems, total, setTotal } = useContext(CartContext);
  const [refreshing, setRefreshing] = useState(false);

  function sendWhatsAppMessage() {
    let messageItems = cartItems.map(item => `- ${item.name} de ${item.price}$`).join('\n');
    const totalMessage = `para un total de ${total.toFixed(2)}$`;
    const message = encodeURIComponent(`Saludos, estoy interesado en pedir lo siguiente:\n\n${messageItems}\n\n${totalMessage}`);
    const phoneNumber = "+34604156393";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;


    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  const handleRemove = async (item) => {
    const updatedCart = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, cantidad: (cartItem.cantidad > 1) ? (cartItem.cantidad - 1) : 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCart);
    try {
      await AsyncStorage.setItem('carts', JSON.stringify(updatedCart));
      const totalPrice = updatedCart.reduce((acc, item) => acc + parseFloat(item.price * item.cantidad), 0);
      setTotal(totalPrice);

    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item) => {
    const updatedCart = cartItems.map(cartItem => {
      if (cartItem.id == item.id) {
        return { ...cartItem, cantidad: cartItem.cantidad ? (cartItem.cantidad + 1) : 1 };
      }

      return cartItem;
    });
    setCartItems(updatedCart);
    const totalPrice = updatedCart.reduce((acc, item) => acc + parseFloat(item.price * item.cantidad), 0);
    setTotal(totalPrice);

    try {
      await AsyncStorage.setItem('carts', JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };


  const CartCard = ({ item }) => {

    return (
      <View style={style.cartCard}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)}>
          <Image source={item.image} style={{ height: 80, width: 80 }} />
        </TouchableOpacity>


        <View style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ fontSize: 13, color: COLORS.grey }}>{item.ingredients}</Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}> {item.cantidad} </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
          }}>

            <TouchableOpacity activeOpacity={0.8} onPress={() => { handleAdd(item) }}>
              <View style={[style.actionBtn, { marginRight: 3 }]} >
                <Icon name="add" size={25} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => { handleRemove(item) }}>
              <View style={style.actionBtn} >
                <Icon name="remove" size={25} color={COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );

  };


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadCartItems();
      setRefreshing(false);
    }, 300);
  };

  const loadCartItems = async () => {

    try {
      // await AsyncStorage.setItem('carts', JSON.stringify('')); setTotal(0)
      const cart = await AsyncStorage.getItem('carts');
      const parsedCart = JSON.parse(cart) || [];
      setCartItems(parsedCart);
      const totalPrice = parsedCart.reduce((acc, item) => acc + parseFloat(item.price * item.cantidad), 0);
      setTotal(totalPrice);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1, top: 30 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Carrito</Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={cartItems}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Precio Total
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${total.toFixed(2)} </Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <PrimaryButton title="Pagar" onPress={sendWhatsAppMessage} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};


const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 35,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});


export default Carrito;
