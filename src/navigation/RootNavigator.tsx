import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import { Colors } from '../constants/Constants';
import LoginScreen from '../screens/authentication/LoginScreen';
import HomeScreen from '../screens/main/HomeScreen';
import TestUIComponents from '../components/test/TestUIComponents';
import WelcomeScreen from '../screens/authentication/WelcomeScreen';
import TestScreen from '../components/test/TestScreen';
import GetStartedScreen from '../screens/authentication/GetStartedScreen';
import SignUpStack from './SignUpStack';

export type RootStackParamList = {
  Welcome: undefined;
  GetStarted: undefined;
  Login: undefined;
  SignUp: undefined;

  Home: undefined;

  Test: undefined;
  TestUIComponents: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { accessToken, loading } = useContext(AuthContext);

  if (loading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.greenDark} />
      </View>
    );

  return (
    <NavigationContainer>
      {accessToken ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />

          <Stack.Screen
            name="TestUIComponents"
            component={TestUIComponents}
            options={{ title: 'UI Components' }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={'Welcome'}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStartedScreen}
            options={{ title: 'Get Started' }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpStack}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TestUIComponents"
            component={TestUIComponents}
            options={{ title: 'UI Components' }}
          />
          <Stack.Screen
            name="Test"
            component={TestScreen}
            options={{ title: 'Test Screen' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
