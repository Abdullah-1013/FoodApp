import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { supabase } from '../services/supabaseClient'; // Adjust the path based on your folder structure

import CartScreen from './CartScreen';
import OrderHistoryScreen from './OrderHistoryScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignUpScreen';
import MenuScreen from './MenuScreen';

const Tab = createBottomTabNavigator();

const dealsData = [
  { id: '1', image: require('./assets/images/pizza.jpg'), label: 'Hot Deal 1 - 50% off on Pizza' },
  { id: '2', image: require('./assets/images/burger.jpg'), label: 'Hot Deal 2 - Buy 1 Get 1 Free Burger' },
  { id: '3', image: require('./assets/images/fries.jpg'), label: 'Hot Deal 3 - Buy any item get 1 fries free' },
  { id: '4', image: require('./assets/images/pasta.jpg'), label: 'Hot Deal 4 - 20% off on Pasta' },
];

const featuredProductsData = [
  { id: '1', image: require('./assets/images/donut.jpg'), label: 'Chocolate Donut', price: 'Pkr 200' },
  { id: '2', image: require('./assets/images/coffee.jpg'), label: 'Cappuccino', price: 'Pkr 500' },
  { id: '3', image: require('./assets/images/salad.jpg'), label: 'Fresh Salad', price: 'Pkr 300' },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = supabase.auth.user();
      if (!currentUser) {
        navigation.navigate('Login');
      } else {
        setUser(currentUser);
      }
    };

    checkUser();
  }, [navigation]);

  // Function to handle adding deals to cart
  const handleDealClick = (dealLabel, dealImage) => {
    Alert.alert(
      'Add to Cart',
      `Do you want to add "${dealLabel}" to your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setCart((prevCart) => [...prevCart, { label: dealLabel, image: dealImage }]);
            Alert.alert('Added to Cart', `"${dealLabel}" has been added successfully!`);
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Function to handle adding featured products to cart
  const handleProductClick = (productLabel, productPrice) => {
    Alert.alert(
      'Add to Cart',
      `Do you want to add "${productLabel}" (${productPrice}) to your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setCart((prevCart) => [...prevCart, { label: productLabel, price: productPrice }]);
            Alert.alert('Added to Cart', `"${productLabel}" has been added successfully!`);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Deals section */}
      <View style={styles.dealsContainer}>
        <Text style={styles.dealsTitle}>Hot Deals</Text>
        <FlatList
          data={dealsData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDealClick(item.label, item.image)}>
              <View style={styles.dealItem}>
                <Image source={item.image} style={styles.dealImage} />
                <Text style={styles.dealLabel}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Featured Products section */}
      <View style={styles.featuredContainer}>
        <Text style={styles.featuredTitle}>Featured Products</Text>
        <FlatList
          data={featuredProductsData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductClick(item.label, item.price)}>
              <View style={styles.featuredItem}>
                <Image source={item.image} style={styles.featuredImage} />
                <Text style={styles.featuredLabel}>{item.label}</Text>
                <Text style={styles.featuredPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

// Tab navigation
const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/home.png')}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/menu.png')}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/cart.png')}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order History"
        component={OrderHistoryScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/orders.png')}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/login.png')}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          tabBarLabel: 'Sign Up',
          tabBarIcon: () => (
            <Image
              source={require('./assets/icons/signup.png')}
              style={styles.tabBarIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 10,
  },
  dealsContainer: {
    marginBottom: 20,
  },
  dealsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'red',
  },
  dealItem: {
    marginRight: 15,
    alignItems: 'center',
    width: 250,
  },
  dealImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  dealLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  featuredContainer: {
    marginBottom: 20,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  featuredItem: {
    marginRight: 15,
    alignItems: 'center',
    width: 200,
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  featuredLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuredPrice: {
    fontSize: 12,
    color: '#888',
  },
  tabBar: {
    backgroundColor: 'orange',
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  tabBarIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default HomeTabNavigator;
