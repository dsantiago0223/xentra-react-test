import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LayoutSafeAreaView from '../../components/layout/LayoutSafeAreaView';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import UITextInput from '../../components/ui/UITextInput';
import UIButton from '../../components/ui/UIButton';
import { AuthContext } from '../../context/AuthContext';
import { useLoading } from '../../components/ui/UIActivityIndicator';
import { Colors, Fonts } from '../../constants/Constants';
import { TextInput } from 'react-native-paper';
import LayoutPressable from '../../components/layout/LayoutPressable';
import LayoutNavigationHeader from '../../components/layout/LayoutNavigationHeader';
import { useAlert } from '../../context/AlertContext';
import { useDefaultAndroidBackHandler } from '../../hooks/useAndroidBackHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({ navigation }: Props) => {
  const { loginUser } = useContext(AuthContext);
  const { showLoading, hideLoading } = useLoading();
  const { showAlert } = useAlert();

  const handleLogin = async (values: { email: string; password: string }) => {
    showLoading();
    const { error } = await loginUser({
      email: values.email,
      password: values.password,
    });
    if (error) {
      showAlert({
        title: 'Login Failed',
        message: error.message,
        showCancel: false
      });
    }
    hideLoading();
  };

  useDefaultAndroidBackHandler(navigation);

  return (
    <LayoutSafeAreaView style={styles.container} dismissKeyboardOnTap>
      <LayoutNavigationHeader
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

        <Formik
          initialValues={{ email: '', password: '' }}
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
            isSubmitting,
          }) => (
            <>
              <UITextInput
                titleText="Email"
                placeholder="Input your Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                variant={touched.email && errors.email ? 'error' : 'default'}
                errorText={errors.email}
                right={<TextInput.Icon icon="email" color={Colors.greenDark} />}
                clearable
              />

              <UITextInput
                titleText="Password"
                placeholder="Input your Password"
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
                disabled={!isValid || isSubmitting}
              />
              <UIButton
                style={styles.button}
                title="Test UI Components"
                variant="primary"
                onPress={() => navigation.navigate('TestUIComponents')}
              />
            </>
          )}
        </Formik>

        <LayoutPressable onPress={() => navigation.navigate('GetStarted')}>
          <Text style={styles.footerText}>
            Don’t have an account? <Text style={styles.link}>Sign up</Text>
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
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 110,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.grayMedium,
    fontFamily: Fonts.regular,
  },
  link: {
    color: Colors.greenDark,
    fontFamily: Fonts.medium,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 5,
  },
  button: {
    marginTop: 16,
  },
});
