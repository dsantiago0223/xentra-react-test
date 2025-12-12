import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyInformationScreen from "../screens/main/profile/MyInformationScreen";
import ProfileScreen from "../screens/main/profile/ProfileScreen";

export type ProfileStackParamList = {
    Profile: undefined;
    MyInformation: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MyInformation" component={MyInformationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
