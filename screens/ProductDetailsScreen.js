import React from 'react';
import { View, Text, Button } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Price: ${product.price}</Text>
      <Button title="Add to Cart" onPress={() => {/* Add to cart logic */}} />
    </View>
  );
};

export default ProductDetailsScreen;
