import React, { useState } from 'react';
import { TextInput, View, Text, Alert, TouchableOpacity } from 'react-native';
import { supabase } from '../services/supabaseClient'; // Adjust the path as needed

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Sign up user without email verification
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'User signed up successfully.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'orange' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          marginBottom: 10,
          borderWidth: 1,
          padding: 10,
          color: 'red', // Text color red (foreground)
          borderColor: 'red',
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          marginBottom: 20,
          borderWidth: 1,
          padding: 10,
          color: 'red', // Text color red (foreground)
          borderColor: 'red',
        }}
      />
      {/* Custom Sign Up button with red foreground and orange background */}
      <TouchableOpacity 
        onPress={handleSignUp} 
        style={{
          backgroundColor: 'orange', 
          paddingVertical: 10, 
          paddingHorizontal: 50, 
          borderRadius: 5, 
          marginBottom: 10,
          borderColor: 'red',
          borderWidth: 2,
        }}>
        <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
