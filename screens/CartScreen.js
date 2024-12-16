import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import supabase from '../services/supabaseClient';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]); // Cart data will be added locally
  const [loading, setLoading] = useState(false);

  // Fetch items from other screens and add them to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Place order and save to the 'orders' table
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);

    const userId = supabase.auth.user().id;

    const orderData = cartItems.map((item) => ({
      user_id: userId,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      status: 'Pending',
      created_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase.from('orders').insert(orderData);

    if (error) {
      console.error('Error placing order:', error);
      alert('Failed to place the order. Please try again.');
    } else {
      alert('Order placed successfully!');
      setCartItems([]); // Clear the cart after placing the order
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>Price: ${item.price}</Text>
                <Text style={styles.details}>Quantity: {item.quantity}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity style={styles.button} onPress={placeOrder}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { marginBottom: 15 },
  name: { fontSize: 18, fontWeight: 'bold' },
  details: { fontSize: 16 },
  button: { backgroundColor: 'orange', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
});
