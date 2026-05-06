import React, { useContext } from 'react';
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
import { AuthContext } from '../../../context/AuthContext';
import { useLoading } from '../../../components/ui/UIActivityIndicator';
import { SignUpContext } from '../../../context/SignUpContext';
import { useAlert } from '../../../context/AlertContext';
import { useDefaultAndroidBackHandler } from '../../../hooks/useAndroidBackHandler';

type Props = NativeStackScreenProps<SignUpStackParamList, 'SignUpCreatePIN'>;

const SignUpCreatePINScreenSchema = Yup.object().shape({
  pin: Yup.string()
    .length(4, 'PIN must be 4 digits')
    .required('PIN is required'),
  confirmPIN: Yup.string()
    .length(4, 'Confirm PIN must be 4 digits')
    .oneOf([Yup.ref('pin')], 'PIN must match')
    .required('Confirm PIN is required'),
});

const SignUpCreatePINScreen = ({ navigation }: Props) => {
  const { createNewUser } = useContext(AuthContext);
  const { showLoading, hideLoading } = useLoading();
  const { data, reset } = useContext(SignUpContext);
  const { showAlert } = useAlert();

  const handleSignup = async (values: { pin: string }) => {
    showLoading();
    const { error } = await createNewUser({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: values.pin,
    });
    if (error) {
      showAlert({
        title: 'Failed',
        message: error.message,
        showCancel: false,
      });
    } else {
      navigation.navigate('SignUpEnableFaceID');
    }
    hideLoading();
    reset();
  };

  useDefaultAndroidBackHandler(navigation);

  return (
    <LayoutSafeAreaView style={styles.container} dismissKeyboardOnTap>
      <LayoutNavigationHeader
        containerStyle={{ backgroundColor: Colors.nearWhite }}
        titleText="4/4"
        titleStyle={{ fontFamily: Fonts.regular }}
        onLeftPressed={() => navigation.goBack()}
        leftIsImage
        withSeparator={false}
      />
      <View style={styles.content}>
        <LayoutProgressLine progress={4 / 4} trackStyle={styles.progressLine} />
        <Text style={styles.textLine1} variant="headlineMedium">
          Create PIN
        </Text>
        <Text style={styles.textLine2} variant="bodyLarge">
          Set a PIN to keep your wallet safe and transactions secure.
        </Text>
        <Formik
          initialValues={{ pin: '', confirmPIN: '' }}
          validationSchema={SignUpCreatePINScreenSchema}
          onSubmit={() => {
            //handleSignup}
            navigation.navigate('SignUpEnableFaceID');
          }}
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
              <UITextInput
                titleText="4-Digit PIN"
                placeholder="Enter PIN"
                keyboardType="number-pad"
                autoCapitalize="none"
                maxLength={4}
                value={values.pin}
                onChangeText={handleChange('pin')}
                onBlur={handleBlur('pin')}
                variant={touched.pin && errors.pin ? 'error' : 'default'}
                errorText={errors.pin}
                secureTextEntry
              />
              <UITextInput
                titleText="Confirm 4-Digit PIN"
                placeholder="Confirm PIN"
                keyboardType="number-pad"
                autoCapitalize="none"
                maxLength={4}
                value={values.confirmPIN}
                onChangeText={handleChange('confirmPIN')}
                onBlur={handleBlur('confirmPIN')}
                variant={
                  touched.confirmPIN && errors.confirmPIN ? 'error' : 'default'
                }
                errorText={errors.confirmPIN}
                secureTextEntry
              />
              <UIButton
                style={styles.button}
                title="Continue"
                variant="primary"
                onPress={handleSubmit}
                disabled={
                  !isValid || values.pin === '' || values.confirmPIN === ''
                }
              />
            </View>
          )}
        </Formik>
      </View>
    </LayoutSafeAreaView>
  );
};

export default SignUpCreatePINScreen;

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
