import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../../consts/colors';
import { Alert } from 'react-native';
import CartCard from '../components/CartCard';
import style from '../components/Style';


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

  const removerFavorito =  (item) => {
    Alert.alert(
       '¿Quieres eliminar de favoritos este producto?',
       '',
       [
         { text: 'Cancelar', onPress: () => console.log('Cancelar presionado') },
         { text: 'Aceptar', onPress: async () => {
           // Filtrar el ítem a eliminar
           const updatedFavorites = favoriteFoods.filter(food => food.id !== item.id);
           // Actualizar el estado con la nueva lista
           setFavoriteFoods(updatedFavorites);
           try {
             // Actualizar el almacenamiento local
             await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
             // No es necesario llamar a loadFavorites aquí, ya que el estado se actualiza automáticamente
           } catch (error) {
             console.error(error);
           }
         }},
       ]
    );
  };
   
  useEffect(() => {

    loadFavorites();
  }, [favoriteFoods]);

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
        renderItem={({ item }) => <CartCard item={item} removerFavorito={() => removerFavorito(item)} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
      />
    </SafeAreaView>
  );
};


export default Favoritos;
