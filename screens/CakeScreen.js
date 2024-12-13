import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../services/supabaseClient'; // Adjust the import path as per your project structure

const CakeScreen = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCakes();
  }, []);

  // Fetch cakes data from Supabase
  const fetchCakes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('cake').select('*');
    if (error) {
      console.error('Error fetching cakes:', error);
    } else {
      setCakes(data);
    }
    setLoading(false);
  };

  // Handle Add to Cart button
  const handleAddToCart = (cake) => {
    console.log(`Added to cart: ${cake.name}`);
    // You can implement further logic for adding the item to a cart
  };

  const renderCakeItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
      <Text style={styles.rating}>Rating: {item.rating} ⭐</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cake Menu</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={cakes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCakeItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange', // Background color
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red', // Foreground color
    textAlign: 'center',
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 18,
    color: 'red', // Foreground color
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red', // Foreground color
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: 'red', // Button color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CakeScreen;
