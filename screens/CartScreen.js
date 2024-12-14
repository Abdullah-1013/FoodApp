import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const CartScreen = ({ route }) => {
  const { cart } = route.params;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: {total}</Text>
      <Button title="Place Order" onPress={() => alert('Order Placed!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'orange', padding: 10 },
  item: { padding: 10, margin: 10, backgroundColor: 'red', borderRadius: 5 },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
});

export default CartScreen;
