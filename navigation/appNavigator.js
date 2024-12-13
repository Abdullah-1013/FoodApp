import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from '../screens/MenuScreen';  // Import MenuScreen
import BurgerScreen from '../screens/BurgerScreen';  // Import BurgerScreen

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MenuScreen">
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="BurgerScreen" component={BurgerScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
