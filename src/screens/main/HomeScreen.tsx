import React, { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import HomeTabs from '../../navigation/HomeTabs';
import NavigationHeader from '../../components/NavigationHeader';
import { AuthContext } from '../../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const { logoutUser } = useContext(AuthContext);
  const name = "Hi Dave"
  
  useEffect(() => {
  }, [navigation]);

  return (
    <View style={styles.container}>
      <NavigationHeader 
      titleText='JetWay Trades'
      titleLogo 
      onLeftPressed={onLeftPressed} 
      onRightPressed={onRightPressed}
      leftText={name}
      rightText='Logout'
      />
      <HomeTabs />
    </View>
    
  );

  function onLeftPressed() {
    console.log("navigation header pressed")
  }

  function onRightPressed() {
    logoutUser();
  }

};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
