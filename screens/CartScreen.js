import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '../services/supabaseClient';

const CartScreen = ({ navigation, route }) => {
  const [cart, setCart] = useState(route.params?.cart || []); // Cart passed from other screens

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2); // Total price
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Cart is Empty', 'Add some items to your cart before placing an order.');
      return;
    }

    const total = calculateTotal();
    const userId = 1; // Replace with dynamic user ID if authentication is implemented

    try {
      // Insert the order into the Supabase database
      const { error } = await supabase.from('orders').insert([
        { 
          items: JSON.stringify(cart), // Storing cart items as JSON
          total_price: parseFloat(total), // Ensure numeric value
          order_date: new Date().toISOString(), // Current date
          order_time: new Date().toISOString(), // Current time
          status: 'confirmed' // Default order status
        },
      ]);

      if (error) {
        console.error('Error placing order:', error.message);
        Alert.alert('Order Failed', error.message);
      } else {
        Alert.alert('Order Placed', 'Your order has been placed successfully.');
        setCart([]); // Clear cart after placing order
        navigation.navigate('Order'); // Navigate to Order screen
      }
    } catch (err) {
      console.error('Unexpected error placing order:', err.message);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter((item) => item.id !== itemToRemove.id));
    Alert.alert('Removed', `${itemToRemove.name} removed from cart.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  placeOrderButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
  },
  placeOrderButtonText: {
    color: 'white',
    fontSize: 18,
  },
  emptyCartText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default CartScreen;
