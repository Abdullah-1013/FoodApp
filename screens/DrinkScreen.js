import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient'; // Adjust path as needed

const DrinkScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('drink') // Change table name if needed
        .select('*');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setItems(data);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Item added to cart')}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <Image source={require('./assets/icons/home.png')} style={styles.icon} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Navigate to Order')}>
          <Image source={require('./assets/icons/orders.png')} style={styles.icon} />
          <Text style={styles.iconText}>Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Image source={require('./assets/icons/cart.png')} style={styles.icon} />
          <Text style={styles.iconText}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    paddingTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    color: 'black',
    fontSize: 16,
  },
  rating: {
    color: 'black',
    fontSize: 14,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'red',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
  },
});

export default DrinkScreen;
