import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../services/supabaseClient';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
      const user = supabase.auth.user();
      if (!user) {
        // If no user is logged in, redirect to login
        navigation.navigate('Login');
        return;
      }

      // Fetch orders for the current user from the orders table
      const { data, error } = await supabase
        .from('orders') // Replace 'orders' with your table name
        .select('*')
        .eq('user_id', user.id); // Get orders for the logged-in user

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setOrders(data); // Store orders data
      }
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchOrders();
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Details: {item.order_details}</Text>
      <Text style={styles.orderText}>Date: {item.order_date}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>You have no past orders.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  orderItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: '90%',
    borderWidth: 1,
    borderColor: 'red',
  },
  orderText: {
    color: 'red',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  noOrdersText: {
    color: 'red',
    fontSize: 18,
  },
});

export default OrdersScreen;
