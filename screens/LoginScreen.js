import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { supabase } from '../services/supabaseClient'; // Adjust the path based on your folder structure

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="red"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="red"
      />
      <Button title="Log In" onPress={handleLogin} color="red" />
      <Text style={styles.switchText} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange', // Background color
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'red', // Foreground color
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: 'red', // Border color
    marginBottom: 20,
    paddingLeft: 10,
    color: 'red', // Text color
  },
  error: {
    color: 'red', // Foreground color for errors
    marginBottom: 10,
  },
  switchText: {
    color: 'red', // Foreground color
    marginTop: 20,
  },
});

export default LoginScreen;
