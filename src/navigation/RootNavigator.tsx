import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/authentication/LoginScreen';
import SignupScreen from '../screens/authentication/SignupScreen';
import HomeTabsNavigator from './HomeTabsNavigator';
import MyInformationScreen from '../screens/main/profile/MyInformationScreen';
import { AuthContext } from '../context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  MyInformation: {id: string, name: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { accessToken, loading } = useContext(AuthContext);

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#4A90E2" />
    </View>
  );

  return (
    <NavigationContainer>
      {accessToken ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeTabsNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="MyInformation" component={MyInformationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default RootNavigator

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
