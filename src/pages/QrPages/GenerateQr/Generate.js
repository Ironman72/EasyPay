import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import styles from './Styles';

const Generate = () => {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <Text>Generate</Text>
      <View style={styles.qrContainer}>
        <QRCode value="pradeep" size={200} />
        <Text style={styles.label}>{'something@easypay.com'}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Generate;
