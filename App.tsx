import {View, StyleSheet} from 'react-native';
import React from 'react';
import {CircleRotationPage, LoginPage, VerificationPage} from './animations';

export default function App() {
  return (
    <View style={styles.container}>
      <VerificationPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
