import React, { useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../../components/layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { Colors } from '../../constants';
import LayoutNavigationHeader from '../../components/layout/LayoutNavigationHeader';
import UIButton from '../../components/ui/UIButton';
import { useDefaultAndroidBackHandler } from '../../hooks/useAndroidBackHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'GetStarted'>;

const GetStartedScreen = ({ navigation }: Props) => {
  useDefaultAndroidBackHandler(navigation);

  return (
    <LayoutSafeAreaView style={styles.container}>
      <LayoutNavigationHeader
        containerStyle={{ backgroundColor: Colors.nearWhite }}
        titleText=""
        onLeftPressed={() => navigation.goBack()}
        leftIsImage
        withSeparator={false}
      />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.textLine1} variant="displayLarge">
            Let's Get{'\n'}Started
          </Text>
          <Text style={styles.textLine2} variant="bodyLarge">
            Enroll now and take control of your money -{'\n'}simple, fast and
            secure.
          </Text>
        </View>
        <Image
          source={require('../../../assets/images/get_started_instructions.png')}
          style={styles.instructionsImage}
          resizeMode="contain"
        />
        <UIButton
          style={styles.button}
          title="Get Started"
          variant="primary"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </LayoutSafeAreaView>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nearWhite,
  },
  content: {
    flex: 1,
    marginHorizontal: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  textLine1: {
    color: Colors.greenDark,
    textAlign: 'center',
  },
  textLine2: {
    color: Colors.grayDark,
    textAlign: 'center',
    marginTop: 16,
  },
  instructionsImage: {
    width: '80%',
    height: '45%',
    marginTop: 24,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 16,
  },
});
