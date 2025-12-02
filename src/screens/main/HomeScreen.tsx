import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { AuthContext } from '../../context/AuthContext';
import HomeTabs from './HomeTabs';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  useEffect(() => {
  }, [navigation]);

  const { logoutUser } = useContext(AuthContext);
  const name = "Dave"

  return (
    /*<View style={styles.container}>
      <Text style={styles.text}>Welcome {name}</Text>

      <TouchableOpacity style={styles.button} onPress={logoutUser}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>*/
    <HomeTabs />
  );
};

export default HomeScreen;
