import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../../components/layout/LayoutSafeAreaView';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import UITextInput from '../../components/ui/UITextInput';
import UIButton from '../../components/ui/UIButton';
import { AuthContext } from '../../context/AuthContext';
import { useLoading } from '../../components/ui/UIActivityIndicator';
import { Colors, Fonts } from '../../constants';
import LayoutPressable from '../../components/layout/LayoutPressable';
import LayoutNavigationHeader from '../../components/layout/LayoutNavigationHeader';
import { useAlert } from '../../context/AlertContext';
import { useDefaultAndroidBackHandler } from '../../hooks/useAndroidBackHandler';
import UIPhoneNumberInput from '../../components/ui/UIPhoneNumberInput';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(9, 'Invalid phone number length')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({ navigation }: Props) => {
  const { loginUser } = useContext(AuthContext);
  const { showLoading, hideLoading } = useLoading();
  const { showAlert } = useAlert();

  const handleLogin = async (values: {
    phoneNumber: string;
    password: string;
  }) => {
    showLoading();
    const { error } = await loginUser({
      username: values.phoneNumber,
      password: values.password,
    });
    if (error) {
      showAlert({
        title: 'Login Failed',
        message: error.message,
        showCancel: false,
      });
    }
    hideLoading();
  };

  useDefaultAndroidBackHandler(navigation);

  return (
    <LayoutSafeAreaView style={styles.container} dismissKeyboardOnTap>
      <LayoutNavigationHeader
        containerStyle={{ backgroundColor: Colors.nearWhite }}
        titleText=""
        onLeftPressed={() => navigation.goBack()}
        leftIsImage
        withSeparator={false}
      />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.message}>Welcome Back</Text>
        <Formik
          initialValues={{ phoneNumber: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
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
            <>
              <UIPhoneNumberInput
                containerStyle={styles.phoneContainerStyle}
                titleText="Phone Number"
                placeholder="e.g. 77 123 45 67"
                autoCapitalize="none"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                variant={
                  touched.phoneNumber && errors.phoneNumber
                    ? 'error'
                    : 'default'
                }
                errorText={errors.phoneNumber}
                clearable
              />

              <UITextInput
                titleText="Password"
                placeholder="Enter Password"
                secureTextEntry
                autoCapitalize="none"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                variant={
                  touched.password && errors.password ? 'error' : 'default'
                }
                errorText={errors.password}
              />

              <UIButton
                style={styles.button}
                title="Login"
                variant="primary"
                onPress={handleSubmit}
                disabled={
                  !isValid ||
                  values.phoneNumber === '' ||
                  values.password === ''
                }
              />
            </>
          )}
        </Formik>

        <LayoutPressable onPress={() => navigation.navigate('GetStarted')}>
          <Text style={styles.footerText} variant="bodyMedium">
            Don’t have an account?{' '}
            <Text style={styles.link} variant="bodyMedium">
              Get Started
            </Text>
          </Text>
        </LayoutPressable>
      </View>
    </LayoutSafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nearWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 24,
    color: Colors.grayMedium,
    fontFamily: Fonts.regular,
  },
  link: {
    color: Colors.greenDark,
    fontFamily: Fonts.medium,
  },
  button: {
    marginTop: 16,
  },
  phoneContainerStyle: {
    marginTop: 16,
  },
  message: {
    color: Colors.grayMedium,
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18,
    fontFamily: Fonts.medium,
  },
});
