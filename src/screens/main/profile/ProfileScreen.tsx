import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import useGetUser from "../../../hooks/useGetUser";

const menuArray = [
  { id: "1", title: "My Information" },
  { id: "2", title: "Social Accounts" },
  { id: "3", title: "Linked Cards" },
  { id: "4", title: "Promo Codes" },
  { id: "5", title: "Order History" },
  { id: "6", title: "Invite Friends" },
  { id: "7", title: "Referrals" },
  { id: "8", title: "FAQs" },
  { id: "9", title: "Terms and Privacy Policy" },
];

export default function ProfileScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useGetUser();

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
        source={{ uri: 'https://i.pravatar.cc/150' }}
        style={styles.profileImage}
        />
    </View>
      <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
      <FlatList
      data={menuArray}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
              if (item.title === 'My Information') {
                  navigation.navigate('MyInformation', { id: user.id, name: `${user.first_name} ${user.last_name}` })
              }
          }
        }>
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#ffffff'
  },
  text: { 
    fontSize: 16,
    fontWeight: '400'
  },
  card: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    marginBottom: 12
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    textAlign:'center',
    marginBottom: 16
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
    
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, //half of width/height
  }
});
