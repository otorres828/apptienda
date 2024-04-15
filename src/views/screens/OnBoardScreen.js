import React, { useState } from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import {PrimaryButton} from '../components/Button';

const OnBoardScreen = ({navigation}) => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const data = [
  //    {
  //      title: 'Delicious Cake',
  //      description: 'Te escuchamos para encontrar mejor y deliciosos postres',
  //      image: require('../../assets/home.jpg'),
  //    },
  //    {
  //      title: 'New Title',
  //      description: 'New Description',
  //      image: require('../../assets/malteada.jpg'),
  //    },
  // ];
 
  // const handleScroll = (event) => {
  //    const scrollPosition = event.nativeEvent.contentOffset.x;
  //    const index = Math.round(scrollPosition / event.nativeEvent.layoutMeasurement.width);
  //    setCurrentIndex(index);
  // };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{height: 400}}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            top: -80,
          }}
          source={require('../../assets/home.jpg')}
        />
        
      </View>
      
      
      <View style={style.textContainer}>
        <View>
          <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>
            Delicious Cake
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center',
              color: COLORS.grey,
            }}>
            Te escuchamos para encontrar mejor y deliciosos postres
          </Text>
        </View>
        {/* <View style={style.indicatorContainer}>
          <View style={style.currentIndicator} />
          <View style={style.indicator} />
          <View style={style.indicator} />
        </View> */}
        <PrimaryButton
          onPress={() => navigation.navigate('Home')}
          title="Inicio"
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;
