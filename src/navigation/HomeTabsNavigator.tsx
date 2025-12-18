import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootNavigator';
import { AuthContext } from '../context/AuthContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import DashboardScreen from "../screens/main/dashboard/DashboardScreen";
import ActivityFeedScreen from "../screens/main/activity/ActivityFeedScreen";
import WalletScreen from "../screens/main/wallet/WalletScreen";
import ProfileScreen from "../screens/main/profile/ProfileScreen";
import NavigationHeader from '../components/NavigationHeader';
import useGetUser from "../hooks/useGetUser";

export type HomeTabsNavigatorParamList = {
  Dashboard: undefined;
  Activity: undefined;
  Wallet: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<HomeTabsNavigatorParamList>();

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused }) => {
    let iconName = "";

    if (route.name === "Dashboard") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Activity") {
      iconName = focused ? "newspaper" : "newspaper-outline";
    } else if (route.name === "Wallet") {
      iconName = focused ? "wallet" : "wallet-outline";
    } else if (route.name === "Profile") {
      iconName = focused ? "person" : "person-outline";
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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeTabsNavigator = ({ navigation }: Props) => {

  const { logoutUser } = useContext(AuthContext);
  const { user } = useGetUser();

  return (
    <View style={styles.container}>
      <NavigationHeader 
      titleText='JetWay Trades'
      titleLogo
      onLeftPressed={onLeftPressed}
      onRightPressed={onRightPressed} 
      leftText={`Hello ${user?.first_name}`}
      rightText='Logout'
      />
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Activity" component={ActivityFeedScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );

  function onLeftPressed() {
    navigation.navigate("MyInformation", { id: user.id, name: `${user.first_name} ${user.last_name}` })
  }

  function onRightPressed() {
    logoutUser();
  }

}

export default HomeTabsNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
