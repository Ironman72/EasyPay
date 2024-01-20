import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../context/AuthContext';

const ScanQrPage = () => {
  const { user } = useContext(AuthContext);
  console.log(user.email, 'line 11')
  const [scannedData, setScannedData] = useState(null);
  const [amount, setAmount] = useState('');
  const [payeeData, setPayeeData] = useState(null);
  const [recieverId, setRecieverId] = useState('');
  const navigation = useNavigation();





  const handleBarcodeScanned = ({ data }) => {
    // Validate the scanned data (replace 'valid_data' with your validation logic)
    setScannedData(data);
    console.log(data, 'line 23')
  };


  const findReceiverDetails = async () => {
    try {
      const querySnapshot = await firestore().collection('users').where('name', '==', scannedData).get();

      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      querySnapshot.forEach((doc) => {
        // Access the data and document ID of each document
        const data = doc.data();
        const docId = doc.id;

        // Set the payee data including the document ID
        setPayeeData({ ...data, docId });
        setRecieverId(docId)
      });
    } catch (error) {
      console.error('Error finding receiver details:', error);
    }
  };


  useEffect(() => {
    findReceiverDetails()
  }, [scannedData])

  const makePayment = async (senderId, receiverDocId, amount) => {
    try {
      const senderRef = firestore().collection('users').doc(senderId);
      const receiverRef = firestore().collection('users').doc(receiverDocId);

      // Use transactions for atomicity
      await firestore().runTransaction(async (transaction) => {
        const senderDoc = await transaction.get(senderRef);
        const receiverDoc = await transaction.get(receiverRef);

        const senderAmount = senderDoc.data().amount || 0; // Default to 0 if 'amount' is undefined
        const numericAmount = parseFloat(amount);

        if (isNaN(numericAmount) || numericAmount <= 0) {
          throw new Error('Invalid payment amount');
        }

        if (senderAmount < numericAmount) {
          Alert.alert('Insufficient funds');
        }

        // Update sender's amount with numerical subtraction
        transaction.update(senderRef, { amount: senderAmount - numericAmount });

        // Increase receiver's amount by the payment
        const currentReceiverAmount = receiverDoc.data().amount || 0;
        const newReceiverAmount = currentReceiverAmount + numericAmount;
        transaction.update(receiverRef, { amount: newReceiverAmount });
        Alert.alert('Success', `Your Payment of Rs.${amount} Succesfull`)
        navigation.goBack()
      });
    } catch (error) {
      Alert.alert(error.message); // Display an alert for the specific error
    }
  };





  const renderTextInputAndButton = () => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChangeText={(text) => {
            setAmount(text);
          }}
          keyboardType="numeric"
          placeholderTextColor='#000'
        />
        <View style={styles.infoContainer}>
          <Text style={{ color: '#000' }}>Paying to: {scannedData}</Text>
        </View>
        {payeeData && user && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Handle button press, you can perform any action here

              makePayment(user.uid, recieverId, amount);
            }}>
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };


  return (
    <View style={styles.container}>
      {!scannedData ? (
        <QRCodeScanner
          onRead={handleBarcodeScanned}
          flashMode={RNCamera.Constants.FlashMode.auto}
          reactivate
          reactivateTimeout={5000}
          showMarker
        />
      ) : (
        renderTextInputAndButton()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#F2F0EF',
    color: '#000'
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    backgroundColor: '#F2F0EF',
  },
});

export default ScanQrPage;
