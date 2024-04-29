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
import Carrito from './src/views/screens/Carrito';
import { CarritoProvider } from './src/views/screens/CarritoProvider';
import HomeScreen from './src/views/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <CarritoProvider>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
          <Stack.Screen name="Home" component={NavegacionHorizontal} />
          <Stack.Screen name="Favoritos" component={Favoritos} />
          <Stack.Screen name="Carrito" component={Carrito} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </CarritoProvider>
    </NavigationContainer>
  );
};

