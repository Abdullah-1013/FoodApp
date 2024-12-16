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
          .select('*'); // Fetch all orders from the table

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
    <View style={{ flex: 1, padding: 20, backgroundColor: 'orange' }}>  {/* Orange background */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Order History</Text>  {/* Red text color */}

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ color: 'red' }}>{item.name}</Text>  {/* Red text color for item names */}
              <Text style={{ color: 'red' }}>Price: ${item.price}</Text>  {/* Red text color for price */}
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
