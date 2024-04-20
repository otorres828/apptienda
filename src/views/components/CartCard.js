

import COLORS from '../../consts/colors';
import React from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Image } from 'react-native';
import style from './Style';
import { TouchableOpacity } from 'react-native';
import { PrimaryButton } from './Button'

export function CartCard({ navigation, item, removerFavorito }) {

    return (
        <View style={style.cartCard}>

            <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)}>
                <Image source={item.image} style={{ height: 80, width: 80 }} />
            </TouchableOpacity>
            <View
                style={{
                    height: 100,
                    marginLeft: 10,
                    paddingVertical: 20,
                    flex: 1,
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)}>

                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.grey }}>
                        {item.ingredients}
                    </Text>

                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={() => removerFavorito(item)}>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <View style={style.actionBtn}>
                        <IconFontAwesome name="trash" size={20} color={COLORS.white} />
                    </View>
                </View>
            </TouchableOpacity>


        </View>
    );
};


export default CartCard;
