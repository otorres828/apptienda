import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { SecondaryButton } from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;
  const [isItemFavorite, setIsItemFavorite] = React.useState(false);

  React.useEffect(() => {
    const checkFavorite = async () => {
      const result = await isFavorite(item);
      setIsItemFavorite(result);
    };

    checkFavorite();
  }, [item]);

  const saveFavorite = async (item) => {
    try {
       const favorites = await AsyncStorage.getItem('favorites');
       const parsedFavorites = JSON.parse(favorites) || [];
       let updatedFavorites;
   
       // Verificar si el ítem ya está en favoritos
       const isFavorite = parsedFavorites.some(favorite => favorite.id == item.id);
   
       if (isFavorite) {
         // Si el ítem ya está en favoritos, eliminarlo
         updatedFavorites = parsedFavorites.filter(favorite => favorite.id !== item.id);
       } else {
         // Si no está en favoritos, añadirlo
         updatedFavorites = [...parsedFavorites, item];
       }
   
       await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
       setIsItemFavorite(!isFavorite); // Actualizar el estado local
    } catch (error) {
       console.error(error);
    }
   };

   
  const isFavorite = async (item) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = JSON.parse(favorites) || [];
      return parsedFavorites.some(favorite => favorite.id === item.id);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, top: 30 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Detalles del producto</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={item.image} style={{ height: 220, width: 220 }} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>
              {item.name}
            </Text>
            <View style={[style.iconContainer, { backgroundColor: isItemFavorite ? COLORS.white : COLORS.primary }]}>
              <Icon
                name="favorite-border"
                color={isItemFavorite ? COLORS.primary : COLORS.white}
                size={25}
                onPress={() => {
                  saveFavorite(item);
                  setIsItemFavorite(!isItemFavorite);
                }}
              />
            </View>

          </View>
          <Text style={style.detailsText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title="Añadir al Carrito"
              onPress={() => navigation.navigate('Carrito')}
            />
          </View>
        </View>
      </ScrollView>
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
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
});

export default DetailsScreen;
