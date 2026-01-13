import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from '../../../constants/Constants'

export default function ActivityFeedScreen() {
  return (
    <View style={styles.container}>
      <Text>Activity Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  }
});
