import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../services/supabaseClient';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // Check if user already exists using the email
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users') // Replace 'users' with your users table if it's custom, otherwise use auth
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      // If user exists, show an alert
      Alert.alert('Error', 'User with this email already exists. Please log in.');
      return;
    }

    // If no existing user, proceed with sign-up
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else {
      // On successful sign-up, navigate to Login screen
      Alert.alert('Success', 'Account created successfully. Please log in.');
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? Log In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  title: { fontSize: 24, fontWeight: 'bold', color: 'red' },
  input: {
    width: '80%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  link: { color: 'red', marginTop: 10 },
});

export default SignUpScreen;
