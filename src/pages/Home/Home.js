import React, {useState} from 'react';
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
import bankImage from '../../assets/bank.png';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('500');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  const openScan = () => {
    navigation.navigate('scan');
  };

  const checkBalance = () => {
    // Show the activity indicator
    setShowActivityIndicator(true);

    // Simulate an asynchronous operation (e.g., fetching balance)
    setTimeout(() => {
      // Hide the activity indicator
      setShowActivityIndicator(false);

      // Show the balance modal after 4-5 seconds
      setShowBalanceModal(true);
    }, 4000); // Adjust the delay as needed
  };

  const closeModal = () => {
    setShowBalanceModal(false);
  };

  const testFunc = async () => {
    auth()
      .createUserWithEmailAndPassword('test@gmail.com', 'virus1997')
      .then(() => {
        Alert.alert('Success', 'User Created Brah');
      })
      .catch(e => {
        console.log(e, 'check it');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* Scan to Pay */}
        <TouchableOpacity
          style={[styles.button, styles.scanToPayButton]}
          onPress={() => {
            // Handle Scan to Pay action
            openScan();
          }}>
          <Image source={qrImage} style={styles.image} />
          <Text style={styles.buttonText}>Scan to Pay</Text>
        </TouchableOpacity>

        {/* Check Balance */}
        <TouchableOpacity
          style={[styles.button, styles.checkBalanceButton]}
          onPress={() => {
            // Handle Check Balance action
            console.log('Check Balance pressed');
            // checkBalance();
            testFunc();
          }}>
          <Image source={bankImage} style={styles.image} />
          <Text style={styles.buttonText}>Check Balance</Text>
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
          <Text>Your balance is {amount} Rs</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Home;
