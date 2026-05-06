import React, { useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../../../components/layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpStackParamList } from '../../../navigation/SignUpStack';
import { Colors, Fonts } from '../../../constants';
import UIButton from '../../../components/ui/UIButton';
import LayoutNavigationHeader from '../../../components/layout/LayoutNavigationHeader';
import LayoutProgressLine from '../../../components/layout/LayoutProgressLine';
import * as Yup from 'yup';
import { Formik } from 'formik';
import UITextInput from '../../../components/ui/UITextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignUpContext } from '../../../context/SignUpContext';
import { useAndroidBackHandler } from '../../../hooks/useAndroidBackHandler';

type Props = NativeStackScreenProps<SignUpStackParamList, 'SignUpNameAndEmail'>;

const SignUpNameAndEmailScreenSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const SignUpNameAndEmailScreen = ({ navigation }: Props) => {
  const { updateData } = useContext(SignUpContext);

  const handleNext = (values: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    updateData({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    });
    navigation.navigate('SignUpCreatePIN');
  };

  const onBackPress = useCallback(() => {
    navigation.popTo('SignUpPhoneNumber');
    return true;
  }, [navigation]);

  useAndroidBackHandler(onBackPress);

  return (
    <LayoutSafeAreaView style={styles.container} dismissKeyboardOnTap>
      <LayoutNavigationHeader
        containerStyle={{ backgroundColor: Colors.nearWhite }}
        titleText="3/4"
        titleStyle={{ fontFamily: Fonts.regular }}
        onLeftPressed={() => navigation.popTo('SignUpPhoneNumber')}
        leftIsImage
        withSeparator={false}
      />
      <View style={styles.content}>
        <LayoutProgressLine progress={3 / 4} trackStyle={styles.progressLine} />
        <Text style={styles.textLine1} variant="headlineMedium">
          Tell Us About You
        </Text>
        <Text style={styles.textLine2} variant="bodyLarge">
          Enter your legal name and email to continue.
        </Text>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '' }}
          validationSchema={SignUpNameAndEmailScreenSchema}
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
              <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={32}
                keyboardShouldPersistTaps="handled"
              >
                <UITextInput
                  titleText="First Name"
                  placeholder="Enter first name"
                  keyboardType="default"
                  autoCapitalize="words"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  variant={
                    touched.firstName && errors.firstName ? 'error' : 'default'
                  }
                  errorText={errors.firstName}
                  clearable
                />
                <UITextInput
                  titleText="Last Name"
                  placeholder="Enter last name"
                  keyboardType="default"
                  autoCapitalize="words"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  variant={
                    touched.lastName && errors.lastName ? 'error' : 'default'
                  }
                  errorText={errors.lastName}
                  clearable
                />
                <UITextInput
                  titleText="Email"
                  placeholder="e.g. example@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  variant={touched.email && errors.email ? 'error' : 'default'}
                  errorText={errors.email}
                  clearable
                />
              </KeyboardAwareScrollView>
              <UIButton
                style={styles.button}
                title="Continue"
                variant="primary"
                onPress={handleSubmit}
                disabled={
                  !isValid ||
                  values.firstName === '' ||
                  values.lastName === '' ||
                  values.email === ''
                }
              />
            </View>
          )}
        </Formik>
      </View>
    </LayoutSafeAreaView>
  );
};

export default SignUpNameAndEmailScreen;

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
    marginTop: 24,
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
});
