import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './src/pages/AuthPages/Login/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/pages/AuthPages/Signup/Signup';

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
      </Stack.Navigator>

    </NavigationContainer>

  )
}

export default App

const styles = StyleSheet.create({})