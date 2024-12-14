import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './screens/HomeScreen';
import BurgerScreen from './screens/BurgerScreen';
import PizzaScreen from './screens/PizzaScreen';
import DrinkScreen from './screens/DrinkScreen';
import CakeScreen from './screens/CakeScreen';
import BakeryScreen from './screens/BakeryScreen';
import GroceryScreen from './screens/GroceryScreen';
import SnackScreen from './screens/SnackScreen';
import CartScreen from './screens/CartScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Correctly defining the screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Burgers" component={BurgerScreen} />
        <Stack.Screen name="Pizzas" component={PizzaScreen} />
        <Stack.Screen name="Drinks" component={DrinkScreen} />
        <Stack.Screen name="Cakes" component={CakeScreen} />
        <Stack.Screen name="Bakery" component={BakeryScreen} />
        <Stack.Screen name="Grocery" component={GroceryScreen} />
        <Stack.Screen name="Snacks" component={SnackScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
