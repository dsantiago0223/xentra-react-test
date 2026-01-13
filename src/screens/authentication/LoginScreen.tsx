import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import { AuthContext } from '../../context/AuthContext';
import { useLoading } from '../../components/AppActivityIndicator';
import { Colors } from "../../constants/Constants";

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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
        source={require('../../../assets/logo.png')}
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
            placeholder='Email'
            keyboardType="email-address"
            autoCapitalize="none"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            iconName='email'
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <AppTextInput
            placeholder='Password'
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            isPassword
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <AppButton titleText='Login' onPressed={handleSubmit} disabled={loading} />
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.footerText}>Don’t have an account? <Text style={styles.link}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 40,
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
  },
  link: {
    color: Colors.greenDark,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 5,
  },
});
