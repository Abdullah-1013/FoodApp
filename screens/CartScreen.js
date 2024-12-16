import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { supabase } from '../services/supabaseClient';

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params; // Get cart data passed from BurgerScreen
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Add items to your cart before placing the order.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('orders') // Replace with your actual table name
        .insert(cart); // Insert all cart items into orders table

      if (error) {
        throw error;
      }

      Alert.alert('Order Placed', 'Your order has been placed successfully!');
      setLoading(false);

      // Clear cart or reset to an empty array
      navigation.navigate('Order');
    } catch (error) {
      setLoading(false);
      console.error('Error placing order:', error.message);
      Alert.alert('Error', 'Failed to place the order. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: 'orange' }}>  {/* Orange background */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>Cart</Text>  {/* Red text color */}

      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ color: 'red' }}>{item.name}</Text>  {/* Red text color for item names */}
              <Text style={{ color: 'red' }}>Price: ${item.price}</Text>  {/* Red text color for price */}
            </View>
          )}
        />
      ) : (
        <Text style={{ color: 'red' }}>No items in the cart</Text>  
      )}

      <Button
        title={loading ? 'Placing Order...' : 'Place Order'}
        onPress={placeOrder}
        disabled={loading}
      />
    </View>
  );
};

export default CartScreen;
