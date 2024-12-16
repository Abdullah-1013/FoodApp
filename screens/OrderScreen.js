import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import supabase from '../services/supabaseClient';

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    setLoading(true);
    const userId = supabase.auth.user().id;

    const { data, error } = await supabase
      .from('orders')
      .select('id, item_name, price, quantity, status, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching order history:', error);
      alert('Failed to fetch order history. Please try again.');
    } else {
      setOrders(data);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.item_name}</Text>
              <Text style={styles.details}>Price: ${item.price}</Text>
              <Text style={styles.details}>Quantity: {item.quantity}</Text>
              <Text style={styles.details}>Status: {item.status}</Text>
              <Text style={styles.details}>
                Date: {new Date(item.created_at).toLocaleDateString()}
              </Text>
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
  item: { marginBottom: 15 },
  name: { fontSize: 18, fontWeight: 'bold' },
  details: { fontSize: 16 },
});
