import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../../../components/layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpStackParamList } from '../../../navigation/SignUpStack';
import { Colors } from '../../../constants/Constants';
import UIButton from '../../../components/ui/UIButton';
import { useAndroidBackHandler } from '../../../hooks/useAndroidBackHandler';

type Props = NativeStackScreenProps<SignUpStackParamList, 'SignUpEnableFaceID'>;

const SignUpEnableFaceIDScreen = ({ navigation }: Props) => {
  useAndroidBackHandler(() => true);

  return (
    <LayoutSafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentTop}>
          <Image
            source={require('../../../../assets/images/signup_enable_face_id.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.textLine1} variant="headlineMedium">
            Enable Face ID
          </Text>
          <Text style={styles.textLine2} variant="bodyLarge">
            Enable biometrics for seamless login and secure transactions every
            time.
          </Text>
        </View>
        <View style={styles.contentBottom}>
          <UIButton
            style={styles.button}
            title="Enable Now"
            variant="primary"
            onPress={() => navigation.navigate('SignUpAccountCreated')}
          />
          <UIButton
            style={{}}
            title="Maybe Later"
            variant="outlined"
            onPress={() => navigation.navigate('SignUpAccountCreated')}
          />
        </View>
      </View>
    </LayoutSafeAreaView>
  );
};

export default SignUpEnableFaceIDScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nearWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  contentTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBottom: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    bottom: 16,
  },
  image: {
    width: 130,
    height: 130,
  },
  textLine1: {
    color: Colors.greenDark,
    textAlign: 'center',
    marginTop: 32,
  },
  textLine2: {
    color: Colors.grayDark,
    textAlign: 'center',
    marginTop: 12,
  },
  button: {
    marginBottom: 16,
  },
});
