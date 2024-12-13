import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../services/supabaseClient'; // Update the path if needed

const SnackScreen = () => {
  const [snackItems, setSnackItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSnackItems();
  }, []);

  const fetchSnackItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('snack').select('*');
    if (error) {
      console.error('Error fetching snack items:', error);
    } else {
      setSnackItems(data);
    }
    setLoading(false);
  };

  const handleAddToCart = async (item) => {
    const { data, error } = await supabase.from('cart').insert([
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        rating: item.rating,
      },
    ]);

    if (error) {
      console.error('Error adding to cart:', error);
    } else {
      console.log(`${item.name} added to cart successfully`);
    }
  };

  const renderItem = ({ item }) => (
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
      <Text style={styles.title}>Snack Menu</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={snackItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 18,
    color: 'red',
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
    color: 'red',
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
    backgroundColor: 'red',
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

export default SnackScreen;
