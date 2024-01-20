import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/AuthPages/Login/Login';
import Signup from '../pages/AuthPages/Signup/Signup';
import Home from '../pages/Home/Home';
import Generate from '../pages/QrPages/GenerateQr/Generate';
import ScanQrPage from '../pages/ScanQrPage';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="homescreen"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: 'Cash Pay',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="generate"
        component={Generate}
        options={{
          headerShown: true,
          headerTitle: 'My Qr Code',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="scan"
        component={ScanQrPage}
        options={{
          headerShown: true,
          headerTitle: 'Scan Qr',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
