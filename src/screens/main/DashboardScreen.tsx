import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eff2f4ff',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
  }
});
