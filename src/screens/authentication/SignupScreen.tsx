import React, { useContext, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, Alert, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import * as Yup from 'yup';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { AuthContext } from '../../context/AuthContext';
import { useLoading } from '../../components/AppActivityIndicator';
import AppNavigationHeader from '../../components/AppNavigationHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors, Fonts } from '../../constants/Constants';
import AppPressable from '../../components/AppPressable';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name required'),
  lastName: Yup.string().required('Last Name required'),
  phoneNumber: Yup.string().required('Phone Number required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password required'),
});

const SignupScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);
  const { showLoading, hideLoading } = useLoading();
  
  const handleSignup = async (values: { firstName: string, lastName: string, phoneNumber: string, email: string, password: string }) => {
    setLoading(true);
    showLoading();
    const { error } = await registerUser({
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
    });
    if (error) Alert.alert('Failed', error.message);
    setLoading(false);
    hideLoading()
  };

  return (
    <View style={styles.container}>
      <AppNavigationHeader 
      titleText='Sign Up'
      onLeftPressed={() => navigation.goBack()} 
      leftIsImage
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={150}
        keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Create JolofPay Account</Text>

          <Formik
          initialValues={{ firstName: '', lastName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.inputContainer}>
                <AppTextInput
                titleText='First Name'
                placeholder='Input your first name'
                keyboardType='default'
                autoCapitalize='words'
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                variant={touched.firstName && errors.firstName ? 'error' : 'default'}
                errorText={errors.firstName}
                clearable
                />
                
                <AppTextInput
                titleText='Last Name'
                placeholder='Input your last name'
                keyboardType='default'
                autoCapitalize='words'
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                variant={touched.lastName && errors.lastName ? 'error' : 'default'}
                errorText={errors.lastName}
                clearable
                />
                
                <AppTextInput
                titleText='Phone Number'
                placeholder='Input your phone number'
                keyboardType='phone-pad'
                autoCapitalize="none"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                variant={touched.phoneNumber && errors.phoneNumber ? 'error' : 'default'}
                errorText={errors.phoneNumber}
                clearable
                />
                
                <AppTextInput
                titleText='Email'
                placeholder='Input your email address'
                keyboardType='email-address'
                autoCapitalize='none'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                variant={touched.email && errors.email ? 'error' : 'default'}
                errorText={errors.email}
                clearable
                />
                
                <AppTextInput
                titleText='Password'
                placeholder='Input your password'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                autoCapitalize='none'
                variant={touched.password && errors.password ? 'error' : 'default'}
                errorText={errors.password}
                />
                
                <AppTextInput
                titleText='Confirm Password'
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry
                autoCapitalize='none'
                variant={touched.confirmPassword && errors.confirmPassword ? 'error' : 'default'}
                errorText={errors.confirmPassword}
                />
                
                <AppButton title='Register' onPress={handleSubmit} disabled={loading} />
              </View>
            )}
          </Formik>
          <AppPressable onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>Login</Text> </Text>
          </AppPressable>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollViewContent: {
    flexGrow: 1
  },
  inputContainer: {
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.greenMedium
  },
  logoContainer: {
    marginBottom: 8,
    marginTop: 8,
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 90,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 5,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: Colors.grayMedium,
    fontFamily: Fonts.regular
  },
  link: {
    marginTop: 20,
    color: Colors.greenDark,
    fontSize: 15,
    fontFamily: Fonts.medium
  },
});
