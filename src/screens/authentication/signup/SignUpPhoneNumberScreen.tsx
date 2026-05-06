import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../../../components/layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpStackParamList } from '../../../navigation/SignUpStack';
import { Colors, Fonts } from '../../../constants';
import UIButton from '../../../components/ui/UIButton';
import LayoutNavigationHeader from '../../../components/layout/LayoutNavigationHeader';
import UIPhoneNumberInput from '../../../components/ui/UIPhoneNumberInput';
import * as Yup from 'yup';
import { Formik } from 'formik';
import LayoutProgressLine from '../../../components/layout/LayoutProgressLine';
import UICheckbox from '../../../components/ui/UICheckbox';
import { SignUpContext } from '../../../context/SignUpContext';
import { useDefaultAndroidBackHandler } from '../../../hooks/useAndroidBackHandler';

type Props = NativeStackScreenProps<SignUpStackParamList, 'SignUpPhoneNumber'>;

const SignUpPhoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(9, 'Invalid phone number length')
    .required('Phone number is required'),
});

const SignUpPhoneNumberScreen = ({ navigation }: Props) => {
  const [checked, setChecked] = useState(false);
  const { updateData } = useContext(SignUpContext);

  const handleNext = (values: { phoneNumber: string }) => {
    if (checked) {
      const phoneNumber = `221${values.phoneNumber}`;
      updateData({ phoneNumber: phoneNumber });
      navigation.navigate('SignUpPhoneNumberVerification', {
        phoneNumber: phoneNumber,
      });
    }
  };

  useDefaultAndroidBackHandler(navigation);

  return (
    <LayoutSafeAreaView style={styles.container} dismissKeyboardOnTap>
      <LayoutNavigationHeader
        containerStyle={{ backgroundColor: Colors.nearWhite }}
        titleText="1/4"
        titleStyle={{ fontFamily: Fonts.regular }}
        onLeftPressed={() => navigation.goBack()}
        leftIsImage
        withSeparator={false}
      />
      <View style={styles.content}>
        <LayoutProgressLine progress={1 / 4} trackStyle={styles.progressLine} />
        <Text style={styles.textLine1} variant="headlineMedium">
          Your Phone Number
        </Text>
        <Text style={styles.textLine2} variant="bodyLarge">
          Enter your phone number and we'll send a code for verification.
        </Text>
        <Formik
          initialValues={{ phoneNumber: '' }}
          validationSchema={SignUpPhoneNumberSchema}
          onSubmit={handleNext}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={styles.formContainer}>
              <UIPhoneNumberInput
                containerStyle={styles.phoneContainerStyle}
                titleText="Phone Number"
                placeholder="e.g. 77 123 45 67"
                autoCapitalize="none"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('email')}
                variant={
                  touched.phoneNumber && errors.phoneNumber
                    ? 'error'
                    : 'default'
                }
                errorText={errors.phoneNumber}
                clearable
              />
              <View style={styles.bottomViews}>
                <View style={styles.terms}>
                  <UICheckbox
                    style={styles.checkbox}
                    value={checked}
                    onChange={setChecked}
                  />
                  <View style={styles.termsText}>
                    <Text variant="bodyMedium">
                      To complete registration, please enter your mobile phone
                      number. By checking the box you acknowledge and accept our{' '}
                      <Text
                        variant="bodyMedium"
                        style={{
                          color: Colors.greenDark,
                          fontFamily: Fonts.bold,
                        }}
                      >
                        Terms & Privacy Policy
                      </Text>{' '}
                      and to receive text messages relating to services and
                      offers.
                    </Text>
                  </View>
                </View>
                <UIButton
                  style={styles.button}
                  title="Continue"
                  variant="primary"
                  onPress={handleSubmit}
                  disabled={!isValid || values.phoneNumber === '' || !checked}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </LayoutSafeAreaView>
  );
};

export default SignUpPhoneNumberScreen;

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
  phoneContainerStyle: {
    marginTop: 24,
  },
  button: {
    width: '100%',
  },
  progressLine: {
    marginTop: 5,
  },
  bottomViews: {
    width: '100%',
    position: 'absolute',
    bottom: 16,
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 8,
  },
  termsText: {
    flex: 1,
  },
});
