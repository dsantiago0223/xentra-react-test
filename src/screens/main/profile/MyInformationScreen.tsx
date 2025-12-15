import React from "react";
import { View, StyleSheet } from "react-native";
import NavigationHeader from "../../../components/NavigationHeader";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'MyInformation'>;


const MyInformationScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <NavigationHeader 
      titleText="My Information"
      leftIsImage
      onLeftPressed={() => navigation.goBack()}
      />
    </View>
  );
}

export default MyInformationScreen 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});
