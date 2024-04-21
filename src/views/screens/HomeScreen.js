import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from './CarritoProvider';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;


const HomeScreen = ({ navigation }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [categorias, setCategorias] = useState('');
  const [productos, setProductos] = useState([]);
  const { setCartItems ,setTotal} = useContext(CartContext);


  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categorias && categorias.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryId(category.id)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryId === category.id ? COLORS.primary : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{ height: 35, width: 35, resizeMode: 'cover' }}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color: COLORS.white,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const add_cart = async (item) => {
    
    Toast.show({
      type: 'success',
      text1: 'Producto agregado al carrito',
      visibilityTime:1500,
      style: {
        zIndex: 999999,
     },
     backgroundColor: 'tomato'
    });

    try {
      const carts = await AsyncStorage.getItem('carts');
      const parsedCarts = JSON.parse(carts) || [];
      let updatedCarts;
  
      // Verificar si el ítem ya está en el carrito
      const isInCart = parsedCarts.some(cartItem => cartItem.id === item.id);
  
      if (!isInCart) {
        // Si el ítem no está en el carrito, añadirlo
        const itemWithQuantity = { ...item, cantidad: 1 };
        updatedCarts = [...parsedCarts, itemWithQuantity];
      } else {
        // Si el ítem ya está en el carrito, no hacer nada
        updatedCarts = parsedCarts;
      }
  
      await AsyncStorage.setItem('carts', JSON.stringify(updatedCarts));
      setCartItems(updatedCarts); 
      var totalPrice = updatedCarts.reduce((acc, item) => acc + parseFloat(item.price * item.cantidad), 0);
      setTotal(totalPrice);
   } catch (error) {
      console.error(error);
   }
  }

  const Card = ({ food }) => {
    return (
      <View style={style.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsScreen', food)}>
          <View style={{ alignItems: 'center', top: -40 }}>
            <Image source={food.image} style={{ height: 120, width: 120 }} />
          </View>

          <View style={{ marginHorizontal: 20, top: -20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{food.name}</Text>
            <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
              {food.ingredients}
            </Text>
          </View>

        </TouchableOpacity>

        <View
          style={{
            marginTop: 0,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            ${food.price}
          </Text>
          <TouchableOpacity
            onPress={() =>add_cart(food) }>
            <View style={style.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  const filteredFoods = productos.filter(food =>
    (!selectedCategoryId || food.category_id == selectedCategoryId) &&
    food.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    setCategorias(categories)
    setProductos(foods)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

      <Toast zIndex={1000000} />

      <View style={style.header}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 28 }}>Hola,</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>
              amigo/a
            </Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>
            ¿Qué vas a pedir hoy?
          </Text>
        </View>
        {/* <Image
            source={require('../../assets/person.png')}
            style={{height: 50, width: 50, borderRadius: 25}}
          /> */}
      </View>

      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Busca tu producto..."
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </View>
      </View>

      <View>
        <ListCategories />
      </View>
      
      {productos && <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={filteredFoods}
        renderItem={({ item }) => <Card food={item} />}
      />}

      {/* </View> */}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 18,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



export default HomeScreen;
