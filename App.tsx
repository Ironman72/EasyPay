import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Login from './src/pages/AuthPages/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/pages/AuthPages/Signup/Signup';
import Home from './src/pages/Home/Home';
import Generate from './src/pages/QrPages/GenerateQr/Generate';
import testing from './src/pages/ScanQrPage';
import ScanQrPage from './src/pages/ScanQrPage';
import auth from '@react-native-firebase/auth'
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {/* <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} /> */}
        <Stack.Screen
          name="home" component={Home} options={{
            title: 'Easy Pay',
            headerTitleAlign: 'center',
          }} />

        <Stack.Screen name="scan" component={ScanQrPage} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
