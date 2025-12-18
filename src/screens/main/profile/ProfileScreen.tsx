import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/RootNavigator';

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
  { id: "10", title: "Log Out" }
];

export default function ProfileScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <FlatList
      data={menuArray}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  item: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  text: { 
    fontSize: 16 
  }
});
