import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import DashboardScreen from "../screens/main/DashboardScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import SettingsScreen from "../screens/main/SettingsScreen";

export type HomeTabsParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused }) => {
    let iconName = "";

    if (route.name === "Dashboard") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Profile") {
      iconName = focused ? "person" : "person-outline";
    } else if (route.name === "Settings") {
      iconName = focused ? "settings" : "settings-outline";
    }
    return <Ionicons name={iconName} size={22} color={focused ? "#007AFF" : "#8e8e8e"} />;
  },
    tabBarActiveTintColor: "#007AFF",
    tabBarInactiveTintColor: "#8e8e8e",
    tabBarStyle: {
      height: 60,
      paddingBottom: 10,
      paddingTop: 5,
  },
})

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default HomeTabs
