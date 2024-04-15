import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../consts/colors';

const Favoritos = ({ navigation }) => {
  const [favoriteFoods, setFavoriteFoods] = useState([]);

  const loadFavorites = async () => {
    
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = JSON.parse(favorites) || [];
      setFavoriteFoods(parsedFavorites);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    loadFavorites();
  }, [favoriteFoods]);

  const CartCard = ({ item,loadFavorites }) => {
    const handleRemove = async () => {
      // Filtrar el ítem a eliminar
      const updatedFavorites = favoriteFoods.filter(food => food.id !== item.id);
      // Actualizar el estado con la nueva lista
      setFavoriteFoods(updatedFavorites);
      // Actualizar el almacenamiento local
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        loadFavorites()
      } catch (error) {
        console.error(error);
      }
    };


    return (
      <View style={style.cartCard}>
        <Image source={item.image} style={{ height: 80, width: 80 }} />
        <View onPress={() => navigation.navigate('DetailsScreen', item)}
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>
            {item.ingredients}
          </Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <View style={style.actionBtn} onPress={()=>{handleRemove}}>
            <IconFontAwesome name="trash" size={20} color={COLORS.white} />
          </View>

        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1, top: 30 }}>
      <View style={style.header}>
        <IconMaterialIcons name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Favoritos</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => (item.id + Math.floor((Math.random() * (10000 - 1 + 1)) + 1))}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={favoriteFoods}
        renderItem={({ item }) => <CartCard item={item} loadFavorites={loadFavorites} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
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
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    padding: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Favoritos;
