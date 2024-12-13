import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';
import { supabase } from '../services/supabaseClient'; // Adjust the path to your supabase client

const BurgerScreen = ({ navigation }) => {
  const [burgerData, setBurgerData] = useState([]);

  // Fetch burger data from Supabase
  useEffect(() => {
    const fetchBurgerData = async () => {
      const { data, error } = await supabase
        .from('burgers')  // Make sure to match the table name
        .select('*');

      if (error) {
        console.error('Error fetching data: ', error);
      } else {
        setBurgerData(data);
      }
    };

    fetchBurgerData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Burger Screen</Text>

      {/* Render the list of burgers */}
      <FlatList
        data={burgerData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.burgerItem}>
            <Image source={{ uri: item.image }} style={styles.burgerImage} />
            <Text style={styles.burgerName}>{item.name}</Text>
            <Text style={styles.burgerPrice}>${item.price}</Text>
            <Text style={styles.burgerRating}>Rating: {item.rating}</Text>

            {/* Add to Cart Button */}
            <Button
              title="Add to Cart"
              onPress={() => alert('Added to Cart')} // Replace with actual cart logic
              color="red"  // Set button text color to red
            />
          </View>
        )}
      />

      <Button title="Back to Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  burgerItem: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  burgerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  burgerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  burgerPrice: {
    fontSize: 16,
    color: 'red',
  },
  burgerRating: {
    fontSize: 14,
    color: 'red',
  },
});

export default BurgerScreen;
