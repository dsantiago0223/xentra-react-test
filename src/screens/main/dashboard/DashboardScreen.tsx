import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeTabsNavigatorParamList } from "../../../navigation/HomeTabsNavigator";
import AppButton from "../../../components/AppButton";

type Props = {
  navigation: BottomTabNavigationProp<HomeTabsNavigatorParamList>;
};

export default function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <AppButton titleText="Go to Profile" onPressed={() => navigation.navigate("Profile")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
  }
});
