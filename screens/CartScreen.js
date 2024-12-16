import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import supabase from '../services/supabaseClient';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cart')
      .select('id, item_id, quantity, items(name, price, picture, rating)')
      .eq('user_id', supabase.auth.user().id);
    if (error) {
      console.error(error);
    } else {
      setCartItems(data);
    }
    setLoading(false);
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from('orders')
      .insert(
        cartItems.map((item) => ({
          user_id: supabase.auth.user().id,
          item_id: item.item_id,
          quantity: item.quantity,
          status: 'Pending',
        }))
      );

    if (error) {
      alert('Failed to place order. Please try again.');
      console.error(error);
    } else {
      // Clear the cart after placing the order
      await supabase.from('cart').delete().eq('user_id', supabase.auth.user().id);
      setCartItems([]);
      alert('Order placed successfully!');
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
                <Text style={styles.name}>{item.items.name}</Text>
                <Text style={styles.details}>Price: ${item.items.price}</Text>
                <Text style={styles.details}>Quantity: {item.quantity}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
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
