import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Function to calculate the total price
  const calculateTotal = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  // Function to add item to cart
  const handleAddItem = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));
  };

  // Function to remove item from cart
  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));
  };

  // Render each cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemText}>{item.label}</Text>
      <Text style={styles.cartItemText}>${item.price}</Text>
      <Text
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        Remove
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
          />
          {/* Display grand total */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Grand Total: ${total}</Text>
          </View>
        </>
      )}
      {/* Button to add a sample item */}
      <Button
        title="Add Sample Item"
        onPress={() =>
          handleAddItem({
            id: Math.random(),  // Generate a unique ID for the sample item
            label: 'Sample Item',
            price: 10.0,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'orange',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  cartItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cartItemText: {
    fontSize: 16,
    color: 'red',
  },
  removeButton: {
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});

export default CartScreen;
