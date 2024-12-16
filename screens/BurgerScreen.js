import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../services/supabaseClient'; // Ensure correct path

const BurgerScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('burgers') // Replace with your actual table name
          .select('*');

        if (error) {
          console.error('Error fetching data:', error.message);
          Alert.alert('Data Fetch Error', error.message);
        } else {
          console.log('Fetched data:', data);
          setItems(data);
        }
      } catch (err) {
        console.error('Unexpected error:', err.message);
        Alert.alert('Unexpected Error', err.message);
      }
    };

    fetchData();
  }, []);

  const addToCart = (item) => {
    console.log('Add to Cart clicked for item:', item);
    setCart((prevCart) => [...prevCart, item]);
    Alert.alert('Added to Cart', `${item.name} added successfully.`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/150' }} // Default placeholder image
        style={styles.image}
        onError={(e) => console.log('Image loading error:', e.nativeEvent.error)} // Error handling for image
      />
      <Text style={styles.name}>{item.name || 'No name available'}</Text>
      <Text style={styles.price}>${item.price || 'N/A'}</Text>
      <Text style={styles.rating}>Rating: {item.rating || 'N/A'}</Text>
      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Main Content */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noItemsText}>No items available. Please try again later.</Text>
      )}

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('./assets/icons/home.png')} style={styles.icon} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Order')}>
          <Image source={require('./assets/icons/orders.png')} style={styles.icon} />
          <Text style={styles.iconText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Cart', { cart })} // Passing cart data
        >
          <Image source={require('./assets/icons/cart.png')} style={styles.icon} />
          <Text style={styles.iconText}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'orange', paddingTop: 20 },
  list: { paddingHorizontal: 10 },
  card: { backgroundColor: 'white', marginBottom: 20, padding: 10, borderRadius: 10, alignItems: 'center' },
  image: { width: 150, height: 100, borderRadius: 10, resizeMode: 'cover' },
  name: { color: 'red', fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  price: { color: 'black', fontSize: 16 },
  rating: { color: 'black', fontSize: 14 },
  button: { backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', fontSize: 16 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'red', paddingVertical: 10, position: 'absolute', bottom: 0, width: '100%' },
  iconButton: { alignItems: 'center' },
  icon: { width: 30, height: 30, resizeMode: 'contain' },
  iconText: { color: 'white', fontSize: 12 },
  noItemsText: { fontSize: 16, color: 'black', textAlign: 'center', marginTop: 20 },
});

export default BurgerScreen;
