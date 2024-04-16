import {  StyleSheet } from 'react-native';
import COLORS from '../../consts/colors';

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


  export default style;