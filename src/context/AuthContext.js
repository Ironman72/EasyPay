import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  // Function to set data with local storage
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        // old code from below
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (err) {
            let Errorcode = err.code.split('auth/')[1];
            Alert.alert('Error', Errorcode);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (err) {
            let Errorcode = err.code.split('auth/')[1];
            Alert.alert('Error', Errorcode);
          }
        },

        logout: async () => {
          try {
            auth().signOut();
          } catch (err) {
            console.log('LOGOUT ERROR', err);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
