import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HomeTabs from './HomeTabs';
import NavigationHeader from '../../components/NavigationHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  useEffect(() => {
  }, [navigation]);

  return (
    <View style={styles.container}>
      <NavigationHeader titleText='JetWay Trades' onLeftPressed={onLeftPressed} onRightPressed={onRightPressed} />
      <HomeTabs />
    </View>
    
  );

  function onLeftPressed() {}

  function onRightPressed() {}

};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
