import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeTabsParamList } from "../../navigation/HomeTabs";

type Props = {
  navigation: BottomTabNavigationProp<HomeTabsParamList>;
};

export default function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <Button
      title="Go to Profile"
      onPress={() => navigation.navigate("Profile")}
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
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
  }
});
