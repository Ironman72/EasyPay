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
import React from 'react';
import styles from './Styles';
import banner from '../../../assets/loginpic.png';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    // Add your login logic here
    Alert.alert('Register/signup', 'Bro add Signup Functionality');
  };

  const openLogin = () => {
    navigation.goBack();
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
              <Text style={styles.title}>Easy Pay</Text>
              <Text style={styles.subtitle}>
                Hassle-free payments on the go.
              </Text>
            </View>

            {/* login title */}
            <Text style={styles.loginText}>Register</Text>
            {/* textinputs and button */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput placeholder="john@example.com" style={styles.input} />

              <View style={{height: 20}} />
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="********"
                secureTextEntry={true}
                style={styles.input}
              />
            </View>

            {/* Login button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleLogin()}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>

            {/* link to register */}
            <View>
              <TouchableOpacity
                style={styles.registerContainer}
                onPress={() => {
                  openLogin();
                }}>
                <Text>Already have an account?</Text>
                <Text style={styles.registertext}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
