import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as Yup from 'yup';
import axios from 'axios';
import TextEntryControl from '../components/TextEntryControl';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Psssword required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password required'),
});

const SignupScreen: React.FC<Props> = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  
  const handleSignup = async (values: { email: string; password: string }) => {
    setLoading(true);

    try { //TODO: create reusable API Request, parsing and saving of response data
      const response = await axios.post('https://dd438db4-d024-4e90-a7c0-5168d4cbe765.mock.pstmn.io/register', 
        {
          username: values.email,
          password: values.password,
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-mock-match-request-body"': true,
          }
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        Alert.alert('Success!', 'Account created successfully', [
        { text: 'Login', onPress: () => navigation.navigate('Login') },
      ]);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Signup Failed', 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            />
        </View>
      <Text style={styles.title}>Create Jetway Trades Account</Text>

      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSignup}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextEntryControl
            placeholder='Email'
            keyboardType="email-address"
            autoCapitalize="none"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            iconName='email'
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextEntryControl
            placeholder='Password'
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            isPassword
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TextEntryControl
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            isPassword
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>{loading ? 'Signing up...' : 'Sign Up'}</Text>
            </TouchableOpacity>
        </>
        )}
      </Formik>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.footerText}>Already have an account? <Text style={styles.link}>Login</Text> </Text>
    </TouchableOpacity>

    </View>
  );
};

export default SignupScreen;

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4A90E2'
  },
  logoContainer: {
    marginBottom: 12,
    marginTop: 20,
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  link: {
    marginTop: 20,
    color: '#007AFF',
    fontSize: 15,
  },
});
