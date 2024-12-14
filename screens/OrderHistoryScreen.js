import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native';
import { supabase } from '../services/supabaseClient';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null); // Store the logged-in user ID

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('user_id');
      if (storedUserId) {
        setUserId(storedUserId); // Set user ID from AsyncStorage
      }
    };

    loadUserId(); // Get user ID when the component mounts
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch orders only if user ID is available
      const fetchOrders = async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', userId) // Only fetch orders for the logged-in user
          .order('created_at', { ascending: false }); // Order by most recent

        if (error) {
          console.error('Error fetching orders:', error);
        } else {
          setOrders(data);
        }
      };

      fetchOrders();
    }
  }, [userId]); // Run the fetch when the user ID is set

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderText}>Item: {item.name}</Text>
      <Text style={styles.orderText}>Price: {item.price}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders placed yet!</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'orange' },
  orderCard: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
  },
  orderText: {
    fontSize: 16,
    color: 'black',
  },
  noOrdersText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderHistoryScreen;
