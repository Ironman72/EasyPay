import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './Styles';
import banner from '../../../assets/loginpic.png';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../context/AuthContext';

const Login = () => {
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = email => {
    // Your email validation logic here
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
    } else if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
    } else if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
    } else {
      try {
        setLoading(true);
        await login(email, password);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        let errorCode = error.code.split('auth/')[1];
        Alert.alert('Error', errorCode);
      }
    }
  };

  const openSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView>
      {/* Wrap the entire content in ScrollView and KeyboardAvoidingView */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1, justifyContent: 'center'}}
          behavior="padding">
          {/* main view */}
          <View style={styles.container}>
            {/* image and title */}
            <View style={styles.titleContainer}>
              <Image source={banner} style={styles.banner} />
              <Text style={styles.title}>Cash Pay</Text>
              <Text style={styles.subtitle}>
                Hassle-free payments on the go.
              </Text>
            </View>

            {/* login title */}
            <Text style={styles.loginText}>Login</Text>
            {/* textinputs and button */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="john@example.com"
                style={styles.input}
                placeholderTextColor="#1c1c1c"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}
              />

              <View style={{height: 20}} />
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="********"
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor="#1c1c1c"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
            </View>

            {/* Login button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleLogin()}>
              <Text style={styles.loginButtonText}>
                  Login
              </Text>
            </TouchableOpacity>

            {/* link to register */}
            <View>
              <TouchableOpacity
                style={styles.registerContainer}
                onPress={() => {
                  openSignup();
                }}>
                <Text style={styles.label}>Don't have an account?</Text>
                <Text style={styles.registertext}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
