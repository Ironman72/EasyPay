import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const ScanQrPage = () => {
  const [scannedData, setScannedData] = useState(null);
  const [amount, setAmount] = useState(''); // Set initial state to empty string
  const navigation = useNavigation()

  const handleBarcodeScanned = ({ data }) => {
    // Validate the scanned data (replace 'valid_data' with your validation logic)
    if (data === 'pradeepkumar') {
      setScannedData(data);
    } else {
      Alert.alert('Invalid QR Code');
    }
  };

  const payAmount = () => {
    // Assuming the user enters the amount to pay in the TextInput
    const paymentAmount = parseFloat(amount);

    if (!isNaN(paymentAmount) && paymentAmount > 0 && paymentAmount <= 500) {
      const remainingBalance = 500 - paymentAmount;
      Alert.alert(`Payment Successful!\nAmount Paid: ${paymentAmount} Rs\nRemaining Balance: ${remainingBalance} Rs`);
      console.log(`Payment Successful!\nAmount Paid: ${paymentAmount} Rs\nRemaining Balance: ${remainingBalance} Rs`);
      setAmount('');
      setScannedData('');
      navigation.goBack();
    } else {
      Alert.alert('Insufficent Balance. Please enter a valid amount to pay.');
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

        // Add TextInput props as needed
        />
        <View style={styles.infoContainer}>
          <Text>Paying to: {`${scannedData}.cashpay.com`}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle button press, you can perform any action here
            payAmount()
          }}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
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
    backgroundColor: '#F2F0EF'
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
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
    backgroundColor: '#F2F0EF'
  }
});

export default ScanQrPage;
