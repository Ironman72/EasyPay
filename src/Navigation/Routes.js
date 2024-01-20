import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';
import auth from '@react-native-firebase/auth';
const AppStack = createStackNavigator();

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return;
  <View>
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
      }}>
      <ActivityIndicator color="green" size="large" />
    </View>
  </View>;

  return (
    <NavigationContainer>
      <AppStack.Navigator>
        {user ? (
          <AppStack.Screen
            name="home"
            component={MainStack}
            options={{headerShown: false}}
          />
        ) : (
          <AppStack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
