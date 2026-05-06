import React, { useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../../../components/layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpStackParamList } from '../../../navigation/SignUpStack';
import { Colors, Fonts } from '../../../constants';
import UIButton from '../../../components/ui/UIButton';
import LayoutNavigationHeader from '../../../components/layout/LayoutNavigationHeader';
import LayoutProgressLine from '../../../components/layout/LayoutProgressLine';
import UISingleDigitInput from '../../../components/ui/UISingleDigitInput';
import LayoutPressable from '../../../components/layout/LayoutPressable';
import { useDefaultAndroidBackHandler } from '../../../hooks/useAndroidBackHandler';

type Props = NativeStackScreenProps<
  SignUpStackParamList,
  'SignUpPhoneNumberVerification'
>;

const SignUpPhoneNumberVerificationScreen = ({ navigation, route }: Props) => {
  const { phoneNumber } = route.params;
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(false);
  let otpCode = '';

  useDefaultAndroidBackHandler(navigation);

  return (
    <LayoutSafeAreaView style={styles.container} dismissKeyboardOnTap>
      <LayoutNavigationHeader
        containerStyle={{ backgroundColor: Colors.nearWhite }}
        titleText="2/4"
        titleStyle={{ fontFamily: Fonts.regular }}
        onLeftPressed={() => navigation.goBack()}
        leftIsImage
        withSeparator={false}
      />
      <View style={styles.content}>
        <LayoutProgressLine progress={2 / 4} trackStyle={styles.progressLine} />
        <Text style={styles.textLine1} variant="headlineMedium">
          Phone Verification
        </Text>
        <Text style={styles.textLine2} variant="bodyLarge">
          Enter the code we just sent to your phone{'\n'}+211*** **{' '}
          {phoneNumber.slice(-2)}
        </Text>
        <UISingleDigitInput
          containerStyle={styles.otpInput}
          length={4}
          placeholder="-"
          error={error}
          onChange={code => {
            setError(false);
            setIsDisabled(code.length !== 4);
            console.log('OTP current value:', code);
          }}
          onComplete={code => {
            Keyboard.dismiss();
            otpCode = code;
            console.log('OTP Code:', otpCode);
            if (code === '0000') {
              setError(true);
            }
          }}
        />
        <Text style={styles.otpText} variant="bodyLarge">
          Didn't receive OTP?
        </Text>
        <LayoutPressable
          style={styles.otpResendPressable}
          onPress={() => console.log('resend code')}
        >
          <Text style={styles.otpResendText} variant="bodyLarge">
            Resend Code
          </Text>
        </LayoutPressable>
        <View style={styles.formContainer}>
          <UIButton
            style={styles.button}
            title="Verify"
            variant="primary"
            disabled={isDisabled || error}
            onPress={() => {
              if (!isDisabled && !error) {
                navigation.navigate('SignUpNameAndEmail');
              }
            }}
          />
        </View>
      </View>
    </LayoutSafeAreaView>
  );
};

export default SignUpPhoneNumberVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nearWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formContainer: {
    flex: 1,
  },
  textLine1: {
    color: Colors.black,
    textAlign: 'center',
    marginTop: 32,
  },
  textLine2: {
    color: Colors.grayDark,
    textAlign: 'center',
    marginTop: 12,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 16,
  },
  progressLine: {
    marginTop: 5,
  },
  otpInput: {
    marginTop: 32,
    marginHorizontal: 12,
  },
  otpText: {
    textAlign: 'center',
    marginTop: 32,
  },
  otpResendPressable: {
    marginTop: 16,
  },
  otpResendText: {
    textAlign: 'center',
    color: Colors.greenDark,
    fontFamily: Fonts.medium,
  },
});
