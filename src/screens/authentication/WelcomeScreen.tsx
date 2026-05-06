import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../../components/layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { Colors } from '../../constants';
import UIButton from '../../components/ui/UIButton';
import UILanguagePicker from '../../components/ui/UILanguagePicker';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen = ({ navigation }: Props) => {
  const [lang, setLang] = useState('en');

  return (
    <LayoutSafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.languageContainer}>
          <UILanguagePicker
            value={lang}
            onChange={language => {
              setLang(language.code);
              console.log('selected language: ', language.code);
            }}
          />
        </View>

        <Image
          source={require('../../../assets/images/welcome_screen_top_image.png')}
          style={styles.topImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomContent}>
        <View style={styles.grayBar} />
        <Text variant="displaySmall" style={styles.textLine1}>
          Money that{'\n'}
          <Text variant="displaySmall" style={styles.textLine1Yellow}>
            moves
          </Text>{' '}
          with you
        </Text>
        <Text variant="bodyLarge" style={styles.textLine2}>
          Designed for speed, built for convenience, made for you - simple,
          fast, and reliable.
        </Text>

        <View style={styles.bottomButtonContainer}>
          <UIButton
            style={styles.loginButton}
            title="Login"
            variant="outlined"
            onPress={() => navigation.navigate('Login')}
          />
          <View style={styles.buttonSpace} />
          <UIButton
            style={styles.signupButton}
            title="Get Started"
            variant="primary"
            onPress={() => navigation.navigate('GetStarted')}
          />
        </View>
      </View>
    </LayoutSafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nearWhite,
  },
  topContent: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: Colors.nearWhite,
  },
  topImage: {
    width: '100%',
    height: '80%',
  },
  bottomContent: {
    flex: 1.5,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'transparent',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    paddingHorizontal: 24,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
  },
  loginButton: {
    width: '48%',
  },
  buttonSpace: {
    width: '4%',
  },
  signupButton: {
    width: '48%',
  },
  textLine1: {
    textAlign: 'center',
    color: Colors.greenMedium,
    marginTop: 24,
  },
  textLine1Yellow: {
    textAlign: 'center',
    color: Colors.yellowDark,
  },
  textLine2: {
    textAlign: 'center',
    color: Colors.grayDark,
    marginTop: 16,
  },
  languageContainer: {
    marginTop: 16,
    marginBottom: 10,
  },
  grayBar: {
    width: 45,
    marginTop: 10,
    height: 6,
    backgroundColor: Colors.grayLight,
    borderRadius: 24,
  },
});
