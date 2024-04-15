import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from './src/views/screens/DetailsScreen';
import NavegacionHorizontal from './src/views/navigation/NavegacionHorizontal';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import { createStackNavigator } from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import { StatusBar } from 'expo-status-bar';
import Favoritos from './src/views/screens/Favoritos';
import CartScreen from './src/views/screens/CartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="Home" component={NavegacionHorizontal} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
        <Stack.Screen name="Carrito" component={CartScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

