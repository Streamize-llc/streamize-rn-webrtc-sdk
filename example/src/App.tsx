import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply, RTCRoom } from 'streamize-rn-webrtc-sdk';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>

      <RTCRoom 
        apiKey="6295447d-7069-4d14-baeb-33c7ffe03b66"
        roomId="1234"/>
      <RTCRoom 
        apiKey="6295447d-7069-4d14-baeb-33c7ffe03b66"
        roomId="1234"/>   

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
