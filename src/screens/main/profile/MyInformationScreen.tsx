import React from "react";
import { Text, View, StyleSheet } from "react-native";
import NavigationHeader from "../../../components/NavigationHeader";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'MyInformation'>;

const MyInformationScreen = ({navigation, route}: Props) => {

  const { id, name } = route.params || {};

  return (
    <View style={styles.container}>
      <NavigationHeader 
      titleText="My Information"
      leftIsImage
      onLeftPressed={() => navigation.goBack()}
      />
      <View style={styles.contentContainer}>
        <Text>Details:</Text>
        <Text>id: {id}</Text>  
        <Text>name: {name}</Text>
      </View>
    </View>
  );
}

export default MyInformationScreen 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }, 
  contentContainer: {
    padding: 16
  }
});
