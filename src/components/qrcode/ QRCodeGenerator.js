import React from 'react';
import {View, Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeGenerator = () => {
  const kfcURL = 'https://www.youtube.com/watch?v=eK5gPcFjQps';

  return (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <Text style={{fontSize: 18, marginBottom: 10}}>Scan to Visit KFC</Text>
      <QRCode value={kfcURL} size={200} />
    </View>
  );
};

export default QRCodeGenerator;
