import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/authentication/LoginScreen';
import SignupScreen from '../screens/authentication/SignupScreen';
import HomeScreen from '../screens/main/HomeScreen';
import TestUIComponents from '../components/TestUIComponents';
import { AuthContext } from '../context/AuthContext';
import { Colors } from '../constants/Constants'; 

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  TestUIComponents: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { accessToken, loading } = useContext(AuthContext);

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={Colors.grayDark} />
    </View>
  );

  return (
    <NavigationContainer>
      {accessToken ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TestUIComponents" component={TestUIComponents} options={{ headerShown: false }} />
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
    backgroundColor: Colors.white,
  }
});
