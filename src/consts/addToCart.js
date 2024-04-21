import { useContext } from "react";
import { CartContext } from "../views/screens/CarritoProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear un hook personalizado para manejar la adición de elementos al carrito
const useAddToCart = () => {
 const { setCartItems, setTotal } = useContext(CartContext);

 const addToCart = async (item) => {
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
 };

 return addToCart;
};

export default useAddToCart;
