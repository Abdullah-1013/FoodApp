import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { supabase } from '../services/supabaseClient';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*'); // Fetch all orders from the orders table

        if (error) {
          throw error;
        }

        setOrders(data);
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch orders.');
        console.error('Error fetching orders:', err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'orange' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Order History</Text>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ color: 'red' }}>Order ID: {item.id}</Text>
              <Text style={{ color: 'red' }}>Total Price: ${item.total_price}</Text>
              <Text style={{ color: 'red' }}>Order Date: {new Date(item.order_date).toLocaleDateString()}</Text>
              <Text style={{ color: 'red' }}>Order Time: {new Date(item.order_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</Text>
              <Text style={{ color: 'red' }}>Status: {item.status}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={{ color: 'red' }}>No orders yet</Text>
      )}
    </View>
  );
};

export default OrderScreen;
