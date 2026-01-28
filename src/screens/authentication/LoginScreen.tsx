import React, { useContext, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { AuthContext } from '../../context/AuthContext';
import { useLoading } from '../../components/AppActivityIndicator';
import { Colors, Fonts } from '../../constants/Constants';
import { TextInput } from 'react-native-paper';
import AppPressable from '../../components/AppPressable';

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
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const { showLoading, hideLoading } = useLoading();

  const handleLogin = async (values: { email: string, password: string }) => {
    setLoading(true);
    showLoading()
    const { error } = await loginUser({
      email: values.email,
      password: values.password,
    });
    if (error) Alert.alert('Login Failed', error.message);
    setLoading(false);
    hideLoading();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
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
        onSubmit={handleLogin}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <AppTextInput
              titleText="Email"
              placeholder='Input your Email Address'
              keyboardType='email-address'
              autoCapitalize='none'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              variant={touched.email && errors.email ? 'error' : 'default'}
              errorText={errors.email}
              right={<TextInput.Icon icon="email" color={Colors.greenDark}/>}
              clearable
              />
              
              <AppTextInput
              titleText="Password"
              placeholder='Input your Password'
              secureTextEntry
              autoCapitalize='none'
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              variant={touched.password && errors.password ? 'error' : 'default'}
              errorText={errors.password}
              />
              
              <AppButton style={styles.button} title='Login' variant='primary-1' onPress={handleSubmit} disabled={loading} />
              <AppButton style={styles.button} title='Test UI Components' variant='primary-1' onPress={() => navigation.navigate('TestUIComponents')} disabled={loading} />
            </>
          )}
        </Formik>

        <AppPressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.footerText}>Don’t have an account? <Text style={styles.link}>Sign up</Text>
          </Text>
        </AppPressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 24,
    marginTop: 20,
    alignItems: "center"
  },
  logo: {
    width: 220,
    height: 110
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.grayMedium,
    fontFamily: Fonts.regular
  },
  link: {
    color: Colors.greenDark,
    fontFamily: Fonts.medium
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 5,
  },
  button: {
    marginTop: 16
  }
});
