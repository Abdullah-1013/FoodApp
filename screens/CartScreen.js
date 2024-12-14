import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const CartScreen = ({ route }) => {
  // Check if cart is passed in route params and provide a default empty array if not
  const { cart = [] } = route.params || {};

  // If cart is empty, show a message and return early
  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noItems}>No items in cart.</Text>
      </View>
    );
  }

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
  noItems: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
});

export default CartScreen;
