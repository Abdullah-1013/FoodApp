import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // .js screen
import SignUpScreen from './screens/SignUpScreen'; // .js screen
import LoginScreen from './screens/LoginScreen'; // .js screen
import OrderHistoryScreen from './screens/OrderHistoryScreen'; // .js screen
import CartScreen from './screens/CartScreen'; // .js screen
import MenuScreen from './screens/MenuScreen'; // .js screen
import BurgerScreen from './screens/BurgerScreen'; // .js screen
import PizzaScreen from './screens/PizzaScreen'; // .js screen
import CakeScreen from './screens/CakeScreen';
import DrinkScreen from './screens/DrinkScreen';
import BakeryScreen from './screens/BakeryScreen';
import GroceryScreen from './screens/GroceryScreen';
import SnackScreen from './screens/SnackScreen';


// Define the type of the Stack Navigator
type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  OrderHistory: undefined;
  Cart: undefined;
  Menu: undefined;
  BurgerScreen: undefined;
  PizzaScreen: undefined;
  CakeScreen: undefined;
  DrinkScreen: undefined;
  BakeryScreen: undefined;
  SnackScreen: undefined;
  GroceryScreen: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="BurgerScreen" component={BurgerScreen} />
        <Stack.Screen name="PizzaScreen" component={PizzaScreen} />
        <Stack.Screen name="CakeScreen" component={CakeScreen} />
        <Stack.Screen name="DrinkScreen" component={DrinkScreen} />
        <Stack.Screen name="BakeryScreen" component={BakeryScreen} />
        <Stack.Screen name="GroceryScreen" component={GroceryScreen} />
        <Stack.Screen name="SnackScreen" component={SnackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
