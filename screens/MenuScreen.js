import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // useNavigation hook

const MenuScreen = () => {
  const navigation = useNavigation();

  const categories = [
    { id: 1, name: 'Burgers', image: require('./assets/images/burgers.jpg') },
    { id: 2, name: 'Pizzas', image: require('./assets/images/pizzas.jpg') },
    { id: 3, name: 'Drinks', image: require('./assets/images/drinks.jpg') },
    { id: 4, name: 'Snacks', image: require('./assets/images/snacks.jpg') },
    { id: 5, name: 'Cakes', image: require('./assets/images/cake.jpg') },
    { id: 6, name: 'Bakery', image: require('./assets/images/bakery.jpg') },
    { id: 7, name: 'Grocery', image: require('./assets/images/grocery.jpg') },
  ];

  const handleCategoryPress = (category) => {
    // Navigate to the category-specific screen dynamically
    switch (category.name) {
      case 'Burgers':
        navigation.navigate('BurgerScreen');
        break;
      case 'Pizzas':
        navigation.navigate('PizzaScreen');
        break;
      case 'Drinks':
        navigation.navigate('DrinkScreen');
        break;
      case 'Snacks':
        navigation.navigate('SnackScreen');
        break;
      case 'Cakes':
        navigation.navigate('CakeScreen');
        break;
      case 'Bakery':
        navigation.navigate('BakeryScreen');
        break;
      case 'Grocery':
        navigation.navigate('GroceryScreen');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      {/* Top Section - Categories as swipeable list */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.swipeableContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItemSwipe}
            onPress={() => handleCategoryPress(category)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Section - Categories in grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(item)}
          >
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.gridContainer}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'red',
  },
  swipeableContainer: {
    marginBottom: 20,
  },
  categoryItemSwipe: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  gridContainer: {
    marginBottom: 20,
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
});

export default MenuScreen;
