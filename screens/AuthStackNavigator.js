import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './AuthContext'; // Import the AuthContext

import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignUpScreen';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignupScreen} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
