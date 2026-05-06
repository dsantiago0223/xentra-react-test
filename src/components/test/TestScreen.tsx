import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import LayoutSafeAreaView from '../layout/LayoutSafeAreaView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { Colors } from '../../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Test'>;

const TestScreen = ({ navigation }: Props) => {
  return (
    <LayoutSafeAreaView style={styles.container}>
      <Text>Test Screen</Text>
    </LayoutSafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nearWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
