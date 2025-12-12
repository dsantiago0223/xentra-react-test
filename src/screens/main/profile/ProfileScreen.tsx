import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../../navigation/ProfileNavigator';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

export default function ProfileScreen({navigation}: Props) {
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
