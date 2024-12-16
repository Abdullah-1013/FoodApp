import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import supabase from '../services/supabaseClient';

export default function OrderScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('id, quantity, status, items(name, price, picture, rating)')
      .eq('user_id', supabase.auth.user().id);
    if (error) {
      console.error(error);
    } else {
      setOrders(data);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <View style={styles.order}>
              <Text style={styles.name}>{item.items.name}</Text>
              <Text style={styles.details}>Price: ${item.items.price}</Text>
              <Text style={styles.details}>Quantity: {item.quantity}</Text>
              <Text style={styles.details}>Status: {item.status}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  order: { marginBottom: 15, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
  details: { fontSize: 16 },
});
