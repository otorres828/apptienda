
import React from 'react'
import {
  Image,

  Text,
  View,
} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

function ListCategories ({setSelectedCategoryId,categorias,style}) {
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

export default ListCategories
