import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native'; 

export default function ProfileScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <Button
        title="My Information"
        onPress={() => navigation.navigate("MyInformation")}
      />
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
  }
});
