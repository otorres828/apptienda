import React, { useState } from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import {PrimaryButton} from '../components/Button';

const HomeDetalle = ({navigation}) => {
 return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white, top: 30}}>
      <View style={style.textContainer}>
        <Text style={style.welcomeText}>
          ¡Bienvenido a{"\n"} Delicius Cake!
        </Text>
        <Text style={style.descriptionText}>
          Nos enorgullece ofrecerte una variedad exquisita de pasteles, tartas y postres, todos hechos con los ingredientes más frescos y de calidad. Nuestra pastelería se encuentra en Via Julia 17, donde nos esforzamos por crear experiencias culinarias inolvidables.
        </Text>
        <Text style={style.scheduleText}>
          Horario de Atención:
          Lunes a Viernes: 9:00 AM - 8:00 PM
          Sábados y Domingos: 10:00 AM - 6:00 PM
        </Text>
        <Text style={style.visitText}>
          Visítanos:
          Te esperamos en Delicius Cake para que disfrutes de nuestros deliciosos productos. No esperes más para deleitarte con nuestras creaciones únicas.
        </Text>
      </View>
    </SafeAreaView>
 );
};

const style = StyleSheet.create({
 textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
 },
 welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
 },
 descriptionText: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
 },
 scheduleText: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
 },
 visitText: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
 },
});

export default HomeDetalle;
