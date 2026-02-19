import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpProvider } from '../context/SignUpContext';
import SignUpPhoneNumberScreen from '../screens/authentication/signup/SignUpPhoneNumberScreen';
import SignUpPhoneNumberVerificationScreen from '../screens/authentication/signup/SignPhoneNumberVerificationScreen';
import SignUpNameAndEmailScreen from '../screens/authentication/signup/SignUpNameAndEmailScreen';
import SignUpCreatePINScreen from '../screens/authentication/signup/SignUpCreatePINScreen';
import SignUpEnableFaceIDScreen from '../screens/authentication/signup/SignUpEnableFaceIDScreen';
import SignUpAccountCreatedScreen from '../screens/authentication/signup/SignUpAccountCreatedScreen';

export type SignUpStackParamList = {
  SignUpPhoneNumber: undefined;
  SignUpPhoneNumberVerification: { phoneNumber: string };
  SignUpNameAndEmail: undefined;
  SignUpCreatePIN: undefined;
  SignUpEnableFaceID: undefined;
  SignUpAccountCreated: undefined;
};

const Stack = createNativeStackNavigator<SignUpStackParamList>();

const SignupStack = () => {
  return (
    <SignUpProvider>
      <Stack.Navigator
        initialRouteName={'SignUpPhoneNumber'}
        //initialRouteName={'SignUpEnableFaceID'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="SignUpPhoneNumber"
          component={SignUpPhoneNumberScreen}
          options={{ title: 'Phone Number' }}
        />
        <Stack.Screen
          name="SignUpPhoneNumberVerification"
          component={SignUpPhoneNumberVerificationScreen}
          options={{ title: 'Phone Verification' }}
        />
        <Stack.Screen
          name="SignUpNameAndEmail"
          component={SignUpNameAndEmailScreen}
          options={{ title: 'About You' }}
        />
        <Stack.Screen
          name="SignUpCreatePIN"
          component={SignUpCreatePINScreen}
          options={{ title: 'Create PIN' }}
        />
        <Stack.Screen
          name="SignUpEnableFaceID"
          component={SignUpEnableFaceIDScreen}
          options={{ title: 'Enable Face ID' }}
        />
        <Stack.Screen
          name="SignUpAccountCreated"
          component={SignUpAccountCreatedScreen}
          options={{ title: 'Account Created' }}
        />
      </Stack.Navigator>
    </SignUpProvider>
  );
};

export default SignupStack;
