import {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../../context/AuthContext';
import styles from './Styles';

const Generate = () => {
  const {user} = useContext(AuthContext);
  const [userDocumentExists, setUserDocumentExists] = useState(null); // Use null as initial value
  const [name, setName] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserDocument = async () => {
      if (!user || !user.uid) {
        setLoading(false);
        return;
      }

      try {
        const userDocRef = firestore().collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          if (userData && userData.name) {
            setUserData(userData);
            setUserDocumentExists(true);
          } else {
            console.log('User document exists, but name is missing or empty');
          }
        } else {
          setUserDocumentExists(false);
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error checking user document:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserDocument();
  }, [user]);

  const handleCreateUser = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter name');
      return;
    }

    try {
      // Create user in Firebase Auth
      await firestore().collection('users').doc(user.uid).set({
        name: name,
        email: user.email,
        amount: 1000,
      });

      console.log('User document created:', 'line 55');
      // Update user data immediately after creating the document
      setUserData({name: name});
      setUserDocumentExists(true);
    } catch (err) {
      let errorCode = err.code.split('auth/')[1];
      Alert.alert('Error', errorCode);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : userDocumentExists === true ? (
        <View>
          {userData && userData.name ? (
            <>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <QRCode value={userData.name} size={200} />
                <Text style={styles.label}>Share QR Code to recieve Payment's.</Text>
              </View>
            </>
          ) : (
            <Text style={{textAlign: 'center'}}>Invalid user data</Text>
          )}
        </View>
      ) : (
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.infoText}>
            Plese enter your name, its used as QRCode ID or UPI ID.
          </Text>
          <TextInput
            placeholder="Enter Name"
            value={name}
            placeholderTextColor="#000"
            style={styles.input}
            onChangeText={text => setName(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
            <Text style={styles.buttonText}>Generate Qr Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Generate;
