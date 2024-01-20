import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import styles from './Styles'; // Adjust the import path based on your project structure
import qrImage from '../../assets/qr.png';
import scan from '../../assets/scan.png';
import bankImage from '../../assets/bank.png';
import logoutImage from '../../assets/logout.png';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import firestore from '@react-native-firebase/firestore';
const Home = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('500');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const {logout, user} = useContext(AuthContext);

  const openScan = () => {
    navigation.navigate('scan');
  };

  const checkBalance = async () => {
    try {
      // Show the activity indicator
      setShowActivityIndicator(true);

      // Fetch user data from Firestore
      const userData = await getUserData(user.uid);

      if (userData) {
        // Set the amount in the state
        setAmount(userData.amount || 0); // Default to 0 if 'amount' is undefined

        // Hide the activity indicator
        setShowActivityIndicator(false);

        // Show the balance modal
        setShowBalanceModal(true);
      } else {
        // Handle the case when user data is not available
        setShowActivityIndicator(false);
        Alert.alert('Error fetching user data', 'Please try again later.');
      }
    } catch (error) {
      console.error('Error checking balance:', error.message);
      // Handle error if needed
      setShowActivityIndicator(false);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const closeModal = () => {
    setShowBalanceModal(false);
  };

  const getUserData = async uid => {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('User data:', userData);
        return userData;
      } else {
        console.log('User document does not exist.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      return null;
    }
  };

  const signout = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            setIsLoading(true); // Start the loading indicator
            await logout();
            // Perform additional actions after successful logout
          } catch (error) {
            console.error('Error logging out:', error);
            // Handle logout error if needed
          } finally {
            setIsLoading(false); // Stop the loading indicator
          }
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* recieve Payment */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('generate');
          }}>
          <Image source={qrImage} style={styles.image} />
          <Text style={styles.buttonText}>My Code</Text>
        </TouchableOpacity>

        {/* send payment */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            openScan();
          }}>
          <Image source={scan} style={styles.image} />
          <Text style={styles.buttonText}>Send Payment</Text>
        </TouchableOpacity>

        {/* check balance */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            checkBalance();
          }}>
          <Image source={bankImage} style={styles.image} />
          <Text style={styles.buttonText}>check Balance</Text>
        </TouchableOpacity>

        {/* logout */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            signout();
          }}>
          <Image source={logoutImage} style={styles.image} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Activity Indicator */}
      {showActivityIndicator && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {/* Balance Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showBalanceModal}
        onRequestClose={() => setShowBalanceModal(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.buttonText}>Your balance is {amount} Rs</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
