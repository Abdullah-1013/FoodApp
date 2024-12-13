import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../services/supabaseClient';  // Adjust the path based on your folder structure

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = supabase.auth.user();
      if (user) {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error(error);
        } else {
          setOrders(data);
        }
      }
    };

    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Total: ${item.total}</Text>
      <Text style={styles.orderText}>Date: {item.created_at}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFA500', // Orange background color
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#D32F2F', // Red text color for title
  },
  orderItem: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  orderText: {
    fontSize: 16,
    color: '#D32F2F', // Red text color for order details
  },
});

export default OrderHistoryScreen;
