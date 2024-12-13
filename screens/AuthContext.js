import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('userEmail');
      if (storedUser) {
        setUser({ email: storedUser });
      }
    };

    checkUser();
  }, []);

  const signUp = async (email) => {
    await AsyncStorage.setItem('userEmail', email);
    setUser({ email });
  };

  const logIn = async (email) => {
    await AsyncStorage.setItem('userEmail', email);
    setUser({ email });
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
