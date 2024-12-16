import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import BurgerScreen from './screens/BurgerScreen'
import PizzaScreen from './screens/PizzaScreen'
import DrinkScreen from './screens/DrinkScreen'
import CakeScreen from './screens/CakeScreen'
import BakeryScreen from './screens/PizzaScreen'
import SnacksScreen from './screens/SnackScreen'
import GroceryScreen from './screens/GroceryScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Burgers" component={BurgerScreen} />
        <Stack.Screen name="Pizzas" component={PizzaScreen} />
        <Stack.Screen name="Cakes" component={CakeScreen} />
        <Stack.Screen name="Drinks" component={DrinkScreen} />
        <Stack.Screen name="Bakery" component={BakeryScreen} />
        <Stack.Screen name="Snacks" component={SnacksScreen} />
        <Stack.Screen name="Grocery" component={GroceryScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
