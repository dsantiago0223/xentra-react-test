import React, { useContext } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../../../components/layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpStackParamList } from '../../../navigation/SignUpStack';
import { Colors } from '../../../constants/Constants';
import UIButton from '../../../components/ui/UIButton';
import { AuthContext } from '../../../context/AuthContext';
import { useAndroidBackHandler } from '../../../hooks/useAndroidBackHandler';

type Props = NativeStackScreenProps<SignUpStackParamList, 'SignUpAccountCreated'>;

const SignUpAccountCreatedScreen = ({}: Props) => {
  const { createNewUserFlowComplete } = useContext(AuthContext);
  useAndroidBackHandler(() => true);
  
  return (
    <LayoutSafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentTop}>
          <Image
            source={require('../../../../assets/images/signup_account_created.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.textLine1} variant="headlineMedium">
            Account Created!
          </Text>
          <Text style={styles.textLine2} variant="bodyLarge">
            Your account is live! Explore your wallet and start making
            transactions today.
          </Text>
        </View>
        <UIButton
          style={styles.button}
          title="Done"
          variant="primary"
          onPress={() => {
            createNewUserFlowComplete();
          }}
        />
      </View>
    </LayoutSafeAreaView>
  );
};

export default SignUpAccountCreatedScreen;

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
  image: {
    width: 80,
    height: 80,
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
    width: '100%',
    position: 'absolute',
    bottom: 16,
  },
});
