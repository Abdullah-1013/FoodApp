import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Categories data with images
const categories = [
  { id: '1', name: 'Burgers', image: require('./assets/images/burgers.jpg') },
  { id: '2', name: 'Pizzas', image: require('./assets/images/pizza.jpg') },
  { id: '3', name: 'Drinks', image: require('./assets/images/drinks.jpg') },
  { id: '4', name: 'Cakes', image: require('./assets/images/cake.jpg') },
  { id: '5', name: 'Bakery', image: require('./assets/images/bakery.jpg') },
  { id: '6', name: 'Grocery', image: require('./assets/images/grocery.jpg') },
  { id: '7', name: 'Snacks', image: require('./assets/images/snacks.jpg') },
];

const HomeScreen = ({ navigation }) => {
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate(item.name)} // Navigate to the category screen based on name
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Categories Swipe Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryWrapper}>
            {renderCategory({ item: category })}
          </View>
        ))}
      </ScrollView>

      {/* Categories FlatList Section (Two categories per row) */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display two categories per row
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    paddingTop: 20,
    paddingBottom: 20, // Adjust bottom padding
  },
  categoriesContainer: {
    marginBottom: 20, // Adjust margin to push categories lower
    marginTop: 20, // Adjust the top margin for swipeable categories
  },
  categoryWrapper: {
    marginHorizontal: 5, // Adjust margin between cards in the ScrollView
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: 'red',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 180, // Increased height for better visibility
    width: 150, // Consistent width for each category card
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryImage: {
    width: '100%', // Make the image take up the full width of the category card
    height: 120,  // Set a fixed height to ensure it stays within the card
    resizeMode: 'cover', // Scale the image to cover the area of the card
    borderRadius: 10, // Optional: Add rounded corners to the image
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 14, // Adjust font size for better visibility
    textAlign: 'center', // Center the text under the image
    width: '100%', // Ensure text width matches the image's width
  },
});

export default HomeScreen;
